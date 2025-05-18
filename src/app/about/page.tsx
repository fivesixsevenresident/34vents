import React from 'react';
import aboutData from '../../mockData/about.json';

export default function About() {
  return (
   <div className="max-w-4xl mx-auto p-8">
     <h1 className="text-3xl font-bold mb-6">{aboutData.title}</h1>
    
     <p className="text-lg mb-8 text-gray-700">{aboutData.mission}</p>
    
     {aboutData.sections.map((section, index) => (
       <section key={index} className="mb-8">
         <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
         <p className="text-gray-700">{section.content}</p>
       </section>
     ))}
    
     <div className="mt-12 p-6 bg-gray-50 rounded-lg">
       <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
       <p className="mb-2">Email: {aboutData.contact.email}</p>
       <p className="mb-2">Location: {aboutData.contact.location}</p>
       <div className="flex gap-4 mt-4">
         <a href={`https://twitter.com/${aboutData.contact.social.twitter.replace('@', '')}`}
            className="text-blue-600 hover:text-blue-800">
           {aboutData.contact.social.twitter}
         </a>
         <a href={`https://${aboutData.contact.social.github}`}
            className="text-blue-600 hover:text-blue-800">
           GitHub
         </a>
       </div>
     </div>
   </div>
 );
}
