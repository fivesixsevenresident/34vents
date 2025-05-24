const fetchAboutInfo = () => {
  return {
    title: "About SamplePlay",
    mission:
      "Our mission is to create innovative and user-friendly applications that solve real-world problems.",
    sections: [
      {
        heading: "Our Story",
        content:
          "SamplePlay began in 2023 with a simple idea: to build tools that make development easier and more enjoyable. What started as a small project by a team of passionate developers has grown into a platform used by thousands worldwide. We believe in creating applications that are not only functional but also delightful to use.",
      },
      {
        heading: "Our Values",
        content:
          "At SamplePlay, we're guided by a set of core values that shape everything we do. We believe in transparency, collaboration, and continuous improvement. We're committed to creating products that respect user privacy and promote digital well-being. Every feature we build is designed with our users in mind, ensuring that our applications are accessible and inclusive.",
      },
      {
        heading: "Our Team",
        content:
          "Our diverse team brings together expertise from various backgrounds - from software engineering to user experience design. We're united by our passion for technology and our desire to make a positive impact. We work remotely across different time zones, embracing the flexibility and diversity this brings to our culture.",
      },
      {
        heading: "Our Approach",
        content:
          "We take a user-centered approach to development, focusing on solving real problems rather than implementing technology for its own sake. We iterate quickly, gather feedback constantly, and aren't afraid to pivot when necessary. This agile methodology allows us to stay responsive to user needs and industry trends.",
      },
      {
        heading: "Looking Forward",
        content:
          "As we look to the future, we're excited about the possibilities that emerging technologies offer. We're continuously exploring new ways to enhance our applications and create meaningful experiences for our users. We're committed to growing sustainably while staying true to our founding principles.",
      },
    ],
    contact: {
      email: "hello@sampleplay.example",
      location: "San Francisco, CA",
      social: {
        twitter: "@sampleplay",
        github: "github.com/sampleplay",
      },
    },
  };
};

export { fetchAboutInfo };
