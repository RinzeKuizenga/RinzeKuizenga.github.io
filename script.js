
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
  Infopopup.querySelectorAll("video").forEach(v => v.play());
}

function closeInfo(){
  Infopopup.classList.remove("open-popup");
  Infopopup.classList.add("close-popup");
  overlay2.classList.remove("active");

  // Pause and reset all videos
  Infopopup.querySelectorAll("video").forEach(v => { v.pause(); v.currentTime = 0; });
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
setInterval(updateClock, 60000);
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
    description: `Monkey Survivors is a fast-paced mobile roguelike bullet hell focused on tight feedback, satisfying progression, and highly responsive combat. 
    During this group project, I took a leading role in gameplay programming, feel, optimisation and art, implementing core systems such as: Player movement and combat responsiveness. 
    
    Enemy wave logic and object-pooling system. 
    Visual and audio feedback systems.
    
    I also fully designed the UI and gameplay mechanics. I worked in Unity (C#) and focused on creating a highly polished game feel, aswell as a bunch off particle effects and sound-effects to make the game as addicting as possible. 
    The result was one of the highest-reviewed projects in our class, largely due to its responsiveness and satisfying gameplay loop. 
    This project significantly improved my ability to design systems that feel good, not just function correctly.`,
    screenshots: ["Monkey Survivors Trailer.mp4"],
    },

    marijn:{
    splashImage: "MarijnBackground.png",
    title: "Five Nights at Marijn's",
    tags: ["2025", "Unity", "Solo", "3D", "Horror", "Ambience", "Comedy", "Fast-paced"],
    description: `You might be wondering what you are even seeing right now, I know this looks stupid (it is) but this is actually my very first solo project I did in my own time on and off for about a year, what started off as a joke about adding my friend into a Five Nights at Freddy's game quickly spiraled into one of my most ambitious solo projects:  7 fully playable nights with different game-elements in each, a shop and upgrade system, voice acting, cutscenes, minigames, 3 different endings and ALOT more! I did everything myself including the assets, sound-effects and writing (Which gave me experience in all elements in Game-Development). This is mainly what i worked on when i had time to learn more about Unity, truly a passion project I did for fun and the sheer stupidness of it all, please check out the GameJolt page!`,
    screenshots: ["Five Nights at Marijn Official Trailer.mp4", "MarijnScreenshot1.png", "MarijnScreenshot2.png"],
    },

    kamo:{
    splashImage: "KamoSplashgif.gif",
    title: "Kamo",
    tags: ["2024", "Unity", "2D", "Shooter", "Pixel-Art", "URP", "Fast-paced"],
    description: `Kamo is a 2D Roguelike shooter we made for a freedom of choice project, I quickly came up with ideas to make the game engaging with gun movement, through testing I was able to make the user-experience as high as we could make it gameplay-wise. My main focus during this project was adding visual identity and high graphical fidelity to improve the user-experience. I spent alot of time on pixel art and we made use of Unity's URP lighting as well as pixel-perfect camera techniques, this project was really a difficult experience as we haven't had much experience with Unity at the time, the scope is quite large with lots of upgrades and boss battles, but we were able to create what we wanted to with our planning techniques!`,
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },

        cadenza:{
    splashImage: "CadenzaSplashgif.gif",
    title: "Cadenza",
    tags: ["2025", "Unity", "2D", "Rythm", "Hand-drawn Art", "Story"],
    description: `Cadenza got 15th place out of 1156 entries in Jacksepticeye's GameJam. On the 1st of October 2025 it was announced that popular Youtube creator Jacksepticeye would host one of the biggest Game Jams of the year, I took up the courage to join and found a group needing Coders for their project, which with some interviewing I got accepted in as one of the primary programmers. It was my first time in a professional Game Dev team, working 18 hour days to fit the 3 day deadline. My role focused heavily on core gameplay programming aswell as UI, game-loop and debugging. I designed and created the rhythm gameplay, aswell as using S.O.L.I.D programming principles to keep up with the growing scope of the project. We eventually published and it paid off big time, we were able to score some of the highest rating and became the 15th most popular entry in the GameJam! After the GameJam's succes the group came together and creating our new indie game team: JustATeam!`,
    screenshots: ["Cadenzaimg1.png", "Cadenzaimg2.png"],
    },

        tilted:{
    splashImage: "TTSplashgif.gif",
    title: "Tilted Towers",
    tags: ["2025", "Unity", "3D", "Puzzle", "Cell-Shaded", "Infinite"],
    description: `Tilted Towers is a game we made for our rapid game-dev project, we had to plan out, conceptualise, document and create our game within 5 days, hence the smaller scope. I was tasked to create a game about using gravity for it's gameplay. The goal was to take a familiar concept and make it feel fresh through gravity based gameplay mechanics. My primary focus was learning and implementing Unity3D's Rigidbody and adding forces. Even though the development was short, this project taught me alot about rapid prototyping, scoping, and Unity's physics system.`,
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },

        phoenix:{
    splashImage: "RMDPSplashgif.gif",
    title: "De Ramp met de Phoenix",
    tags: ["2026", "Unity", "3D", "HDRP", "Simulator", "High-Fidelity", "Resource Management"],
    description: `De Ramp met de Phoenix is a large scale 3D roguelike/resource management game built in Unity, developed for a real client as our first fully client-oriented project. The goal was to turn their educational board game into an engaging game for a younger audience. With a 9 week dev cycle, this became one of the most ambitious projects I had worked on to date, both technically and in scope. It challenged me alot because it's hard to design an educational game based on the client's expectations and new features I added within Unity, I really focused myself and finding a balance between it being educational, but also engaging so it doesnt feel educational. In this project i worked alot in Unity HDRP (High Definition Render Pipeline) which helped me create realistis water and lighting physics. I also worked on reusable code compiling, I made my code as reusable as possible and made it easy to use for my other teammates, like creating UI-objects that developers can drag and drop into their scene so they don't have to develop anything themselves. Designing the UI in this project was very difficult, the game was very realistic and I wanted to find a good balance between easy to understand UI, while also making it feel complexer than it is. The final result is a polished and well-received product that was used within our client's schools. This projects taught me how to work professionally within real product constraints and larger scale projects. `,
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },

        tanked:{
    splashImage: "TankedSplashgif.gif",
    title: "Tanked!",
    tags: ["2025", "Unity", "2D", "Multiplayer", "Turn-based", "Multiplayer", "Strategy"],
    description: `Tanked! is a turn-based multiplayer strategy game built in Unity during a 5-day rapid development project, where planning and efficient teamwork were essential. My main focus was gameplay programming and project planning, using planning techniques like user stories and master planning, I also designed the gameplay. The shorter development timeframe meant I had to design the game based on reusing already made elements. Despite the short timeframe, we created a polished and replayable experience, teaching me valuable lessons in rapid prototyping, planning, and working efficiently under pressure.`,
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },

            starry:{
    splashImage: "StarrySplashgif.gif",
    title: "Starry",
    tags: ["2024", "Monogame", "2D", "Shooter", "Pixel-Art", ],
    description: `Starry is a very basic shooter game i made within Monogame, which was my first time using it. Monogame is a way more bare-bones, difficult to use game-dev tool, in fact its not even a software, it's a framework so everything is done within your IDE. This project may be small but it caused me to think outside of the box and rely less on tools and more on myself. This really helped me shape my ways of thought while coding and skyrocketed my C# skills for the better. I also based my pixel-art to make it seem like the game is being played on a GameBoy for some visual identity.`,
    screenshots: ["StarryGamePlay.png", "MS_screen2.png", "MS_screen3.png"],
    },

            rustbucket:{
    splashImage: "RustBucketSplashgif.gif",
    title: "RustBucket",
    tags: ["2026", "Unity", "3D", "In-Development", "Horror", "Story"],
    description: `Rustbucket is a survival horror game project currently in development by my indie game team. While not much info has been released, I am currently working on shader creation. We are pushing for a fall 2026 release date, this game will be avaliable for purchase on Steam.`,
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    },

            lighting:{
    splashImage: "UnitySplashgif.gif",
    title: "Lighting study",
    tags: ["2026", "Unity", "2D", "Shooter", "Pixel-Art", "URP", "Fast-paced"],
    description: `Lighting Study is a technical research project focused on improving my environmental lighting and visual presentation skills in Unity. As my games became more ambitious, I realized that strong lighting is one of the biggest factors in making a game feel professional, immersive, and visually polished, I also really enjoy working with it so I decided to specialize in it. During this project I explored Unity lighting using HDRP, baked lighting, volumetric fog, post-processing, and particle-based atmospheric effects, while also comparing Unity’s pipeline to Blender’s lighting tools. I applied these techniques directly to one of my older projects and significantly improved both its visual quality and performance which i applied into my other projects (like Het Ramp met de Phoenix). This project taught me how much visual presentation can improve gameplay and hold retention on your game.`,
    screenshots: ["MS_screen1.png", "MS_screen2.png", "MS_screen3.png"],
    }
  };

  function populateInfo(data) {
  document.querySelector(".info-title").textContent = data.title;

  const tagsEl = document.querySelector(".info-tags");
  tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join("");

  document.querySelector(".info-description").textContent = data.description;

  const container = document.querySelector(".info-right");
  // Clear old screenshots/videos
  container.querySelectorAll(".info-screenshot, .info-video").forEach(el => el.remove());

  data.screenshots.forEach(src => {
    if (src.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.src = src;
      video.className = "info-video";
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      container.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.className = "info-screenshot";
      container.appendChild(img);
    }
  });
}