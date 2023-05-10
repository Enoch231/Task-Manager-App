let addForm = document.querySelector(".add");
let tasks = document.querySelector(".task");
let clear = document.querySelector(".clear");
let messageSpan = document.querySelector(".message span");
let searchForm = document.querySelector(".search");

const updateMessage = () => {
  const taskCount = tasks.children.length;
  messageSpan.innerText = `You have ${taskCount} pending tasks`;
};
updateMessage();

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = addForm.add.value.trim();
  if (value.length) {
    console.log(value);
    addForm.reset();
    tasks.innerHTML += `<li>
                           <span>${value}</span>
                           <i class="bi bi-trash-fill delete"></i>
                      </li>`;
    updateMessage();
  }
});

tasks.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    updateMessage();
  }
});

clear.addEventListener("click", () => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach((taskItem) => {
    taskItem.remove();
  });
  updateMessage();
});

const filterTask = (term) => {
  Array.from(tasks.children)
    .filter((task) => {
      return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.add("hide");
    });

  Array.from(tasks.children)
    .filter((task) => {
      return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.remove("hide");
    });
};

searchForm.addEventListener("keyup", () => {
  const term = searchForm.search.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("click", (event) => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();
    const term = searchForm.search.value.trim();
    filterTask(term);
  }
});
