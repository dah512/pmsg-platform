import React from 'react';
    
    const Contact = () => {
      return (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-earth-900 mb-8 text-center">Get in Touch</h1>
              
              <p className="text-lg text-earth-700 text-center mb-12">
                Have questions about our support group? We're here to help.
              </p>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-earth-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-warm-500 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-earth-900 mb-1">Phone</h3>
                        <p className="text-earth-700">(302) 555-0123</p>
                        <p className="text-sm text-earth-600 mt-1">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-warm-500 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-earth-900 mb-1">Email</h3>
                        <p className="text-earth-700">paingroup@edmhs.org</p>
                        <p className="text-sm text-earth-600 mt-1">We respond within 24-48 hours</p>
                      </div>
                    </div>
    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-warm-500 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-earth-900 mb-1">Location</h3>
                        <p className="text-earth-700">Empowered Disease Management (EDM) Health Services, LLC</p>
                        <p className="text-earth-700">3170 West Central Avenue</p>
                        <p className="text-earth-700">Toledo, OH 43606</p>
                      </div>
                    </div>
                  </div>
    
                  <div className="mt-8 pt-8 border-t border-earth-200">
                    <h3 className="font-semibold text-earth-900 mb-3">Crisis Support</h3>
                    <p className="text-earth-700 mb-2">
                      If you're in crisis, please call our 24/7 crisis line: </p>
                    <p className="text-2xl font-bold text-warm-600">1-800-EDM-PMSG</p>
                  </div>
                </div>
    
                {/* Map Placeholder */}
                <div className="bg-earth-100 rounded-xl shadow-lg overflow-hidden h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-16 h-16 text-earth-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-earth-600">Interactive map coming soon</p>
                    <a 
                      href="https://maps.google.com/?q=123+Main+Street+Dover+DE+19901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-warm-600 hover:text-warm-700 font-semibold"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
    
              {/* FAQ */}
              <section className="bg-warm-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-earth-900 mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-warm-700 mb-2">Do I need to register in advance?</h3>
                    <p className="text-earth-700">
                      No registration needed! Just show up to any Tuesday meeting. We recommend arriving 5-10 minutes 
                      early if it's your first time so we can welcome you and answer any questions.
                    </p>
                  </div>
    
                  <div>
                    <h3 className="text-lg font-semibold text-warm-700 mb-2">Is there a cost to attend?</h3>
                    <p className="text-earth-700">
                      No, all our support group meetings are completely free. We believe support should be accessible to everyone.
                    </p>
                  </div>
    
                  <div>
                    <h3 className="text-lg font-semibold text-warm-700 mb-2">What if I'm not comfortable sharing?</h3>
                    <p className="text-earth-700">
                      That's completely okay! You're welcome to listen and participate at your own comfort level. 
                      There's no pressure to share your story until you're ready.
                    </p>
                  </div>
    
                  <div>
                    <h3 className="text-lg font-semibold text-warm-700 mb-2">Can family members attend?</h3>
                    <p className="text-earth-700">
                      Our primary meetings are for individuals living with chronic pain. However, we're planning 
                      special sessions for caregivers and family members. Contact us for more information.
                    </p>
                  </div>
    
                  <div>
                    <h3 className="text-lg font-semibold text-warm-700 mb-2">Is the building accessible?</h3>
                    <p className="text-earth-700">
                      Yes, our facility is fully wheelchair accessible with accessible parking, restrooms, and meeting spaces.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    };
    
    export default Contact;
