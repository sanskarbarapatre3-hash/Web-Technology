let tasks = [];
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const fetchBtn = document.getElementById("fetchBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

function render() {
  taskList.innerHTML = tasks
    .map(function (task) {
      return `
        <li>
          <div class="task-content">
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
            <span class="${task.completed ? "completed" : ""}">${task.title}</span>
          </div>
          <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
        </li>
      `;
    })
    .join("");

  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.reduce(function (acc, task) {
    return task.completed ? acc + 1 : acc;
  }, 0);
  pendingCount.textContent = tasks.filter(function (task) {
    return !task.completed;
  }).length;
}

addBtn.addEventListener("click", function () {
  const title = taskInput.value.trim();
  if (!title) return;
  tasks.push({ id: Date.now(), title: title, completed: false });
  taskInput.value = "";
  render();
});

fetchBtn.addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const formatted = data.map(function (item) {
        return { id: item.id, title: item.title, completed: item.completed };
      });
      tasks = tasks.concat(formatted);
      render();
    })
    .catch(function (err) {
      console.error(err);
    });
});

window.toggleTask = function (id) {
  tasks = tasks.map(function (task) {
    return task.id === id ? { ...task, completed: !task.completed } : task;
  });
  render();
};

window.deleteTask = function (id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  render();
};

render();