import React from 'react';
    
    const Resources = () => {
      const resources = [
        {
          category: 'Pain Management Techniques',
          items: [
            { title: 'Mindfulness Meditation', description: 'Learn techniques to manage pain through mindful awareness' },
            { title: 'Progressive Muscle Relaxation', description: 'Systematic tension and release to reduce physical pain' },
            { title: 'Pacing and Activity Management', description: 'Balance activity and rest to avoid pain flares' },
            { title: 'Heat and Cold Therapy', description: 'When and how to use temperature for pain relief' }
          ]
        },
        {
          category: 'Emotional Wellness',
          items: [
            { title: 'Cognitive Behavioral Therapy (CBT)', description: 'Address negative thought patterns related to pain' },
            { title: 'Acceptance and Commitment Therapy', description: 'Build psychological flexibility in living with pain' },
            { title: 'Stress Management', description: 'Reduce stress that can amplify pain experiences' },
            { title: 'Sleep Hygiene', description: 'Improve sleep quality despite chronic pain' }
          ]
        },
        {
          category: 'Treatment Options',
          items: [
            { title: 'Physical Therapy', description: 'Movement-based approaches to managing pain' },
            { title: 'Medication Management', description: 'Working with healthcare providers on pain medications' },
            { title: 'Alternative Therapies', description: 'Acupuncture, massage, and complementary approaches' },
            { title: 'Interventional Procedures', description: 'Medical procedures for specific pain conditions' }
          ]
        },
        {
          category: 'Self-Care Strategies',
          items: [
            { title: 'Gentle Exercise', description: 'Safe movement options for people with chronic pain' },
            { title: 'Nutrition for Pain', description: 'Foods that may help or hinder pain management' },
            { title: 'Social Connection', description: 'Maintaining relationships despite pain challenges' },
            { title: 'Meaningful Activities', description: 'Finding purpose and joy while living with pain' }
          ]
        }
      ];
    
      const externalResources = [
        { name: 'American Chronic Pain Association', url: 'https://www.theacpa.org/', description: 'Support and resources for chronic pain management' },
        { name: 'Pain Connection', url: 'https://painconnection.org/', description: 'Peer support and education for chronic pain' },
        { name: 'U.S. Pain Foundation', url: 'https://uspainfoundation.org/', description: 'Advocacy and community for people with pain' },
        { name: 'CDC Pain Management Resources', url: 'https://www.cdc.gov/pain/', description: 'Evidence-based pain management information' }
      ];
    
      return (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-earth-900 mb-8 text-center">Resources & Education</h1>
              
              <p className="text-lg text-earth-700 text-center max-w-3xl mx-auto mb-12">
                Explore evidence-based strategies, treatment options, and self-care approaches 
                to help you manage chronic pain and improve your quality of life.
              </p>
    
              {/* Resource Categories */}
              <div className="space-y-8 mb-12">
                {resources.map((category, idx) => (
                  <section key={idx} className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-earth-900 mb-6 border-l-4 border-warm-500 pl-4">
                      {category.category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="border-l-2 border-warm-200 pl-4 hover:border-warm-500 transition-colors">
                          <h3 className="text-lg font-semibold text-warm-700 mb-2">{item.title}</h3>
                          <p className="text-earth-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
    
              {/* External Resources */}
              <section className="bg-warm-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-earth-900 mb-6">Helpful Organizations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {externalResources.map((resource, idx) => (
                    <a 
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-transparent hover:border-warm-300"
                    >
                      <h3 className="text-lg font-semibold text-warm-600 mb-2 flex items-center">
                        {resource.name}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-earth-700 text-sm">{resource.description}</p>
                    </a>
                  ))}
                </div>
              </section>
    
              {/* Download Materials */}
              <section className="bg-earth-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-earth-900 mb-6">Downloadable Materials</h2>
                <p className="text-earth-700 mb-6">
                  We're building a library of helpful handouts and worksheets. Check back soon for:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-center text-earth-700">
                    <svg className="w-5 h-5 text-warm-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Pain Tracking Journal
                  </li>
                  <li className="flex items-center text-earth-700">
                    <svg className="w-5 h-5 text-warm-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Relaxation Exercise Guides
                  </li>
                  <li className="flex items-center text-earth-700">
                    <svg className="w-5 h-5 text-warm-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Medication Log Template
                  </li>
                  <li className="flex items-center text-earth-700">
                    <svg className="w-5 h-5 text-warm-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Goal Setting Worksheets
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      );
    };
    
    export default Resources;