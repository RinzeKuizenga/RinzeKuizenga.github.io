
  let popup = document.querySelector(".popup");

  function openPopup(){
    popup.classList.remove("close-popup");
popup.classList.add("open-popup");
  }

  function closePopup(){
    popup.classList.remove("open-popup");
    popup.classList.add("close-popup");
  }

let CVpopup = document.querySelector(".CVpopup");

function openCV(){
    CVpopup.classList.remove("close-popup");
    CVpopup.classList.add("open-popup");
}

function closeCV(){
    CVpopup.classList.remove("open-popup");
    CVpopup.classList.add("close-popup");
}

  window.addEventListener("load", () => {openPopup();});
  //window.addEventListener("load", () => {openCV();});

function updateClock(){
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  if(minutes < 10){
    minutes = "0" + minutes;
  }
  else if(hours < 10){
    hours = "0" + hours;
  }

  document.getElementById('clock').innerHTML = 
    `${hours} <span class="blink">:</span> ${minutes} ${ampm}`;
}

function updateDate(){
  const now = new Date();

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = dayNames[now.getDay()];

  let day = now.getDate();          // ✅ correct
  let month = now.getMonth() + 1;

  if (day < 10){
    day = "0" + day;
  }
  if(month < 10){
    month = "0" + month;
  }
  document.getElementById('date').innerHTML = `${dayName} ${day}/${month}`;
}
updateClock();
setInterval(updateClock, 1000);
updateDate();

function playSelect(){
const selectSound = document.getElementById("selectSound");
selectSound.currentTime = 0;
selectSound.play();
}
function playZoomOut(){
const selectSound = document.getElementById("zoomOutSound");
selectSound.currentTime = 0;
selectSound.play();
}
function playZoom(){
const zoomSound = document.getElementById("zoomSound");
zoomSound.currentTime = 0;
zoomSound.play();
}

let hasStarted = false;

function toggleMute(){
  const music = document.getElementById("bgmusic");
  const button = document.getElementById("mutebutton");

  if(!hasStarted){
    music.muted = false;
    music.play();
    hasStarted = true;

    button.src = "UnmuteIcon.png";
    return;
  }

  music.muted = !music.muted;

  if(music.muted){
    button.src = "MuteIcon.png";
  } else {
    button.src = "UnmuteIcon.png";
  }
}

const cells = document.querySelectorAll(".cell");
const zoomClone = document.getElementById("zoomClone");
const blackFade = document.getElementById("blackFade");

cells.forEach(cell=>{
  cell.addEventListener("click", () => {
    playSelect();
    playZoom();
    zoomToGame(cell);
  })
})

function zoomToGame(cell){

  // 🔥 reset BEFORE using it again
  zoomClone.style.transition = "none";
  zoomClone.style.opacity = "1";

  const rect = cell.getBoundingClientRect();

  zoomClone.style.top = rect.top + "px";
  zoomClone.style.left = rect.left + "px";
  zoomClone.style.width = rect.width + "px";
  zoomClone.style.height = rect.height + "px";
  zoomClone.style.backgroundImage = getComputedStyle(cell).backgroundImage;

  zoomClone.offsetHeight; // force reflow

  // restore transition
  zoomClone.style.transition = "all 0.5s ease";

  setTimeout(() => {
    zoomClone.style.top = "0";
    zoomClone.style.left = "0";
    zoomClone.style.width = "100vw";
    zoomClone.style.height = "100vh";

    blackFade.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    const game = document.querySelector(".gamescene");
    game.classList.add("open-popup");

    setTimeout(() => {
      zoomClone.style.opacity = "0";
    }, 100);

  }, 350);
}

function zoomOutGame(){
  const game = document.querySelector(".gamescene");
  const activeCell = document.querySelector(".cell.active");

  game.classList.remove("open-popup");

  // Show clone again for animation
  zoomClone.style.opacity = "1";
  zoomClone.style.pointerEvents = "none";

  blackFade.style.opacity = "0";

  const rect = activeCell.getBoundingClientRect();

  // Animate back to cell
  zoomClone.style.top = rect.top + "px";
  zoomClone.style.left = rect.left + "px";
  zoomClone.style.width = rect.width + "px";
  zoomClone.style.height = rect.height + "px";

  setTimeout(() => {
    // 🔥 FULL RESET
    zoomClone.style.opacity = "0";
    zoomClone.style.top = "";
    zoomClone.style.left = "";
    zoomClone.style.width = "";
    zoomClone.style.height = "";
    zoomClone.style.backgroundImage = "";

    activeCell.classList.remove("active");
  }, 500);
}

cells.forEach(cell=>{
  cell.addEventListener("click", () => {
    playSelect();
    playZoom();

    // mark active cell
    document.querySelectorAll(".cell").forEach(c => c.classList.remove("active"));
    cell.classList.add("active");

    zoomToGame(cell);
  })
})