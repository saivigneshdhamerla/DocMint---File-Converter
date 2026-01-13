import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import crypto from 'crypto';

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '50', 10);

/**
 * Hash IP address for privacy
 */
function hashIp(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

/**
 * Check if the IP is within rate limits
 */
export async function checkRateLimit(ip) {
  const db = getFirestore();
  const ipHash = hashIp(ip);
  const today = new Date().toISOString().split('T')[0];
  
  const docRef = db.collection('rateLimits').doc(ipHash);
  const doc = await docRef.get();

  if (!doc.exists) {
    return { allowed: true, remaining: RATE_LIMIT_MAX };
  }

  const data = doc.data();
  
  // Reset if it's a new day
  if (data.date !== today) {
    return { allowed: true, remaining: RATE_LIMIT_MAX };
  }

  const count = data.count || 0;
  const remaining = Math.max(0, RATE_LIMIT_MAX - count);

  return {
    allowed: count < RATE_LIMIT_MAX,
    remaining,
  };
}

/**
 * Increment rate limit counter
 */
export async function incrementRateLimit(ip) {
  const db = getFirestore();
  const ipHash = hashIp(ip);
  const today = new Date().toISOString().split('T')[0];
  
  const docRef = db.collection('rateLimits').doc(ipHash);

  try {
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      
      if (!doc.exists || doc.data().date !== today) {
        // New record or new day
        transaction.set(docRef, {
          count: 1,
          date: today,
          lastReset: FieldValue.serverTimestamp(),
        });
      } else {
        // Increment existing
        transaction.update(docRef, {
          count: FieldValue.increment(1),
        });
      }
    });
  } catch (error) {
    console.error('Failed to update rate limit:', error);
    // Don't throw - rate limit tracking is non-critical
  }
}
