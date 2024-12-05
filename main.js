document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const startButton = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const appContainer = document.getElementById('app');
    let taskCounter = 1; // Переменная для отслеживания номера задачи

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.dataset.index = taskCounter; // Хранение номера задачи
            taskItem.innerHTML = `
                <span class="task-text">${taskCounter}. ${taskText}</span>
                <button class="mark-btn"><img src="img/tick.svg" alt="Mark as done"></button>
                <button class="remove-btn"><img src="img/cross.svg" alt="Remove task"></button>`;
            taskList.appendChild(taskItem);
            taskInput.value = '';
            taskInput.focus(); // Вернуть фокус на поле ввода
            taskCounter++; // Увеличить счетчик для следующей задачи
        }
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
            event.preventDefault(); // Предотвратить стандартное действие (например, отправка формы)
        }
    });

    taskList.addEventListener('click', (event) => {
        const taskItem = event.target.closest('li');
        if (!taskItem) return;

        if (event.target.closest('.remove-btn')) {
            taskItem.remove();
            // Переопределение номеров задач
            const tasks = taskList.querySelectorAll('li');
            taskCounter = 1; // Сбросить счетчик
            tasks.forEach(task => {
                const taskText = task.querySelector('.task-text');
                taskText.innerHTML = `${taskCounter}. ${taskText.textContent.split('. ')[1]}`;
                task.dataset.index = taskCounter; // Обновить индекс
                taskCounter++;
            });
        } else if (event.target.closest('.mark-btn')) {
            const taskText = taskItem.querySelector('.task-text');
            taskText.classList.toggle('completed');
        } else if (event.target.closest('.task-text')) {
            const taskText = event.target.closest('.task-text');
            const currentText = taskText.textContent.split('. ')[1];
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'edit-task-input';

            // Заменяем текст задачи на поле ввода
            taskText.innerHTML = '';
            taskText.appendChild(input);
            input.focus();

            input.addEventListener('blur', () => {
                // Обновляем текст задачи после завершения редактирования
                const newText = input.value.trim();
                if (newText) {
                    taskText.innerHTML = `${taskText.parentElement.dataset.index}. ${newText}`;
                } else {
                    taskText.innerHTML = `${taskText.parentElement.dataset.index}. ${currentText}`;
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    input.blur();
                }
            });
        }
    });

    startButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
    });

    // Удаление анимации после ее завершения
    welcomeScreen.addEventListener('animationend', () => {
        welcomeScreen.classList.remove('animate-background');
    });

});