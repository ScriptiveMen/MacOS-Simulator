function startSystem() {
  let bootSound = document.querySelector("#boot-sound");
  let power_on = document.querySelector(".logo");
  let turn_on_screen = document.querySelector(".turn-on");

  function bootAnimation() {
    let progress = document.querySelector(".progress");
    let bootScreen = document.querySelector(".boot-screen");

    let percentage = 0;

    let interval = setInterval(() => {
      percentage += 1;
      progress.style.width = `${percentage}%`;

      if (percentage >= 100) {
        clearInterval(interval);
        bootScreen.style.opacity = 0;

        setTimeout(() => {
          bootScreen.style.display = "none";
        }, 500);
      }
    }, 40);
  }

  window.addEventListener("load", function () {
    power_on.addEventListener("click", function () {
      bootSound.play();
      turn_on_screen.style.display = "none";
      bootAnimation();
    });
  });
}

function controlPanelHiding() {
  let controlPanel = document.querySelector(".control-center");
  let controlBtn = document.querySelector(".controls");
  let flag = true;
  let sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    slider.addEventListener("input", function () {
      let value = (this.value / this.max) * 100;
      slider.style.background = `linear-gradient(to right, white ${value}%, gray ${value}%)`;
    });
  });

  controlBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (flag) {
      controlPanel.style.opacity = 1;
      flag = false;
    } else {
      controlPanel.style.opacity = 0;
      flag = true;
    }
  });
}

function dateTime() {
  let date = document.querySelector(".date h5");
  const Weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function updateTime() {
    let dt = new Date();

    const DATE = `${Weeks[dt.getDay()]} ${dt.getDate()} ${
      Months[dt.getMonth()]
    }`;

    const time =
      dt.getHours() > 12
        ? `${dt.getHours() - 12}:${dt.getMinutes()} PM`
        : `${dt.getHours()}:${dt.getMinutes()} AM`;

    date.innerHTML = `${DATE} ${time}`;
  }
  updateTime();

  setInterval(() => updateTime(), 60000);
}

function draggableFeature() {
  const windows = document.querySelectorAll(".window");
  let zindex = 1;

  windows.forEach((win) => {
    const titleBar = win.querySelector(".title-bar");
    const boundary = document.querySelector(".windows");

    let isDragging = false;
    let offsetX, offsetY;

    win.addEventListener("mousedown", function () {
      zindex++;
      win.style.zIndex = zindex;
    });

    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.classList.add("no-transition");
      zindex++;
      win.style.zIndex = zindex;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const parentRect = boundary.getBoundingClientRect();

      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      newY = Math.max(0, newY);

      win.style.left = newX + "px";
      win.style.top = newY + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      win.classList.remove("no-transition");
    });
  });
}

function closingFeature() {
  let icons = document.querySelectorAll(".taskbar .icon");
  let windows = document.querySelectorAll(".window");
  const boundary = document.querySelector(".windows");
  let dot = document.querySelectorAll(".dot");

  let close = document.querySelectorAll(".window .buttons .close");

  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      dot[icon.id].style.display = "block";
      const win = windows[icon.id];
      const boundaryRect = boundary.getBoundingClientRect();

      const maxX = boundaryRect.width - win.offsetWidth;
      const maxY = boundaryRect.height - win.offsetHeight;

      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);

      win.style.left = `${randomX}px`;
      win.style.top = `${randomY}px`;

      win.style.visibility = "visible";
      win.style.opacity = 1;
      win.style.pointerEvents = "auto";
    });
  });

  close.forEach((cl, idx) => {
    cl.addEventListener("click", function () {
      windows[idx].style.opacity = 0;
      windows[idx].style.visibility = "hidden";
      windows[idx].style.pointerEvents = "none";
    });
  });
}

function minimizeFeature() {
  let windows = document.querySelectorAll(".window");
  let icons = document.querySelectorAll(".taskbar .icon");

  let minimizeBtns = document.querySelectorAll(".window .buttons .minimize");

  minimizeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      let win = windows[idx];
      let icon = icons[idx];

      let winRect = win.getBoundingClientRect();
      let iconRect = icon.getBoundingClientRect();

      let deltaX = iconRect.left - winRect.left;
      let deltaY = iconRect.top - winRect.top;

      win.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
      win.style.opacity = "0";
      win.style.transition = "transform 0.4s ease, opacity 0.3s ease";

      setTimeout(() => {
        win.style.visibility = "hidden";
        win.style.pointerEvents = "none";
        win.style.transform = "none";
      }, 400);
    });
  });
}

