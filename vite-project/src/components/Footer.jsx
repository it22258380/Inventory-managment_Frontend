import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <div>
     
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

    
    <div>
      <h2 className="text-white font-bold text-xl mb-4">Daily-Mart</h2>
      <p className="text-sm leading-relaxed">
        All Your Daily Needs, One Place.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-white font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
        <li><Link to="/contactus" className="hover:text-white transition">Contact</Link></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-white font-semibold mb-3">Contact</h3>
      <ul className="text-sm space-y-2">
        <li>Email: <a href="mailto:support@dailymart.com" className="hover:text-white transition">support@dailymart.com</a></li>
        <li>Phone: <a href="tel:+94779272044" className="hover:text-white transition">+94 77 9272 044</a></li>
        <li>Address: Colombo,Sri Lanka</li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-white font-semibold mb-3">Follow Us</h3>
      <div className="flex space-x-4 mt-2">
        <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
    &copy; {new Date().getFullYear()}  All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default Footer
