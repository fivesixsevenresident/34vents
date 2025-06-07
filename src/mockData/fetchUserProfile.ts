const fetchUserProfile = (userType: "client" | "technician") => {
 if (userType === "client") {
   return {
     personalInfo: {
       name: "John Smith",
       email: "client@example.com",
       phone: "(555) 123-4567",
       address: "1234 Main Street, Springfield, IL 62701",
       memberSince: "2024-01-15",
       preferredContactMethod: "phone"
     },
     equipment: [
       {
         id: "eq-001",
         type: "Water Heater",
         brand: "Rheem",
         model: "RTEX-13",
         age: "3 years",
         location: "Basement",
         lastService: "2024-02-15",
         warrantyExpires: "2026-01-15",
         status: "Good"
       },
       {
         id: "eq-002",
         type: "Garbage Disposal",
         brand: "InSinkErator",
         model: "Evolution Excel",
         age: "1 year",
         location: "Kitchen",
         lastService: "2024-03-10",
         warrantyExpires: "2027-01-20",
         status: "Needs Repair"
       },
       {
         id: "eq-003",
         type: "Water Softener",
         brand: "Culligan",
         model: "HE-1.25",
         age: "5 years",
         location: "Utility Room",
         lastService: "2024-01-20",
         warrantyExpires: "2025-06-15",
         status: "Good"
       }
     ],
     tools: [
       {
         id: "tool-001",
         name: "Adjustable Wrench",
         brand: "Husky",
         size: "10-inch",
         purchaseDate: "2023-03-15",
         condition: "Good",
         notes: "Primary wrench for basic repairs"
       },
       {
         id: "tool-002",
         name: "Plunger",
         brand: "Korky",
         type: "Toilet Plunger",
         purchaseDate: "2024-01-10",
         condition: "Excellent",
         notes: "Heavy-duty with flange design"
       },
       {
         id: "tool-003",
         name: "Pipe Wrench",
         brand: "RIDGID",
         size: "14-inch",
         purchaseDate: "2023-08-22",
         condition: "Good",
         notes: "For larger pipe work"
       }
     ],
     appliances: [
       {
         id: "app-001",
         type: "Dishwasher",
         brand: "KitchenAid",
         model: "KDTM354ESS",
         serialNumber: "KA24568901",
         installDate: "2023-11-15",
         lastService: "2024-02-20",
         warrantyExpires: "2025-11-15",
         status: "Good",
         location: "Kitchen"
       },
       {
         id: "app-002",
         type: "Washing Machine",
         brand: "Whirlpool",
         model: "WTW7120HW",
         serialNumber: "WP19876543",
         installDate: "2022-06-10",
         lastService: "2024-01-15",
         warrantyExpires: "2024-06-10",
         status: "Warranty Expired",
         location: "Laundry Room"
       },
       {
         id: "app-003",
         type: "Water Heater",
         brand: "Rheem",
         model: "RTEX-13",
         serialNumber: "RH13245678",
         installDate: "2021-01-15",
         lastService: "2024-02-15",
         warrantyExpires: "2026-01-15",
         status: "Good",
         location: "Basement"
       }
     ]
   };
 } else {
   // Technician profile
   return {
     personalInfo: {
       name: "Mike Johnson",
       email: "technician@example.com",
       phone: "(555) 987-6543",
       address: "5678 Oak Avenue, Springfield, IL 62702",
       memberSince: "2019-03-15",
       licenseNumber: "PLB-2019-4567",
       specialties: ["Plumbing Repair", "Installation", "Emergency Services"],
       certifications: ["Master Plumber", "Water Heater Specialist", "Backflow Prevention"]
     },
     equipment: [
       {
         id: "eq-101",
         type: "Pipe Inspection Camera",
         brand: "RIDGID",
         model: "SeeSnake MicroReel L100",
         purchaseDate: "2022-04-15",
         lastMaintenance: "2024-02-20",
         condition: "Excellent",
         location: "Service Van #1"
       },
       {
         id: "eq-102",
         type: "Drain Cleaning Machine",
         brand: "RIDGID",
         model: "K-1500",
         purchaseDate: "2021-08-10",
         lastMaintenance: "2024-01-15",
         condition: "Good",
         location: "Service Van #1"
       },
       {
         id: "eq-103",
         type: "Pipe Threading Machine",
         brand: "RIDGID",
         model: "535",
         purchaseDate: "2020-11-22",
         lastMaintenance: "2024-03-01",
         condition: "Good",
         location: "Workshop"
       }
     ],
     tools: [
       {
         id: "tool-101",
         name: "Professional Pipe Wrench Set",
         brand: "RIDGID",
         sizes: "10\", 14\", 18\", 24\"",
         purchaseDate: "2019-05-20",
         condition: "Excellent",
         notes: "Heavy-duty cast iron construction"
       },
       {
         id: "tool-102",
         name: "Tubing Cutter Set",
         brand: "RIDGID",
         sizes: "1/8\" - 2 5/8\"",
         purchaseDate: "2020-02-15",
         condition: "Good",
         notes: "For copper and plastic tubing"
       },
       {
         id: "tool-103",
         name: "Basin Wrench",
         brand: "RIDGID",
         model: "EZ Change",
         purchaseDate: "2021-09-12",
         condition: "Excellent",
         notes: "Essential for faucet installations"
       },
       {
         id: "tool-104",
         name: "Torch Kit",
         brand: "Bernzomatic",
         type: "MAP-Pro",
         purchaseDate: "2019-11-08",
         condition: "Good",
         notes: "For soldering copper joints"
       }
     ],
     appliances: [
       {
         id: "app-101",
         type: "Service Van Equipment",
         brand: "Custom Setup",
         model: "Ford Transit 350",
         description: "Mobile workshop with all essential plumbing tools and parts",
         setupDate: "2022-01-15",
         lastInspection: "2024-02-28",
         condition: "Excellent",
         location: "Service Van #1"
       }
     ],
     serviceStats: {
       totalJobsCompleted: 847,
       averageRating: 4.8,
       yearsExperience: 15,
       monthlyRevenue: "$8,450"
     }
   };
 }
};


export { fetchUserProfile };

