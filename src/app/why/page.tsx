import React from "react";
import Link from "next/link";
import { fetchWhy } from "../../mockData/fetchWhy";

interface Reason {
  heading: string;
  content: string;
  benefits: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export default function Why() {
  const whyData = fetchWhy();
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{whyData.title}</h1>
      <p className="text-lg mb-8 text-gray-700">{whyData.subtitle}</p>

      {whyData.reasons.map((reason: Reason, index: number) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{reason.heading}</h2>
          <p className="text-gray-700 mb-6">{reason.content}</p>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Key Benefits:</h3>
            <ul className="list-disc list-inside space-y-2">
              {reason.benefits.map((benefit: string, benefitIndex: number) => (
                <li key={benefitIndex} className="text-gray-700">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-semibold mb-8">What Our Customers Say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {whyData.testimonials.map(
            (testimonial: Testimonial, index: number) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg">
                <blockquote className="text-gray-700 mb-4">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            )
          )}
        </div>
      </section>

      <div className="mt-16 p-8 bg-blue-600 text-white rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">
          {whyData.callToAction.title}
        </h2>
        <p className="mb-6">{whyData.callToAction.description}</p>
        <Link
          href="/fix"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          {whyData.callToAction.buttonText}
        </Link>
      </div>
    </div>
  );
}