function maximizeFeature() {
  let windows = document.querySelectorAll(".window");
  let maximizeBtn = document.querySelectorAll(".window .buttons .maximize");
  let taskbar = document.querySelector(".taskbar");

  maximizeBtn.forEach((max, idx) => {
    let maximized = false;
    let prevState = {};

    max.addEventListener("click", function () {
      if (!maximized) {
        prevState.width = getComputedStyle(windows[idx]).width;
        prevState.height = getComputedStyle(windows[idx]).height;
        prevState.top = getComputedStyle(windows[idx]).top;
        prevState.left = getComputedStyle(windows[idx]).left;
        prevState.position = getComputedStyle(windows[idx]).position;

        windows[idx].style.height = "100vh";
        windows[idx].style.width = "100vw";
        windows[idx].style.top = "0";
        windows[idx].style.left = "0";
        windows[idx].style.position = "fixed";
        taskbar.style.visibility = "hidden";
        maximized = true;
      } else {
        windows[idx].style.height = prevState.height;
        windows[idx].style.width = prevState.width;
        windows[idx].style.top = prevState.top;
        windows[idx].style.left = prevState.left;
        windows[idx].style.position = prevState.position;
        taskbar.style.visibility = "visible";
        maximized = false;
      }
    });
  });
}

function doubleClickFeature() {
  let windows = document.querySelectorAll(".window");
  let titleBar = document.querySelectorAll(".title-bar");

  titleBar.forEach((bar, idx) => {
    let prevState = {};
    let maximize = false;
    bar.addEventListener("dblclick", function () {
      let win = windows[idx];
      if (!maximize) {
        prevState.width = getComputedStyle(win).width;
        prevState.height = getComputedStyle(win).height;
        prevState.top = getComputedStyle(win).top;
        prevState.left = getComputedStyle(win).left;

        win.style.width = "100vw";
        win.style.height = "100vh";
        win.style.top = "0";
        win.style.left = "0";
        maximize = true;
      } else {
        win.style.width = prevState.width;
        win.style.height = prevState.height;
        win.style.top = prevState.top;
        win.style.left = prevState.left;
        maximize = false;
      }
    });
  });
}

function contextmenuFeature() {
  let desktop = document.querySelector(".desktop");
  let menu = document.querySelector(".context-menu");

  desktop.addEventListener("contextmenu", function (e) {
    e.preventDefault();

    menu.style.top = `${e.clientY - 50}px`;
    menu.style.left = `${e.clientX - 10}px`;
    menu.style.display = "block";
  });

  desktop.addEventListener("click", function (e) {
    e.preventDefault();
    menu.style.display = "none";
  });
}
function spotlightFeature() {
  let searchBtn = document.querySelector(".search");
  let search = document.querySelector(".search-box");
  let isOpen = false;
  searchBtn.addEventListener("click", function () {
    if (!isOpen) {
      search.style.display = "flex";
      isOpen = true;
    } else {
      search.style.display = "none";
      isOpen = false;
    }
  });
}
function shutdownFeature() {
  let logo = document.querySelector(".menu-0");
  let shutdown = document.querySelector(".shutdown");
  let isShut = false;
  logo.addEventListener("click", function () {
    if (!isShut) {
      shutdown.style.display = "block";
      isShut = true;
    } else {
      shutdown.style.display = "none";
      isShut = false;
    }
  });
}

function shutdownConfirmBox() {
  let counter = document.querySelector(".counter");
  let shutdownBtn = document.querySelector(".shutdown");
  let confirmBox = document.querySelector(".shutting-down");
  let shutNow = document.querySelector(".shutnow");
  let cancel = document.querySelector(".cancel");
  let count = 52;
  let isConfirm = false;
  let interval = null;

  shutdownBtn.addEventListener("click", function (e) {
    confirmBox.classList.toggle("show");
    interval = setInterval(() => {
      if (count <= 0) {
        clearInterval(interval);
        window.location.reload();
      }
      counter.innerHTML = `${count--}`;
    }, 1000);
  });
  shutNow.addEventListener("click", function () {
    window.location.reload();
  });
  cancel.addEventListener("click", function () {
    clearInterval(interval);
    confirmBox.classList.remove("show");
    isConfirm = false;
  });
}

startSystem();
controlPanelHiding();
dateTime();
draggableFeature();
closingFeature();
minimizeFeature();
maximizeFeature();
doubleClickFeature();
contextmenuFeature();
spotlightFeature();
shutdownFeature();
shutdownConfirmBox();
