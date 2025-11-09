import React from 'react';

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-tr from-sky-900 via-blue-900 to-blue-800 text-white py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-extrabold mb-4">Health Record Management</h3>
          <p className="text-sky-300 max-w-xs leading-relaxed">
            Empower your wellness journey with comprehensive, secure, and accessible health records.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sky-300">
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
            <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="#press" className="hover:text-white transition">Press</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sky-300">
            <li><a href="#help-center" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Stay Connected</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-sky-300 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
              
            >
              <span className="material-icons text-xl">facebook</span>
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-sky-300 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-icons text-xl">twitter</span>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-sky-300 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-icons text-xl">instagram</span>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-sky-300 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-icons text-xl">linkedin</span>
            </a>
          </div>
          <form className="mt-6 flex">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="newsletter-email"
              placeholder="Your email"
              className="w-full rounded-l-xl py-2 px-4 text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
            <button
              type="submit"
              className="bg-sky-600 hover:bg-blue-700 rounded-r-xl px-6 text-white font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 border-t border-blue-700 pt-6 text-center text-sky-300 text-sm">
        &copy; {new Date().getFullYear()} Health Record Management. All rights reserved.
      </div>
    </footer>
  );
}

