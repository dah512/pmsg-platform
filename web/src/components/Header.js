import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    
    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
    
      return (
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-warm-400 to-warm-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-earth-900">Pain Management</h1>
                  <p className="text-xs text-earth-600">Support Group</p>
                </div>
              </Link>
    
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-earth-700 hover:text-warm-500 transition-colors font-medium">Home</Link>
                <Link to="/about" className="text-earth-700 hover:text-warm-500 transition-colors font-medium">About</Link>
                <Link to="/meetings" className="text-earth-700 hover:text-warm-500 transition-colors font-medium">Meetings</Link>
                <Link to="/resources" className="text-earth-700 hover:text-warm-500 transition-colors font-medium">Resources</Link>
                <Link to="/contact" className="text-earth-700 hover:text-warm-500 transition-colors font-medium">Contact</Link>
              </div>
    
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-earth-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
    
            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-2">
                <Link to="/" className="block py-2 text-earth-700 hover:text-warm-500 transition-colors font-medium">Home</Link>
                <Link to="/about" className="block py-2 text-earth-700 hover:text-warm-500 transition-colors font-medium">About</Link>
                <Link to="/meetings" className="block py-2 text-earth-700 hover:text-warm-500 transition-colors font-medium">Meetings</Link>
                <Link to="/resources" className="block py-2 text-earth-700 hover:text-warm-500 transition-colors font-medium">Resources</Link>
                <Link to="/contact" className="block py-2 text-earth-700 hover:text-warm-500 transition-colors font-medium">Contact</Link>
              </div>
            )}
          </nav>
        </header>
      );
    };
    
    export default Header;