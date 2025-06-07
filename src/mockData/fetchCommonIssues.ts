const fetchCommonIssues = () => {
 return {
   title: "Common Plumbing Issues",
   subtitle: "Quick solutions to the most frequent plumbing problems",
   description: "Click on any issue below to see step-by-step resolution instructions. If these solutions don't work, consider contacting a professional plumber.",
   issues: [
     {
       id: "clogged-drain",
       name: "Clogged Drain",
       category: "Drainage",
       resolution: {
         overview: "A clogged drain is usually caused by hair, soap scum, food particles, or other debris blocking the pipe.",
         difficulty: "Easy",
         timeRequired: "15-30 minutes",
         toolsNeeded: ["Plunger", "Drain snake", "Baking soda", "White vinegar"],
         steps: [
           "Remove any visible debris from the drain opening",
           "Try using a plunger to create pressure and dislodge the clog",
           "If plunging doesn't work, pour 1/2 cup baking soda down the drain",
           "Follow with 1/2 cup white vinegar and cover the drain for 15 minutes",
           "Flush with hot water to clear the loosened debris",
           "For stubborn clogs, use a drain snake to physically remove the blockage"
         ],
         warnings: [
           "Avoid using chemical drain cleaners as they can damage pipes",
           "Never mix different cleaning chemicals"
         ]
       }
     },
     {
       id: "running-toilet",
       name: "Running Toilet",
       category: "Toilet",
       resolution: {
         overview: "A running toilet typically occurs when the flapper doesn't seal properly or the chain is too long/short.",
         difficulty: "Easy",
         timeRequired: "10-20 minutes",
         toolsNeeded: ["None (hands only)", "Possibly needle-nose pliers"],
         steps: [
           "Remove the toilet tank lid and set it aside safely",
           "Check if the flapper is sealing properly against the flush valve seat",
           "If the flapper is warped or cracked, replace it",
           "Adjust the chain length - it should have slight slack when flapper is closed",
           "Check that the float isn't sticking or hitting the tank walls",
           "Ensure the water level is about 1 inch below the rim of the tank"
         ],
         warnings: [
           "Handle the tank lid carefully as it can crack easily",
           "Turn off water supply if you need to drain the tank"
         ]
       }
     },
     {
       id: "low-water-pressure",
       name: "Low Water Pressure",
       category: "Water Flow",
       resolution: {
         overview: "Low water pressure can be caused by mineral buildup in faucet aerators, shower heads, or issues with the water supply.",
         difficulty: "Easy to Moderate",
         timeRequired: "20-45 minutes",
         toolsNeeded: ["Wrench", "White vinegar", "Plastic bag", "Old toothbrush"],
         steps: [
           "Check if the issue affects multiple fixtures or just one",
           "For faucets: Unscrew the aerator and clean out mineral deposits",
           "For shower heads: Remove and soak in white vinegar overnight",
           "Use an old toothbrush to scrub away mineral buildup",
           "If problem persists in multiple locations, check the main water valve",
           "Contact your water company if the issue is building-wide"
         ],
         warnings: [
           "Don't over-tighten faucet aerators when reinstalling",
           "If you have very old pipes, low pressure might indicate a bigger issue"
         ]
       }
     },
     {
       id: "leaky-faucet",
       name: "Leaky Faucet",
       category: "Faucet",
       resolution: {
         overview: "Faucet leaks are commonly caused by worn washers, O-rings, or valve seats that need replacement.",
         difficulty: "Moderate",
         timeRequired: "30-60 minutes",
         toolsNeeded: ["Adjustable wrench", "Screwdriver", "Replacement parts (washers, O-rings)"],
         steps: [
           "Turn off the water supply valves under the sink",
           "Plug the drain to prevent small parts from falling down",
           "Remove the faucet handle (method varies by faucet type)",
           "Remove the packing nut with an adjustable wrench",
           "Pull out the stem and inspect the washer and O-ring",
           "Replace worn washers and O-rings with exact matches",
           "Reassemble in reverse order and test for leaks"
         ],
         warnings: [
           "Take a photo before disassembly to remember part placement",
           "Bring old parts to hardware store to ensure correct replacements"
         ]
       }
     },
     {
       id: "water-heater-issues",
       name: "No Hot Water",
       category: "Water Heater",
       resolution: {
         overview: "No hot water can be caused by pilot light issues (gas) or heating element problems (electric).",
         difficulty: "Moderate to Hard",
         timeRequired: "15-60 minutes",
         toolsNeeded: ["Flashlight", "Multimeter (for electric)", "Lighter (for gas pilot)"],
         steps: [
           "Check if the issue affects all hot water or just one fixture",
           "For gas water heaters: Check if the pilot light is lit",
           "If pilot is out, follow manufacturer instructions to relight",
           "For electric water heaters: Check the circuit breaker",
           "Test heating elements with a multimeter if you're experienced",
           "Check the temperature setting on the water heater",
           "If these steps don't work, call a professional"
         ],
         warnings: [
           "Gas appliances can be dangerous - call a professional if unsure",
           "Electric water heaters involve high voltage - use caution",
           "Never attempt repairs on a gas line"
         ]
       }
     },
     {
       id: "garbage-disposal-jam",
       name: "Garbage Disposal Not Working",
       category: "Appliance",
       resolution: {
         overview: "Garbage disposals can jam from food debris, lack of water, or overheating.",
         difficulty: "Easy to Moderate",
         timeRequired: "10-30 minutes",
         toolsNeeded: ["Hex wrench (Allen key)", "Flashlight", "Tongs or pliers"],
         steps: [
           "Turn off power to the disposal at the circuit breaker",
           "Never put your hand inside the disposal",
           "Look for a reset button on the bottom of the unit and press it",
           "Use a flashlight to look for visible obstructions",
           "Remove any visible debris with tongs or pliers",
           "Insert hex wrench into bottom center of unit and turn both ways",
           "Restore power and test with cold water running"
         ],
         warnings: [
           "Always turn off power before working on disposal",
           "Never use your hands to remove obstructions",
           "Run cold water when operating the disposal"
         ]
       }
     }
   ],
   emergencyNote: "If you have a major leak, burst pipe, or sewage backup, turn off your main water supply immediately and call a professional plumber.",
   disclaimer: "These are general guidelines. If you're not comfortable performing these repairs or if the problem persists, contact a licensed plumber."
 };
};


export { fetchCommonIssues };


