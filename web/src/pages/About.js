import React from 'react';
    
    const About = () => {
      return (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-earth-900 mb-8 text-center">About Our Support Group</h1>
              
              <div className="prose prose-lg max-w-none">
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-earth-900 mb-4">Our Mission</h2>
                  <p className="text-earth-700 leading-relaxed mb-4">
                    The Pain Management Support Group at Eastern Delaware Mental Health Services is dedicated 
                    to providing a safe, compassionate space where individuals living with chronic pain can 
                    find understanding, support, and practical strategies for managing their condition.
                  </p>
                  <p className="text-earth-700 leading-relaxed">
                    We believe that while pain may be part of your life, it doesn't have to define who you are. 
                    Through peer support, education, and shared experiences, we help members discover new ways 
                    to cope, connect, and thrive.
                  </p>
                </section>
    
                <section className="mb-12 bg-warm-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-earth-900 mb-4">Our Approach</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-warm-700 mb-2">Peer-Led Support</h3>
                      <p className="text-earth-700">
                        Our groups are facilitated by trained peers who understand chronic pain firsthand, 
                        creating an atmosphere of genuine empathy and understanding.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-warm-700 mb-2">Evidence-Based Education</h3>
                      <p className="text-earth-700">
                        We share current, reliable information about pain management techniques, treatment 
                        options, and self-care strategies backed by research.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-warm-700 mb-2">Holistic Wellness</h3>
                      <p className="text-earth-700">
                        We address not just physical pain, but the emotional, social, and psychological 
                        aspects of living with chronic conditions.
                      </p>
                    </div>
                  </div>
                </section>
    
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-earth-900 mb-4">What to Expect</h2>
                  <p className="text-earth-700 leading-relaxed mb-4">
                    Each meeting provides a structured yet flexible environment where members can:
                  </p>
                  <ul className="list-disc list-inside text-earth-700 space-y-2 ml-4">
                    <li>Share their experiences and challenges in a confidential setting</li>
                    <li>Learn practical coping strategies and pain management techniques</li>
                    <li>Receive emotional support and validation from others who understand</li>
                    <li>Access community resources and professional referrals</li>
                    <li>Build meaningful connections with fellow members</li>
                    <li>Explore topics related to chronic pain, wellness, and quality of life</li>
                  </ul>
                </section>
    
                <section className="mb-12 bg-earth-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-earth-900 mb-4">Our Values</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-warm-600 mb-2">Compassion</h3>
                      <p className="text-earth-700">We treat every member with kindness, respect, and understanding.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-warm-600 mb-2">Confidentiality</h3>
                      <p className="text-earth-700">What's shared in the group stays in the group.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-warm-600 mb-2">Inclusivity</h3>
                      <p className="text-earth-700">We welcome all individuals regardless of background or pain condition.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-warm-600 mb-2">Empowerment</h3>
                      <p className="text-earth-700">We help members discover their own strength and resilience.</p>
                    </div>
                  </div>
                </section>
    
                <section>
                  <h2 className="text-2xl font-bold text-earth-900 mb-4">About EDMHS</h2>
                  <p className="text-earth-700 leading-relaxed mb-4">
                    Eastern Delaware Mental Health Services has been serving our community for over 30 years, 
                    providing comprehensive mental health and wellness services. Our Pain Management Support 
                    Group is part of our commitment to addressing the whole-person needs of those we serve.
                  </p>
                  <p className="text-earth-700 leading-relaxed">
                    We believe in the power of community, the importance of peer support, and the potential 
                    for every individual to live a meaningful life, regardless of the challenges they face.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default About;