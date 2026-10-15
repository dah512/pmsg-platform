import React from 'react';
    
    const Meetings = () => {
      return (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-earth-900 mb-8 text-center">Meeting Information</h1>
              
              {/* Meeting Schedule */}
              <section className="mb-12">
                <div className="bg-warm-500 text-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Weekly Meeting Schedule</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-lg">Every Tuesday</p>
                        <p className="text-warm-100">6:00 PM - 7:30 PM EST</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-lg">EDMHS Community Center</p>
                        <p className="text-warm-100">123 Main Street, Dover, DE 19901</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    
              {/* What Happens */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-earth-900 mb-6">What Happens in a Meeting?</h2>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center text-warm-600 font-bold mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-earth-900 mb-2">Welcome & Check-In (15 min)</h3>
                        <p className="text-earth-700">
                          We start with a warm welcome and brief check-in where members can share how they're doing.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center text-warm-600 font-bold mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-earth-900 mb-2">Topic Discussion (45 min)</h3>
                        <p className="text-earth-700">
                          We explore a relevant topic like coping strategies, medication management, or emotional wellness.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center text-warm-600 font-bold mr-4">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-earth-900 mb-2">Open Sharing (25 min)</h3>
                        <p className="text-earth-700">
                          Members have the opportunity to share experiences, ask questions, and offer support to one another.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center text-warm-600 font-bold mr-4">
                        4
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-earth-900 mb-2">Closing & Resources (5 min)</h3>
                        <p className="text-earth-700">
                          We close with a brief summary, share any relevant resources, and confirm the next meeting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    
              {/* First Timer Info */}
              <section className="mb-12 bg-earth-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-earth-900 mb-4">First Time Attending?</h2>
                <p className="text-earth-700 mb-4">
                  We're so glad you're considering joining us! Here's what you should know:
                </p>
                <ul className="space-y-3 text-earth-700">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-warm-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No appointment necessary - just show up!</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-warm-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Meetings are free and open to all</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-warm-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>You can listen without sharing if you prefer</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-warm-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Everything shared is confidential</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-warm-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Arrive 5-10 minutes early to meet the facilitator</span>
                  </li>
                </ul>
              </section>
    
              {/* Virtual Option */}
              <section className="bg-warm-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-earth-900 mb-4">Can't Make It In Person?</h2>
                <p className="text-earth-700 mb-4">
                  We understand that chronic pain can make travel difficult. We're working on virtual meeting 
                  options to make our support group more accessible to everyone.
                </p>
                <p className="text-earth-700">
                  Contact us to learn more about upcoming virtual meeting opportunities.
                </p>
              </section>
            </div>
          </div>
        </div>
      );
    };
    
    export default Meetings;