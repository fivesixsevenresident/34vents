const fetchTechnicianProblems = () => {
 return {
   title: "Assigned Service Calls",
   technician: {
     name: "Mike Johnson",
     id: "tech-001",
     specialties: ["Plumbing Repair", "Installation", "Emergency Services"],
     rating: 4.8,
     completedJobs: 847,
     memberSince: "2019-03-15"
   },
   problems: [
     {
       id: "prob-101",
       clientName: "Sarah Williams",
       clientEmail: "sarah.w@email.com",
       clientPhone: "(555) 123-4567",
       summary: "Plumbing Repair for Toilet",
       serviceType: "plumbing-repair",
       location: "toilet",
       appliance: null,
       status: "scheduled",
       priority: "medium",
       scheduledDate: "2024-03-18",
       scheduledTime: "10:00 AM",
       estimatedDuration: "1-2 hours",
       address: "1234 Oak Street, Springfield, IL 62701",
       description: "Customer reports toilet running continuously. Likely flapper valve issue based on initial assessment.",
       customerNotes: "Toilet has been running for 3 days. Located in master bathroom upstairs.",
       estimatedCost: "$150-200"
     },
     {
       id: "prob-102",
       clientName: "John Davis",
       clientEmail: "j.davis@email.com",
       clientPhone: "(555) 987-6543",
       summary: "Installation Consultation for Hot Water Heater",
       serviceType: "installation-consultation",
       location: "appliance",
       appliance: "hot-water-heater",
       status: "in-progress",
       priority: "high",
       scheduledDate: "2024-03-17",
       scheduledTime: "2:00 PM",
       estimatedDuration: "2-3 hours",
       address: "5678 Pine Avenue, Springfield, IL 62702",
       description: "Replace old 40-gallon electric water heater with new energy-efficient model. Customer has already purchased unit.",
       customerNotes: "Old unit is 15 years old and leaking. New unit is in garage ready for installation.",
       estimatedCost: "$800-1200"
     },
     {
       id: "prob-103",
       clientName: "Emma Thompson",
       clientEmail: "emma.t@email.com",
       clientPhone: "(555) 456-7890",
       summary: "Plumbing Repair for Kitchen Faucet",
       serviceType: "plumbing-repair",
       location: "faucet",
       appliance: null,
       status: "completed",
       priority: "low",
       scheduledDate: "2024-03-15",
       scheduledTime: "9:00 AM",
       completedDate: "2024-03-15",
       actualDuration: "45 minutes",
       address: "9101 Maple Drive, Springfield, IL 62703",
       description: "Kitchen faucet dripping constantly. Replaced O-rings and washers.",
       customerNotes: "Drip started last week and has gotten worse. Single handle faucet.",
       finalCost: "$95.00",
       customerRating: 5,
       customerFeedback: "Quick and professional service. Mike explained everything clearly."
     },
     {
       id: "prob-104",
       clientName: "Robert Chen",
       clientEmail: "r.chen@email.com",
       clientPhone: "(555) 321-0987",
       summary: "Emergency Plumbing Repair for Pipes",
       serviceType: "plumbing-repair",
       location: "pipes-valves-connections",
       appliance: null,
       status: "scheduled",
       priority: "urgent",
       scheduledDate: "2024-03-17",
       scheduledTime: "8:00 AM",
       estimatedDuration: "3-4 hours",
       address: "2468 Cedar Lane, Springfield, IL 62704",
       description: "Burst pipe in basement causing flooding. Emergency repair needed immediately.",
       customerNotes: "Water shut off at main. Need immediate attention to prevent further damage.",
       estimatedCost: "$400-600"
     },
     {
       id: "prob-105",
       clientName: "Lisa Martinez",
       clientEmail: "lisa.m@email.com",
       clientPhone: "(555) 654-3210",
       summary: "Plumbing Repair for Shower",
       serviceType: "plumbing-repair",
       location: "shower",
       appliance: null,
       status: "completed",
       priority: "medium",
       scheduledDate: "2024-03-14",
       scheduledTime: "1:00 PM",
       completedDate: "2024-03-14",
       actualDuration: "1.5 hours",
       address: "1357 Birch Road, Springfield, IL 62705",
       description: "Low water pressure in master shower. Cleaned mineral deposits from shower head and checked pipes.",
       customerNotes: "Pressure has been decreasing over past month. Other fixtures seem fine.",
       finalCost: "$120.00",
       customerRating: 4,
       customerFeedback: "Good work, but took a bit longer than expected."
     },
     {
       id: "prob-106",
       clientName: "David Wilson",
       clientEmail: "d.wilson@email.com",
       clientPhone: "(555) 789-0123",
       summary: "Installation Consultation for Dishwasher",
       serviceType: "installation-consultation",
       location: "appliance",
       appliance: "dishwasher",
       status: "scheduled",
       priority: "low",
       scheduledDate: "2024-03-19",
       scheduledTime: "11:00 AM",
       estimatedDuration: "2-3 hours",
       address: "8642 Elm Street, Springfield, IL 62706",
       description: "Install new dishwasher in kitchen renovation. Requires new electrical and plumbing connections.",
       customerNotes: "Kitchen remodel almost complete. Need dishwasher connected to finish project.",
       estimatedCost: "$300-450"
     }
   ],
   stats: {
     totalAssignedJobs: 6,
     completedToday: 2,
     scheduledToday: 2,
     urgentJobs: 1,
     averageRating: 4.5,
     totalRevenueThisMonth: "$2,850.00"
   },
   todaySchedule: [
     {
       time: "8:00 AM",
       client: "Robert Chen",
       type: "Emergency Repair",
       location: "2468 Cedar Lane",
       priority: "urgent"
     },
     {
       time: "2:00 PM",
       client: "John Davis",
       type: "Water Heater Installation",
       location: "5678 Pine Avenue",
       priority: "high"
     }
   ]
 };
};


export { fetchTechnicianProblems };

