let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("new-task");
  if (input.value.trim()) {
    tasks.push({ text: input.value.trim(), completed: false });
    input.value = "";
    saveAndRender();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function editTask(index, element) {
  tasks[index].text = element.innerText.trim();
  saveAndRender();
}

function filterTasks(selected) {
  filter = selected;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    if (
      filter === "completed" && !task.completed ||
      filter === "pending" && task.completed
    ) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${i})" />
      <span contenteditable="true" onblur="editTask(${i}, this)">${task.text}</span>
      <button onclick="deleteTask(${i})">&#10060</button>
    `;

    list.appendChild(li);
  });
}

renderTasks();
