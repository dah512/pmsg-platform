import React from 'react';
    import { Link } from 'react-router-dom';
    
    const Footer = () => {
      return (
        <footer className="bg-earth-800 text-earth-100 mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-warm-300">Pain Management Support Group</h3>
                <p className="text-earth-300">
                  A safe, compassionate community for those living with chronic pain.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-warm-300">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-earth-300 hover:text-warm-300 transition-colors">Home</Link></li>
                  <li><Link to="/about" className="text-earth-300 hover:text-warm-300 transition-colors">About Us</Link></li>
                  <li><Link to="/meetings" className="text-earth-300 hover:text-warm-300 transition-colors">Meeting Times</Link></li>
                  <li><Link to="/resources" className="text-earth-300 hover:text-warm-300 transition-colors">Resources</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-warm-300">Contact Info</h4>
                <p className="text-earth-300 mb-2">Eastern Delaware Mental Health Services</p>
                <p className="text-earth-300 mb-2">Email: info@edmhs.org</p>
                <p className="text-earth-300">Crisis Line: 1-800-XXX-XXXX</p>
              </div>
            </div>
            
            <div className="border-t border-earth-700 mt-8 pt-8 text-center text-earth-400">
              <p>&copy; {new Date().getFullYear()} Eastern Delaware Mental Health Services. All rights reserved.</p>
              <p className="mt-2 text-sm">Hosted on edmhs.us and edmhs.org</p>
            </div>
          </div>
        </footer>
      );
    };
    
    export default Footer;