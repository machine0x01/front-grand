import { ExternalLink, Facebook, Globe, Instagram, Linkedin, MapPin, Phone } from 'lucide-react';
import React from 'react';
import LightRays from './shared/LightRays';

function Footer() {
  return (
    <footer className="relative h-[70vh] overflow-hidden bg-[#0B000F] text-white">

      {/* Background decorative lines */}
      <LightRays
    raysOrigin="bottom-center"
    raysColor="#5d0d8f"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.3}
    distortion={0.05}
    className="custom-rays"
  />

  <div className=' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bottom-0 absolute z-[5]'>

      <div className="relative z-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="container mx-auto">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

            {/* Our Location Section */}
            <div className="lg:col-span-1">
              <h3 className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                Our Location
              </h3>

              {/* Map Placeholder with enhanced styling */}
              <div className="group mb-6 flex h-40 w-full items-center justify-center rounded-xl border border-purple-400/20 bg-gradient-to-br from-[#4A1F63] to-[#3A1553] text-gray-300 shadow-2xl transition-all duration-300 hover:border-purple-400/40 sm:h-48">
                <div className="text-center">
                  <MapPin size={40} className="mx-auto mb-2 transition-colors duration-300 group-hover:text-[#FEB101]" />
                  <p className="text-sm text-gray-400">Interactive Map</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="mr-3 rounded-lg bg-gradient-to-r from-[#FEB101] to-[#FFD984] p-2">
                    <Phone size={16} className="text-[#4A044E]" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-white">Call Us</span>
                  </div>
                </div>
                <div className="ml-11">
                  <p className="text-sm leading-relaxed text-gray-200">
                    022343434 - 022343434
                    <br />
                    <span className="text-xs text-gray-400">Available 24/7</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="lg:col-span-1">
              <h3 className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-xl font-bold text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Courses', 'Gallery', 'Hire Us', 'Contact Us'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="group flex items-center text-sm text-gray-200 transition-all duration-300 hover:text-[#FEB101] sm:text-base"
                    >
                      <span className="mr-3 h-1 w-1 rounded-full bg-[#FEB101] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      {item}
                      <ExternalLink size={14} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diplomas Section */}
            <div className="lg:col-span-1">
              <h3 className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-xl font-bold text-transparent">
                Diplomas
              </h3>
              <ul className="space-y-3">
                {['2D Animation', '3D Animation', 'Motion Graphics', 'Character Animation'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="group flex items-center text-sm text-gray-200 transition-all duration-300 hover:text-[#FEB101] sm:text-base"
                    >
                      <span className="mr-3 h-1 w-1 rounded-full bg-[#FEB101] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      {item}
                      <ExternalLink size={14} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Newsletter Section */}
            <div className="lg:col-span-1">
              <h3 className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-xl font-bold text-transparent">
                Support
              </h3>
              <ul className="mb-8 space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="group flex items-center text-sm text-gray-200 transition-all duration-300 hover:text-[#FEB101] sm:text-base"
                    >
                      <span className="mr-3 h-1 w-1 rounded-full bg-[#FEB101] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      {item}
                      <ExternalLink size={14} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}

            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 mb-8 sm:mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
          </div>

          {/* Footer Bottom Section */}
          <div className="flex flex-col items-center justify-between space-y-6 lg:flex-row lg:space-y-0">

            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="mb-2 text-sm text-gray-300">
                © 2025
                {' '}
                <span className="font-semibold text-[#FEB101]">Grand Notion</span>
                . All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Empowering creativity through animation education
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="hidden text-sm text-gray-300 sm:block">Follow Us:</span>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
                  { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                  { icon: Globe, label: 'Behance', color: 'hover:bg-blue-500' },
                  { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-700' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`rounded-xl bg-white/10 p-3 backdrop-blur-sm ${social.color} group border border-white/20 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="text-white transition-colors duration-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    </footer>
  );
}

export default Footer;
