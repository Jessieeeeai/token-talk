// src/components/layout/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Token Talk</h3>
            <p className="text-gray-300">
              Your trusted platform for cryptocurrency reviews and discussions.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
              <li><a href="/terms" className="hover:text-gray-300">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-gray-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com/tokentalk" className="hover:text-gray-300">Twitter</a>
              <a href="https://discord.gg/tokentalk" className="hover:text-gray-300">Discord</a>
              <a href="https://t.me/tokentalk" className="hover:text-gray-300">Telegram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Token Talk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;