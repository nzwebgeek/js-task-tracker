console.log("Welcome to my Task Tracker!");
console.log("Let's get things done.");

const tasks = ["Learn JavaScript", "Practise Git", "Build my first app", "Learn Github"];


console.log("\nMy tasks:");

for (let i = 0; i < tasks.length; i++) {
  console.log(`${i + 1}. ${tasks[i]}`);
}

