import React, { useState } from 'react';
import { Mail, MessageSquare, Globe, Send, Loader2 } from 'lucide-react';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header section remains the same */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      {/* Info cards section remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card p-6 text-center group hover:border-primary-500/50 transition-colors">
          <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">dhamerla2004@gmail.com</p>
        </div>

        <div className="card p-6 text-center group hover:border-primary-500/50 transition-colors">
          <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Feedback</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Send us your thoughts</p>
        </div>

        <div className="card p-6 text-center group hover:border-primary-500/50 transition-colors">
          <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Global Support</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Available 24/7 online</p>
        </div>
      </div>

      <div className="card p-8 md:p-10 max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                placeholder="Name"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-tertiary border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                placeholder="raj@example.com"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-tertiary border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4" 
              placeholder="How can we help you?"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-tertiary border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none disabled:opacity-50"
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
