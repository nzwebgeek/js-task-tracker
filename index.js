
// Load Node.js file system module.
// We use this to read and write our tasks.json file.
const fs = require("fs");

// Set the location of our task storage file.
const filePath = "./tasks.json";

// Create an empty array to hold our tasks.
let tasks = [];

// Check whether the tasks.json file already exists.
if (fs.existsSync(filePath)) {

  // Read the contents of tasks.json as text.
  const data = fs.readFileSync(filePath, "utf8");

  // Convert the JSON text into a JavaScript array.
  tasks = JSON.parse(data);
}

// Get the command entered in the terminal.
// Examples: add, complete, delete.
const command = process.argv[2];

// Get the additional information supplied with the command.
// This could be a task description or a task number.
const argument = process.argv[3];

// Check whether the user wants to complete a task.
if (command === "complete") {

  // Convert the task number from text into a number.
  const taskNumber = Number(argument);

  // Check that the task number is valid.
  if (taskNumber >= 1 && taskNumber <= tasks.length) {

    // Mark the selected task as completed.
    // Subtract 1 because JavaScript arrays start at index 0.
    tasks[taskNumber - 1].completed = true;

    console.log("Task marked as complete!");

  } else {

    // Display an error if the task number doesn't exist.
    console.log("Invalid task number.");
  }

// Check whether the user wants to delete a task.
} else if (command === "delete") {

  // Convert the task number from text into a number.
  const taskNumber = Number(argument);

  // Check that the task number is valid.
  if (taskNumber >= 1 && taskNumber <= tasks.length) {

    // Remove one task from the array at the selected position.
    const deletedTask = tasks.splice(taskNumber - 1, 1);

    // Display the name of the deleted task.
    console.log(`Deleted: ${deletedTask[0].title}`);

  } else {

    // Display an error if the task number doesn't exist.
    console.log("Invalid task number.");
  }

// Check whether the user wants to add a task.
} else if (command === "add") {

  // Make sure the user has provided a task description.
  if (argument) {

    // Add a new task object to the tasks array.
    // Every new task starts with completed set to false.
    tasks.push({
      title: argument,
      completed: false
    });

    console.log("Task added!");

  } else {

    // Tell the user if they forgot to provide a task description.
    console.log("Please provide a task description.");
  }
}

// Save the updated tasks array to tasks.json.
// JSON.stringify converts the JavaScript array into JSON text.
// The number 2 makes the JSON file easier for humans to read.
fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

// Display the task list heading.
console.log("\nMy tasks:");

// Loop through every task in the array.
for (let i = 0; i < tasks.length; i++) {

  // Display a checkmark if the task is completed.
  // Otherwise, display an empty space.
  const status = tasks[i].completed ? "✓" : " ";

  // Display the task number, status and description.
  console.log(`${i + 1}. [${status}] ${tasks[i].title}`);
}
