const fetchTools = () => {
 return {
   title: "Essential Plumbing Tools",
   subtitle: "Get the right tools for your plumbing projects",
   description: "Browse our selection of high-quality plumbing tools. Click on any tool to purchase from our trusted retailers.",
   tools: [
     {
       id: "channel-wrench",
       name: "Channel Wrench",
       description: "Adjustable wrench perfect for gripping pipes and fittings of various sizes. Essential for most plumbing repairs.",
       price: "$24.99",
       image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&auto=format",
       buyLink: "https://www.homedepot.com/p/Husky-12-in-Tongue-and-Groove-Pliers/304217524",
       features: [
         "12-inch length for maximum leverage",
         "Non-slip grip handles",
         "Chrome vanadium steel construction",
         "Adjustable jaw opening"
       ]
     },
     {
       id: "plunger",
       name: "Plunger",
       description: "Heavy-duty toilet plunger with flange design for maximum suction power. A must-have for any household.",
       price: "$19.99",
       image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&auto=format",
       buyLink: "https://www.homedepot.com/p/Korky-6-in-Toilet-Plunger-with-T-Handle-99-4A/100554467",
       features: [
         "Flange design for toilets",
         "Comfortable T-handle grip",
         "Heavy-duty rubber construction",
         "Works on most toilet models"
       ]
     },
     {
       id: "bucket",
       name: "Utility Bucket",
       description: "5-gallon heavy-duty bucket perfect for catching water, mixing compounds, and general plumbing work.",
       price: "$12.99",
       image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
       buyLink: "https://www.homedepot.com/p/The-Home-Depot-5-Gal-Homer-Bucket-05GLHD2/100087613",
       features: [
         "5-gallon capacity",
         "Reinforced handle",
         "Durable plastic construction",
         "Easy pour spout"
       ]
     },
     {
       id: "pliers",
       name: "Needle Nose Pliers",
       description: "Precision pliers for gripping small parts, pulling cotter pins, and working in tight spaces.",
       price: "$16.99",
       image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&auto=format",
       buyLink: "https://www.homedepot.com/p/Husky-8-in-Long-Nose-Pliers-with-Wire-Cutter-H8LNPWC/304217513",
       features: [
         "8-inch long nose design",
         "Built-in wire cutter",
         "Non-slip grip handles",
         "Precision machined jaws"
       ]
     },
     {
       id: "wrench",
       name: "Adjustable Wrench",
       description: "10-inch adjustable wrench for nuts, bolts, and pipe fittings. Versatile tool for any plumbing toolkit.",
       price: "$21.99",
       image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop&auto=format",
       buyLink: "https://www.homedepot.com/p/Husky-10-in-Adjustable-Wrench-H10ADJW/304217520",
       features: [
         "10-inch length",
         "Wide jaw opening",
         "Chrome finish for durability",
         "Comfortable grip handle"
       ]
     }
   ],
   disclaimer: "Prices and availability may vary. Links provided are for reference and may redirect to retailer websites.",
   tips: [
     "Always turn off water supply before starting any plumbing work",
     "Keep tools clean and dry to prevent rust",
     "Invest in quality tools for better durability and performance",
     "Consider renting specialized tools for one-time projects"
   ]
 };
};


export { fetchTools };

