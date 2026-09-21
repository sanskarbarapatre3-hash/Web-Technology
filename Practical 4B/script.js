const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  // 1. Create elements using DOM methods
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  // 2. Assign attributes and text
  span.className = "task-text";
  span.textContent = taskText;

  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  // 3. Mark as complete (toggle class on click)
  span.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  // 4. Delete task element
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  // 5. Append elements to DOM
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear input field
  taskInput.value = "";
}

// Event Listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});