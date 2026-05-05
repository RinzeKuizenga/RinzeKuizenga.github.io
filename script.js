
const overlay = document.getElementById("overlay");
const overlay2 = document.getElementById("overlay2");
  let popup = document.querySelector(".popup");
  function openPopup(){
    popup.classList.remove("close-popup");
popup.classList.add("open-popup");
  overlay.classList.add("active");
  }

  function closePopup(){
    popup.classList.remove("open-popup");
    popup.classList.add("close-popup");
      overlay.classList.remove("active");
  }

let CVpopup = document.querySelector(".CVpopup");

function openCV(){
    CVpopup.classList.remove("close-popup");
    CVpopup.classList.add("open-popup");
      overlay.classList.add("active");
}

function closeCV(){
  CVpopup.classList.remove("open-popup");
  CVpopup.classList.add("close-popup");
    overlay.classList.remove("active");
}

const Infopopup = document.querySelector(".Infopopup")
function openInfo(){
    if (currentGameData) populateInfo(currentGameData);
    Infopopup.classList.remove("close-popup");
    Infopopup.classList.add("open-popup");
      overlay2.classList.add("active");
}

function closeInfo(){
    Infopopup.classList.remove("open-popup");
    Infopopup.classList.add("close-popup");
      overlay2.classList.remove("active");
}
  window.addEventListener("load", () => {openPopup();});
  //window.addEventListener("load", () => {openCV();});
  window.addEventListener("load", () => {toggleMute();});

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

function playInfo(){
const infoSound = document.getElementById("infoSound");
infoSound.currentTime = 0;
infoSound.play();
}

