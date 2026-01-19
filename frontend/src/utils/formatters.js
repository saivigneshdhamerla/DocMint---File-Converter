/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp instanceof Date ? timestamp : new Date(timestamp));
}

/**
 * Format countdown time
 */
export function formatCountdown(ms) {
  if (ms <= 0) return 'Expired';
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Truncate filename if too long
 */
export function truncateFilename(filename, maxLength = 30) {
  if (filename.length <= maxLength) return filename;
  
  const ext = filename.split('.').pop();
  const name = filename.slice(0, filename.lastIndexOf('.'));
  const truncatedName = name.slice(0, maxLength - ext.length - 4) + '...';
  
  return `${truncatedName}.${ext}`;
}

/**
 * Get relative time string
 */
export function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - (timestamp instanceof Date ? timestamp.getTime() : timestamp);
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Pluralize word based on count
 */
export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural || singular + 's');
}
