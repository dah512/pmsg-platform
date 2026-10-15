import React from 'react';
    import { Link } from 'react-router-dom';
    
    const Home = () => {
      return (
        <div>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-warm-500 to-warm-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">You Are Not Alone</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Finding hope and healing together in our pain management support community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/meetings" className="bg-white text-warm-600 hover:bg-warm-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg">
                  Join a Meeting
                </Link>
                <Link to="/about" className="bg-warm-700 hover:bg-warm-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  Learn More
                </Link>
              </div>
            </div>
          </section>
    
          {/* Welcome Section */}
          <section className="py-16 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-earth-900 mb-6">Welcome to Our Community</h2>
              <p className="text-lg text-earth-700 leading-relaxed mb-6">
                Living with chronic pain can feel isolating, but you don't have to face it alone. 
                Our support group provides a safe, understanding environment where you can share your 
                experiences, learn coping strategies, and connect with others who truly understand.
              </p>
              <p className="text-lg text-earth-700 leading-relaxed">
                Whether you're newly diagnosed or have been managing pain for years, our community 
                welcomes you with open arms and compassionate hearts.
              </p>
            </div>
          </section>
    
          {/* Features Grid */}
          <section className="py-16 bg-earth-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-earth-900 text-center mb-12">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card">
                  <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-earth-900 mb-3">Peer Support</h3>
                  <p className="text-earth-700">
                    Connect with others who understand your journey. Share experiences, 
                    challenges, and victories in a judgment-free environment.
                  </p>
                </div>
    
                <div className="card">
                  <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-earth-900 mb-3">Education & Resources</h3>
                  <p className="text-earth-700">
                    Access valuable information about pain management techniques, 
                    treatment options, and self-care strategies.
                  </p>
                </div>
    
                <div className="card">
                  <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-earth-900 mb-3">Compassionate Care</h3>
                  <p className="text-earth-700">
                    Experience genuine understanding and support from trained facilitators 
                    and caring group members.
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          {/* CTA Section */}
          <section className="py-16 bg-warm-500 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Take the First Step?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join us for our next meeting and discover the power of community support.
              </p>
              <Link to="/contact" className="bg-white text-warm-600 hover:bg-warm-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block shadow-lg">
                Get in Touch
              </Link>
            </div>
          </section>
        </div>
      );
    };
    
    export default Home;