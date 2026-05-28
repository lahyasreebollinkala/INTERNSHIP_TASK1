// LOADER

window.addEventListener("load", function(){

    document.getElementById("loader")
    .style.display = "none";
});

// TYPING EFFECT

const text =
"Manage Your Daily Tasks Easily";

let index = 0;

function typeEffect(){

    if(index < text.length){

        document.querySelector(".typing-text")
        .innerHTML += text.charAt(index);

        index++;

        setTimeout(typeEffect, 80);
    }
}

typeEffect();

// QUOTES

const quotes = [

    "Stay productive!",
    "Success starts with discipline.",
    "Small progress is progress.",
    "Keep pushing forward."
];

setInterval(function(){

    let random =
    Math.floor(Math.random() * quotes.length);

    document.getElementById("quote")
    .innerText = quotes[random];

}, 3000);

// FORM VALIDATION

document
.getElementById("contactForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let message =
    document.getElementById("message").value;

    let formMessage =
    document.getElementById("formMessage");

    if(name === "" || email === "" || message === ""){

        formMessage.style.color = "red";

        formMessage.innerText =
        "All fields required";

        return;
    }

    let emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){

        formMessage.style.color = "red";

        formMessage.innerText =
        "Invalid Email";

        return;
    }

    formMessage.style.color = "lime";

    formMessage.innerText =
    "Form submitted successfully!";
});

// TASKS

let taskList =
document.getElementById("taskList");

function addTask(){

    let taskText =
    document.getElementById("taskInput")
    .value.trim();

    let priority =
    document.getElementById("priority")
    .value;

    let dueDate =
    document.getElementById("dueDate")
    .value;

    if(taskText === ""){

        showToast("Enter a task");

        return;
    }

    createTask(
        taskText,
        false,
        priority,
        dueDate
    );

    saveTasks();

    updateCounter();

    updateProgress();

    showToast("Task Added");

    document.getElementById("taskInput")
    .value = "";
}

function createTask(
    taskText,
    completed,
    priority,
    dueDate
){

    let li =
    document.createElement("li");

    let leftDiv =
    document.createElement("div");

    let checkbox =
    document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = completed;

    let span =
    document.createElement("span");

    span.innerHTML =
    `
    ${taskText}
    <br>
    <small>
        Priority: ${priority}
    </small>
    <br>
    <small>
        Due: ${dueDate}
    </small>
    `;

    if(completed){

        span.classList.add("completed");
    }

    checkbox.addEventListener(
        "change",
        function(){

            span.classList.toggle(
                "completed"
            );

            saveTasks();

            updateProgress();
        }
    );

    leftDiv.appendChild(checkbox);

    leftDiv.appendChild(span);

    let deleteBtn =
    document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function(){

        li.remove();

        saveTasks();

        updateCounter();

        updateProgress();

        showToast("Task Deleted");
    };

    li.appendChild(leftDiv);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// LOCAL STORAGE

function saveTasks(){

    let tasks = [];

    document
    .querySelectorAll("#taskList li")
    .forEach(function(li){

        tasks.push({

            text:
            li.querySelector("span")
            .innerText,

            completed:
            li.querySelector("input")
            .checked
        });
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function loadTasks(){

    let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    tasks.forEach(function(task){

        createTask(
            task.text,
            task.completed,
            "Medium",
            "No Date"
        );
    });
}

window.onload = function(){

    loadTasks();

    updateCounter();

    updateProgress();
};

// COUNTER

function updateCounter(){

    let total =
    document.querySelectorAll("#taskList li")
    .length;

    document.getElementById(
        "taskCounter"
    ).innerText =
    "Total Tasks: " + total;
}

// SEARCH

document
.getElementById("searchTask")
.addEventListener("keyup", function(){

    let value =
    this.value.toLowerCase();

    document
    .querySelectorAll("#taskList li")
    .forEach(function(task){

        task.style.display =
        task.innerText
        .toLowerCase()
        .includes(value)
        ? "flex"
        : "none";
    });
});

// PROGRESS

function updateProgress(){

    let total =
    document.querySelectorAll("#taskList li")
    .length;

    let completed =
    document.querySelectorAll(
        "#taskList input:checked"
    ).length;

    let percent =
    total === 0
    ? 0
    : (completed / total) * 100;

    document.getElementById(
        "progressBar"
    ).style.width =
    percent + "%";
}

// TOAST

function showToast(message){

    let toast =
    document.getElementById("toast");

    toast.innerText = message;

    toast.style.opacity = "1";

    setTimeout(function(){

        toast.style.opacity = "0";

    }, 2000);
}

// DARK MODE

document
.getElementById("darkModeBtn")
.addEventListener("click", function(){

    document.body.classList.toggle(
        "dark-mode"
    );
});

// MUSIC

let music =
document.getElementById("bgMusic");

document
.getElementById("musicBtn")
.addEventListener("click", function(){

    if(music.paused){

        music.play();

    }else{

        music.pause();
    }
});

// SCROLL REVEAL

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }
    });

});

document
.querySelectorAll(".hidden")
.forEach((el)=>observer.observe(el));