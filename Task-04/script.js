const taskInput = document.getElementById('taskInput');
const dateTimeInput = document.getElementById('dateTimeInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
  const text = taskInput.value.trim();
  const dateTime = dateTimeInput.value;

  if (text === '') {
    alert('Please enter a task description!');
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  const formattedDate = dateTime ? new Date(dateTime).toLocaleString() : 'No date set';

  li.innerHTML = `
    <div class="task-info">
      <span class="task-text">${text}</span>
      <span class="task-date">📅 ${formattedDate}</span>
    </div>
    <div class="task-actions">
      <button class="complete-btn">✔</button>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  // Action Event Listeners
  const completeBtn = li.querySelector('.complete-btn');
  const editBtn = li.querySelector('.edit-btn');
  const deleteBtn = li.querySelector('.delete-btn');
  const taskText = li.querySelector('.task-text');

  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit your task:', taskText.textContent);
    if (newText !== null && newText.trim() !== '') {
      taskText.textContent = newText.trim();
    }
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  taskList.appendChild(li);

  // Clear inputs
  taskInput.value = '';
  dateTimeInput.value = '';
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
