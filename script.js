//navDate
const navDate = document.getElementById("nav-date");
function upDate() {
  navDate.textContent = new Date().toLocaleString();
}
setInterval(upDate, 1000);

// Khai báo biến DOM
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// TODO 1: Viết hàm getTasks()
// Gợi ý: Lấy dữ liệu, parse JSON, gán vào mảng tasks, rồi render
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// TODO 2: Viết hàm saveTasks() - lưu tasks vào LocalStorage
// Gợi ý: localStorage.setItem('tasks', JSON.stringify(tasks))
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// TODO 3: Viết hàm renderTasks() - hiển thị danh sách task ra HTML
// Gợi ý: Xóa toàn bộ nội dung taskList.innerHTML, sau đó dùng forEach để tạo li + nút Edit, Delete
function renderTasks() {
  taskList.innerHTML = "";
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.dataset.index = index;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn"); // Thêm class để dễ nhận diện

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn"); // Thêm class để dễ nhận diện

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// TODO 4: Viết hàm addTask() - thêm task mới vào mảng và gọi renderTasks()
// Gợi ý: Lấy value từ taskInput, tạo object { id: Date.now(), title: ..., completed: false }
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Vui lòng nhập công việc!");
    return;
  }
  const tasks = getTasks();
  tasks.push(taskText);
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
}

// TODO 5: Viết hàm deleteTask(id) - xóa task khỏi mảng
// Gợi ý: Dùng filter để loại bỏ task có id
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// TODO 6: Viết hàm editTask(id) - cho phép sửa title của task
function editTask(index, newText) {
  const tasks = getTasks();
  tasks[index] = newText;
  saveTasks(tasks);
  renderTasks();
}

// TODO 7: Gắn sự kiện click cho addBtn để gọi addTask()
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// TODO 9: Gắn sự kiện click cho taskList (event delegation)
// Gợi ý: Kiểm tra e.target.classList.contains('edit-btn') hoặc 'delete-btn' hoặc 'task-title'
taskList.addEventListener("click", (e) => {
  const clickedElement = e.target;
  const li = clickedElement.closest("li");
  if (!li) return;

  const index = li.dataset.index;
  if (clickedElement.classList.contains("delete-btn")) {
    deleteTask(index);
  } else if (clickedElement.classList.contains("edit-btn")) {
    const currentText = li.textContent.replace("EditDelete", "").trim();
    const newText = prompt("Nhập nội dung mới:", currentText);
    if (newText && newText.trim() !== "") {
      editTask(index, newText.trim());
    }
  }
});

renderTasks();