function playInfoExit(){
const infoexitSound = document.getElementById("infoexitSound");
infoexitSound.currentTime = 0;
infoexitSound.play();
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

let currentGameData = null;
function zoomToGame(cell){
const gameKey = cell.dataset.game;
const data = gameData[gameKey];
currentGameData = data;

if(data){
  document.querySelector(".gamescene").style.backgroundImage = `url('${data.splashImage}')`;
}
  zoomClone.style.transition = "none";
  zoomClone.style.opacity = "1";

  const rect = cell.getBoundingClientRect();

  zoomClone.style.top = rect.top + "px";
  zoomClone.style.left = rect.left + "px";
  zoomClone.style.width = rect.width + "px";
  zoomClone.style.height = rect.height + "px";
  zoomClone.style.backgroundImage = getComputedStyle(cell).backgroundImage;

  zoomClone.offsetHeight; 

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

  zoomClone.style.opacity = "1";
  zoomClone.style.pointerEvents = "none";

  blackFade.style.opacity = "0";

  const rect = activeCell.getBoundingClientRect();

  zoomClone.style.top = rect.top + "px";
  zoomClone.style.left = rect.left + "px";
  zoomClone.style.width = rect.width + "px";
  zoomClone.style.height = rect.height + "px";

  setTimeout(() => {
    zoomClone.style.opacity = "0";
    zoomClone.style.top = "";
    zoomClone.style.left = "";
    zoomClone.style.width = "";
    zoomClone.style.height = "";
    zoomClone.style.backgroundImage = "";

    activeCell.classList.remove("active");
  }, 500);
}

cells.forEach(cell => {
  cell.addEventListener("mouseenter", () => {
    const hoverSound = document.getElementById("hover");
    hoverSound.play();
  });

  cell.addEventListener("click", () => {
    playSelect();
    playZoom();
    document.querySelectorAll(".cell").forEach(c => c.classList.remove("active"));
    cell.classList.add("active");
    zoomToGame(cell);
  });
});

  const gameData = {
    monkeysurvivor:{
    splashImage: "MonkeySurvivorSplashgif.gif",
    title: "Monkey Survivors",
    tags: ["2024", "Unity", "2D", "Group", "Roguelike", "Bullet Hell", "Pixel-art", "Silly", "Addicting"],
    description: "Monkey Survivors is one of the first Unity group projects i worked on, we were tasked to make a mobile game that emulates the addictive game-loop of mobile games you would find on the app store. After lots of research, testing and polishing, we were able to create a full auto-roguelike bullet hell game where you upgrade and craft items to defeat increasing waves of enemies! We were able to add alot into the game with our group-planning, we mainly made a great deal to add lots of responsive effects and sounds, which was the main reason this is one of the highest reviewed projects within our school!",
    screenshots: ["MonkeySurvivorsScreenshot.png", "Monkey_Survivors_Trailer.mp4", "MS_screen3.png"],
    },
    marijn:{
    splashImage: "MarijnBackground.png",
    title: "Five Nights at Marijn's",
    tags: ["2025", "Unity", "Solo", "3D", "Horror", "Ambience", "Comedy", "Fast-paced"],
    description: "You might be wondering what you are even seeing right now, I know this looks stupid (it is) but this is actually my very first solo project I did in my own time on and off for about a year, long ago when I was young I made a small demo about my friend as the enemy in a FNAF game (I am a HUGE FNAF fan), I never finished it but promised my friend (Marijn) I would finish it when I knew how to code, after some experience in coding i went to work and fully created the game on my own, I know it looks ridiculous but it has alot going on behind the stupidness, 7 fully playable nights with different game-elements in each, a shop and upgrade system, voice acting, cutscenes, minigames, 3 different endings and ALOT more! I did everything myself including the assets (Gave me 3d-modeling experience) sound-effects and writing. This is mainly what i worked on when i had time to learn more about Unity, truly a passion project I did for fun and the sheer stupidness of it all, please check out the GameJolt page!",
    screenshots: ["MarijnBackground.png", "MS_screen2.png", "MS_screen3.png"],
    },
    kamo:{
    splashImage: "MarijnBackground.png",
    title: "Kamo",
    tags: ["2024", "Unity", "2D", "Shooter", "Pixel-Art", "URP", "Fast-paced"],
    description: "Kamo is a 2D Roguelike shooter we made for a freedom of choice project, I quickly came up with ideas to make the game engaging with gun movement, through testing we were able to make the user-experience as high as we could make it gameplay-wise. We also heavily focused on visual fidelity, as you can see we spent alot of time on pixel art and we made use of Unity's URP lighting as well as pixel-perfect camera techniques, this project was really a difficult experience as we haven't had much experience with Unity at the time, the scope is quite large with lots of upgrades and boss battles, but we were able to create what we wanted to with our planning techniques!",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
        cadenza:{
    splashImage: "CadenzaSplashgif.gif",
    title: "Cadenza",
    tags: ["2025", "Unity", "2D", "Rythm", "Hand-drawn Art", "Story"],
    description: "Cadenza got 15th place out of 1156 entries in Jacksepticeye's GameJam! On the 1st of October 2025 it was announced that popular Youtube creator Jacksepticeye would host one of the biggest GameJams of the year, with 2 years of Unity experience under my belt I took up the courage to join and found a group needing Coders for their project, which with some interviewing I got accepted in! We had 3 days to create a full game under the theme (Death is an opportunity) and man, those 3 days might have been the hardest I've had to work, it was my first time in a professional Game Dev team with artists and writer so I worked 18 hours each day to finish the giant scope our game had, eventually when we published it it paid off big time, we were able to score some of the highest rating and became the 15th most popular entry in the GameJam! After the GameJam's succes the group came together and creating our new indie game team: JustATeam!",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
        tilted:{
    splashImage: "TTSplashgif.gif",
    title: "Tilted Towers",
    tags: ["2025", "Unity", "3D", "Puzzle", "Cell-Shaded", "Infinite"],
    description: "Tilted Towers is a game we made for our quick-game project, we had to plan out, conceptualise, document and create our game within 5 days (Tanked! was part of this project too, you can check it out on the games page.), this game was actually created in 3 days, hence the smaller scope. We were tasked to make a game about gravity which we thought was perfect for a physics based tetris game where you have to build your tower as high as you can and battle the wind on your way. This was also the first time I worked Unity shader graph to create the cell-shaded art style!",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
        phoenix:{
    splashImage: "RMDPSplashgif.gif",
    title: "De Ramp met de Phoenix",
    tags: ["2026", "Unity", "3D", "HDRP", "Simulator", "High-Fidelity", "Resource Management"],
    description: "Ramp met de Phoenix is our first client oriented project, we had to create a game based on the client's educational board game with our own spin to entertain the younger audience while still learning about history. We had 9 weeks for this project so our scope was the largest we've had yet, so I locked in and learnt and added alot into the project: high definition lighting and water physics, detailed 3d-models, mini-games, resource management, UI-scripting, crew customization, immersive sound effects and a bunch more! We ended up creating a project which was highly regarded by our client, I ended up learning alot about working with clients and alot more about Unity and working in large-scale projects",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
        tanked:{
    splashImage: "TankedSplashgif.gif",
    title: "Tanked!",
    tags: ["2025", "Unity", "2D", "Multiplayer", "Turn-based", "Multiplayer", "Strategy"],
    description: "Tanked! is a game we made for our quick-game project, we had to plan out, conceptualise, document and create our game within 5 days (Tilted Towers was part of this project too, you can check it out on the games page.), Tanked! is a turn-based multiplayer game with lots of depth in shooting and strategy, it even has its own soundtrack! This was the first game I made in such little time, so planning was very important to us, this is truly around the time I really go into the importance of good planning and conceptualising!",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
            starry:{
    splashImage: "StarrySplashgif.gif",
    title: "Starry",
    tags: ["2024", "Monogame", "2D", "Shooter", "Pixel-Art", ],
    description: "Starry is a very basic shooter game i made within Monogame, which was my first time using it. Monogame is a way more bare-bones, difficult to use game-dev tool, in fact its not even a software, it's a framework so everything is done within your IDE. This project may be small but it caused me to think outside of the box and rely less on tools and more on myself. This really helped me shape my ways of thought while coding and skyrocketed my C# skills for the better! I also based my pixel-art to make it seem like the game is being played on a GameBoy for some visual identity!",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
            rustbucket:{
    splashImage: "RustBucketSplashgif.gif",
    title: "RustBucket",
    tags: ["2026", "Unity", "3D", "In-Development", "Horror", "Story"],
    description: "Kamo is a grou",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },
            lighting:{
    splashImage: "MarijnBackground.png",
    title: "Kamo",
    tags: ["2026", "Unity", "2D", "Shooter", "Pixel-Art", "URP", "Fast-paced"],
    description: "Kamo is a grou",
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    }
  };

  function populateInfo(data) {
  document.querySelector(".info-title").textContent = data.title;

  const tagsEl = document.querySelector(".info-tags");
  tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join("");

  document.querySelector(".info-description").textContent = data.description;

  const shots = document.querySelectorAll(".info-screenshot");
  data.screenshots.forEach((src, i) => { if(shots[i]) shots[i].src = src; });
}