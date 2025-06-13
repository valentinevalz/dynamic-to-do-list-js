// This tells our computer helper: "Wait until all the paper and drawings are ready before you start!"
document.addEventListener('DOMContentLoaded', function() {
    // 1. Find our special helper elements on the paper by their names (IDs)
    const addButton = document.getElementById('add-task-btn'); // This is the 'Add Task' button!
    const taskInput = document.getElementById('task-input');   // This is the box where we type new tasks!
    const taskList = document.getElementById('task-list');     // This is the big list where our tasks will show up!

    // This array will hold all our tasks so our helper can remember them easily.
    let tasks = [];

    // 2. This is a special instruction for "how to add a new job" to our list!
    // Now, it also has a secret friend called 'save' which tells it if it needs to remember the job for later!
    function addTask(taskTextFromInput, save = true) {
        // First, let's get the words you typed in the box and make sure there are no extra spaces!
        const taskText = taskTextFromInput.trim();

        // If you didn't type any words (it's empty!), we'll say "Oops!"
        if (taskText === '') {
            alert('Please enter a task! Don\'t forget your job!'); // This is like us saying "Hey, put something in!"
            return; // And then we stop here, because there's nothing to add!
        }

        // If you *did* type words, let's make a new job item!
        // A. Make a new line on our paper for this job (an 'li' element)
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Put the words you typed onto this new line!

        // B. Make a "Remove" button for this job (like a little eraser!)
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // The button says "Remove"
        removeButton.classList.add('remove-btn'); // Give it a special red color (from our pretty card!)

        // C. Teach this "Remove" button what to do when we push it!
        removeButton.onclick = function() {
            // When pushed, this button tells our computer helper to take this whole job line off the list!
            taskList.removeChild(listItem);
            // And now, because we're super smart, we also tell our helper to forget this job from its secret book!
            removeTaskFromLocalStorage(taskText); // Tell our helper to update the remembering book!
        };

        // D. Put the "Remove" button right next to our job words on the new line!
        listItem.appendChild(removeButton);

        // E. Put our new job line (with the words and the remove button) onto our big task list!
        taskList.appendChild(listItem);

        // F. Clear the words in the input box so you can type a *new* job!
        taskInput.value = '';

        // G. If 'save' is true, it means this is a brand new job, so let's remember it!
        if (save) {
            tasks.push(taskText); // Add this new job to our helper's memory list
            saveTasksToLocalStorage(); // And tell our helper to write its memory list into the secret book!
        }
    }

    // This is a special instruction for our helper: "Remember all the jobs in your secret book!"
    function saveTasksToLocalStorage() {
        // We take our helper's memory list (tasks array) and turn it into a special string
        // so the secret book can understand it, then we write it down!
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // This is another special instruction: "Forget this job from your secret book!"
    function removeTaskFromLocalStorage(taskTextToRemove) {
        // We find the job we want to forget in our helper's memory list
        tasks = tasks.filter(task => task !== taskTextToRemove);
        // Then we tell our helper to write the new, shorter list into the secret book!
        saveTasksToLocalStorage();
    }

    // This is a super important instruction: "Look in your secret book and put all the old jobs back on the list!"
    function loadTasks() {
        // Look in the secret book for 'tasks'. If there's nothing, it's an empty list.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks; // Our helper's memory list now knows all the old jobs!

        // For each old job, we tell our helper to add it to the list, but WITHOUT saving it again!
        tasks.forEach(taskText => addTask(taskText, false)); // The 'false' means "Don't save it again!"
    }

    // 3. Now, let's teach our computer helper how to *listen*!

    // When we push the 'Add Task' button, tell our helper to run the 'addTask' instructions!
    addButton.addEventListener('click', function() {
        addTask(taskInput.value); // Add the job typed in the box
    });

    // If we press a key in the task input box, and it's the 'Enter' key, also add the job!
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Add the job typed in the box
        }
    });

    // Most importantly, when the whole paper and drawings are ready, tell our helper
    // to first look in its secret book and put all the old jobs back on the list!
    loadTasks();
});
