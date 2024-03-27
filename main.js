document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    // Load tasks from localStorage on page load
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        displayTasks();
    }

    // Event listener for form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    // Function to add a new task
    function addTask() {
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        const dueDateInput = document.getElementById('due-date');

        const newTask = {
            id: Date.now(),
            title: titleInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        taskForm.reset();
    }

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due Date: ${task.dueDate}</p>
                <button class="edit-btn" data-id="${task.id}">Edit</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });

        activateEditButtons();
        activateDeleteButtons();
    }

    // Function to activate edit buttons
    function activateEditButtons() {
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskId = button.getAttribute('data-id');
                const taskIndex = tasks.findIndex(task => task.id == taskId);
                const task = tasks[taskIndex];
                const titleInput = document.getElementById('title');
                const descriptionInput = document.getElementById('description');
                const dueDateInput = document.getElementById('due-date');

                titleInput.value = task.title;
                descriptionInput.value = task.description;
                dueDateInput.value = task.dueDate;

                tasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            });
        });
    }

    // Function to activate delete buttons
    function activateDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskId = button.getAttribute('data-id');
                tasks = tasks.filter(task => task.id != taskId);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            });
        });
    }
});
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '3306',
    user: 'root',
    password: 'Onyekachi19602000',
    database: 'taskmanager'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});
connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL connection: ' + err.stack);
        return;
    }
    console.log('MySQL connection closed.');
});
