import React from 'react';
import { Phone, MapPin, ExternalLink, Linkedin, Instagram, Facebook, Globe } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#0B000F] relative text-white overflow-hidden">
      
      {/* Background decorative lines */}
      <div className="absolute inset-0 ">
        <img 
          src="/assets/Line.png" 
          className="absolute top-0 left-0 w-full h-full object-cover scale-110" 
          alt=""
        />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#4A1F63]/50 to-transparent"></div>
      
      <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Our Location Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent">
                Our Location
              </h3>
              
              {/* Map Placeholder with enhanced styling */}
              <div className="bg-gradient-to-br from-[#4A1F63] to-[#3A1553] w-full h-40 sm:h-48 rounded-xl shadow-2xl mb-6 flex items-center justify-center text-gray-300 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
                <div className="text-center">
                  <MapPin size={40} className="mx-auto mb-2 group-hover:text-[#FEB101] transition-colors duration-300" />
                  <p className="text-sm text-gray-400">Interactive Map</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-[#FEB101] to-[#FFD984] p-2 rounded-lg mr-3">
                    <Phone size={16} className="text-[#4A044E]" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-white">Call Us</span>
                  </div>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-200 leading-relaxed">
                    022343434 - 022343434<br />
                    <span className="text-xs text-gray-400">Available 24/7</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Courses', 'Gallery', 'Hire Us', 'Contact Us'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-[#FEB101] transition-all duration-300 flex items-center group text-sm sm:text-base"
                    >
                      <span className="w-1 h-1 bg-[#FEB101] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item}
                      <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diplomas Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent">
                Diplomas
              </h3>
              <ul className="space-y-3">
                {['2D Animation', '3D Animation', 'Motion Graphics', 'Character Animation'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-[#FEB101] transition-all duration-300 flex items-center group text-sm sm:text-base"
                    >
                      <span className="w-1 h-1 bg-[#FEB101] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item}
                      <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Newsletter Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent">
                Support
              </h3>
              <ul className="space-y-3 mb-8">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-[#FEB101] transition-all duration-300 flex items-center group text-sm sm:text-base"
                    >
                      <span className="w-1 h-1 bg-[#FEB101] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item}
                      <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Newsletter Signup */}
      
            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 sm:mt-16 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
          </div>

          {/* Footer Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-300 mb-2">
                © 2025 <span className="font-semibold text-[#FEB101]">Grand Notion</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Empowering creativity through animation education
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-300 hidden sm:block">Follow Us:</span>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
                  { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                  { icon: Globe, label: 'Behance', color: 'hover:bg-blue-500' },
                  { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-700' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className={`bg-white/10 backdrop-blur-sm p-3 rounded-xl ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-white/40 group`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="text-white group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;