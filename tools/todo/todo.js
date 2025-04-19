document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const tasksList = document.getElementById("tasks");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = Array.from(tasksList.children).map(taskItem => {
            return {
                text: taskItem.querySelector("span").textContent,
                completed: taskItem.classList.contains("completed")
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Add a task to the DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const taskItem = document.createElement("li");
        if (completed) taskItem.classList.add("completed");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            tasksList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteButton);
        tasksList.appendChild(taskItem);
    };

    // Add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = "";
    };

    // Clear all tasks
    const clearAllTasks = () => {
        tasksList.innerHTML = "";
        saveTasks();
    };

    // Add task on button click
    addTaskButton.addEventListener("click", addTask);

    // Add task on Enter key press
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Add a clear all button
    const clearAllButton = document.createElement("button");
    clearAllButton.textContent = "Clear All";
    clearAllButton.id = "clear-all";
    clearAllButton.classList.add("clear-all");
    clearAllButton.addEventListener("click", clearAllTasks);
    document.querySelector(".todo-input").appendChild(clearAllButton);

    // Load tasks on page load
    loadTasks();

    // Add functionality to 'Back to Home' button
    document.getElementById("back-to-home").addEventListener("click", () => {
        window.location.href = "../../index.html";
    });
});