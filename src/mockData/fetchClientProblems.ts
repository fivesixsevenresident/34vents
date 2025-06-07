const fetchClientProblems = () => {
  return {
    title: "Your Service History",
    problems: [
      {
        id: "prob-001",
        summary: "Plumbing Repair for Toilet",
        serviceType: "plumbing-repair",
        location: "toilet",
        appliance: null,
        status: "completed",
        createdDate: "2024-01-15",
        completedDate: "2024-01-16",
        technician: "Mike Johnson",
        cost: "$185.00",
        rating: 5,
        description: "Toilet was running continuously due to faulty flapper valve. Replaced flapper and adjusted chain length.",
        notes: "Customer was very satisfied with quick service. Recommended annual maintenance check."
      },
      {
        id: "prob-002",
        summary: "Installation Consultation for Dishwasher",
        serviceType: "installation-consultation",
        location: "appliance",
        appliance: "dishwasher",
        status: "completed",
        createdDate: "2024-02-03",
        completedDate: "2024-02-05",
        technician: "Sarah Chen",
        cost: "$320.00",
        rating: 5,
        description: "Consultation for new dishwasher installation. Provided estimate and scheduled installation.",
        notes: "Kitchen renovation project. Customer chose premium model with extended warranty."
      },
      {
        id: "prob-003",
        summary: "Plumbing Repair for Faucet",
        serviceType: "plumbing-repair",
        location: "faucet",
        appliance: null,
        status: "completed",
        createdDate: "2024-02-20",
        completedDate: "2024-02-20",
        technician: "David Martinez",
        cost: "$95.00",
        rating: 4,
        description: "Kitchen faucet had persistent drip. Replaced O-rings and washers.",
        notes: "Quick repair completed same day. Advised customer on maintenance tips."
      },
      {
        id: "prob-004",
        summary: "Plumbing Repair for Garbage Disposal",
        serviceType: "plumbing-repair",
        location: "appliance",
        appliance: "garbage-disposal",
        status: "in-progress",
        createdDate: "2024-03-10",
        completedDate: null,
        technician: "Mike Johnson",
        cost: "TBD",
        rating: null,
        description: "Garbage disposal jammed and not turning on. Scheduled for repair.",
        notes: "Appointment scheduled for tomorrow morning. Customer advised not to use until repaired."
      },
      {
        id: "prob-005",
        summary: "Plumbing Repair for Shower",
        serviceType: "plumbing-repair",
        location: "shower",
        appliance: null,
        status: "scheduled",
        createdDate: "2024-03-15",
        completedDate: null,
        technician: "TBD",
        cost: "TBD",
        rating: null,
        description: "Low water pressure in master bathroom shower. Consultation requested.",
        notes: "Initial assessment scheduled for next week. May require pipe inspection."
      }
    ],
    stats: {
      totalServices: 5,
      completedServices: 3,
      averageRating: 4.7,
      totalSpent: "$600.00",
      memberSince: "2024-01-15"
    }
  };
 };
 
 
 export { fetchClientProblems };