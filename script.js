// Wait until all the paper and drawings (HTML) are ready before our smart helper starts!
document.addEventListener('DOMContentLoaded', function() {
    // Find our special helper elements on the paper by their IDs
    const addButton = document.getElementById('add-task-btn'); // The 'Add Task' button
    const taskInput = document.getElementById('task-input');   // The box where we type new tasks
    const taskList = document.getElementById('task-list');     // The list where our tasks will show up

    // Function to make a new task item and put it on the list
    // 'save' is a special flag: if it's true, we save the task to remember it later
    function addTask(taskText, save = true) {
        // First, let's make sure we actually have something to do!
        if (taskText.trim() === '') {
            alert('Please enter a task! Don\'t forget your job!'); // If no task, we say "Oops!"
            return; // Stop here, don't add an empty task
        }

        // 1. Make a new list item (like a new line on our paper)
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Put the task words on our new line

        // 2. Make a "Remove" button (like a little eraser for this job)
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // The button says "Remove"
        removeButton.classList.add('remove-btn'); // Give it a special look (from our styles.css)

        // 3. Teach the "Remove" button what to do when we push it
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Take this job off our list (from the paper)
            updateLocalStorage(); // And tell our helper to forget it, too!
        };

        // 4. Put the "Remove" button on our new list item
        listItem.appendChild(removeButton);

        // 5. Put our new list item (with the task and remove button) onto our big task list!
        taskList.appendChild(listItem);

        // 6. Clear the input box so we can type a new job
        taskInput.value = '';

        // 7. If 'save' is true, tell our helper to remember this job for later!
        if (save) {
            updateLocalStorage();
        }
    }

    // This function helps our computer helper remember all the tasks
    // It's like writing all the jobs in a secret remembering book!
    function updateLocalStorage() {
        const tasks = []; // Start with an empty list of remembered jobs
        // Go through each job on our big list right now
        taskList.querySelectorAll('li').forEach(item => {
            // Get just the task text, not the "Remove" button
            // We take the text content, and remove the last 6 characters which is "Remove"
            // This is a simple way; for more robust apps, we'd store the task without the button text initially.
            const taskText = item.textContent.slice(0, -6).trim();
            if (taskText) { // Make sure it's not empty
                tasks.push(taskText); // Add this job to our list of remembered jobs
            }
        });
        // Write our list of remembered jobs into the computer's special remembering book
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // This function tells our computer helper to look in its secret remembering book
    // and put all the old jobs back on our list when we open the paper again!
    function loadTasks() {
        // Look in the remembering book for 'tasks'. If nothing there, it's an empty list.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // For each remembered job, add it back to our list (but don't save it again!)
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // When we push the 'Add Task' button, tell our helper to add the job!
    addButton.addEventListener('click', function() {
        addTask(taskInput.value); // Add the job typed in the box
    });

    // If we press the 'Enter' key in the task input box, also add the job!
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Add the job typed in the box
        }
    });

    // When the whole paper is ready, tell our helper to load any old jobs from its remembering book!
    loadTasks();
});
