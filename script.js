
    // ====== Element References ======
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const noTaskMsg = document.getElementById("noTaskMsg");

    // ====== Load Tasks from Local Storage ======
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();

    // ====== Add Task Event ======
    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });

    // ====== Add Task Function ======
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      const task = { id: Date.now(), text: taskText, completed: false };
      tasks.push(task);
      saveTasks();
      renderTasks();

      taskInput.value = "";
    }

    // ====== Toggle Complete Function ======
    function toggleComplete(id) {
      tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveTasks();
      renderTasks();
    }

    // ====== Delete Task Function ======
    function deleteTask(id) {
      tasks = tasks.filter((task) => task.id !== id);
      saveTasks();
      renderTasks();
    }

    // ====== Save to Local Storage ======
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // ====== Render Tasks ======
    function renderTasks() {
      taskList.innerHTML = "";

      if (tasks.length === 0) {
        noTaskMsg.style.display = "block";
        return;
      } else {
        noTaskMsg.style.display = "none";
      }

      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.textContent = task.text;

        const actionDiv = document.createElement("div");
        actionDiv.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Done";
        completeBtn.className = "btn-complete";
        completeBtn.onclick = () => toggleComplete(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn-delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        actionDiv.append(completeBtn, deleteBtn);
        li.appendChild(actionDiv);
        taskList.appendChild(li);
      });
    }