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

let teampopup = document.querySelector(".teampopup");

function openA(){
  teampopup.classList.remove("close-popup");
  teampopup.classList.add("open-popup");
  overlay.classList.add("active");
}

function closeA(){
  teampopup.classList.remove("open-popup");
  teampopup.classList.add("close-popup");
  overlay.classList.remove("active");
}

const Infopopup = document.querySelector(".Infopopup")
function openInfo(){
  if (currentGameData) populateInfo(currentGameData);
  Infopopup.classList.remove("close-popup");
  Infopopup.classList.add("open-popup");
  overlay2.classList.add("active");
Infopopup.querySelectorAll("video").forEach(v=>{
  v.load();
  v.play();
});
}

function closeInfo(){
  Infopopup.classList.remove("open-popup");
  Infopopup.classList.add("close-popup");
  overlay2.classList.remove("active");

  Infopopup.querySelectorAll("video").forEach(v => { v.pause(); v.currentTime = 0; });
}
  window.addEventListener("load", () => {openPopup();});
  //window.addEventListener("load", () => {openCV();});
  //window.addEventListener("load", () => {toggleMute();});

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

  let day = now.getDate();         
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

const audioElements = {
  selectSound: document.getElementById("selectSound"),
  zoomSound: document.getElementById("zoomSound"),
  zoomOutSound: document.getElementById("zoomOutSound"),
  infoSound: document.getElementById("infoSound"),
  infoexitSound: document.getElementById("infoexitSound"),
  hoverSound: document.getElementById("hover"),
  TeamOpenSound: document.getElementById("TeamOpenSound")

}

function playSound(soundKey){
  const audio = audioElements[soundKey];
  if(audio){
    audio.play().catch(() => {}); 
  }
}
 
function playSelect() { playSound('selectSound'); }
function playZoomOut() { playSound('zoomOutSound'); }
function playZoom() { playSound('zoomSound'); }
function playInfo() { playSound('infoSound'); }
function playInfoExit() { playSound('infoexitSound'); }
function playTeamOpen() { playSound('TeamOpenSound'); }

let hasStarted = false;

function toggleMute() {
  const music = document.getElementById("bgmusic");
  const button = document.getElementById("mutebutton");

  if (!hasStarted) {
    music.muted = false;
    music.play().catch(() => {});
    hasStarted = true;
    button.src = "UnmuteIcon.png";
    return;
  }

  music.muted = !music.muted;

  if (music.muted) {
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

const downloadButton = document.getElementById("downloadButton");

downloadButton.onclick = () => {
  if (data.downloadLink){
    window.open(data.downloadLink, "");
  }
};

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
    downloadLink: "",
    title: "Monkey Survivors",
    tags: ["2024", "Unity", "2D", "Group", "Roguelike", "Bullet Hell", "Pixel-art", "Silly", "Addicting"],
    description: `
      <p>Monkey Survivors is a fast-paced mobile roguelike bullet hell focused on tight feedback, satisfying progression, and lots of items.</p>
      
      <p>During this group project, I took a leading role in gameplay programming, feel, optimisation and art, implementing systems such as:</p>
      <ul>
        <li>Player movement and game-feel</li>
        <li>Enemy wave logic and object-pooling system</li>
        <li>Visual and audio feedback systems</li>
      </ul>
      
      <p>I also fully designed the UI and gameplay mechanics. I worked in Unity (C#) and focused on creating a highly polished game feel, as well as a bunch of particle effects and sound-effects to make the game as addicting as possible.</p>
      
      <p>The result was one of the highest-reviewed projects in our class, largely due to its scope and polish.</p>
    `,
    screenshots: ["Monkey Survivors Trailer.mp4","MonkeySurvivorsScreenshot.png"],
    },

    marijn:{
    splashImage: "Marijnimg3.jpg",
    downloadLink: "https://gamejolt.com/games/FiveNightsatmarijns/902235",
    title: "Five Nights at Marijn's",
    tags: ["2025", "Unity", "Solo", "3D", "Horror", "Ambience", "Comedy", "Fast-paced"],
    description: `
      <p>You might be wondering what you are even seeing right now, I know this looks stupid (it is) but this is actually my very first solo project I did in my own time on and off for about a year.</p>
      
      <p>What started off as a joke about adding my friend into a Five Nights at Freddy's game quickly spiraled into one of my most ambitious solo projects because it was just too much fun to work on:</p>
      <ul>
        <li>7 fully playable nights with different game-elements in each</li>
        <li>A shop and upgrade system</li>
        <li>Voice acting and cutscenes</li>
        <li>Minigames and 3 different endings</li>
        <li>And much more!</li>
      </ul>
      
      <p>I did everything myself including the assets, sound-effects and writing, which gave me experience in all elements of Game-Development. This is mainly what I worked on when I had time to learn more about Unity, truly a passion project I did for fun and the sheer stupidness of it all. Please check out the GameJolt page!</p>
    `,
    screenshots: ["Five Nights at Marijn Official Trailer.mp4", "MarijnScreenshot1.png", "MarijnScreenshot2.png"],
    },

    kamo:{
    splashImage: "KamoSplashgif.gif",
    downloadLink: "https://play.unity.com/en/games/26f5a560-8886-4f65-88a8-181877ededde/kamo",
    title: "Kamo",
    tags: ["2024", "Unity", "2D", "Shooter", "Pixel-Art", "URP", "Fast-paced"],
    description: `
      <p>Kamo is a 2D Roguelike shooter we made for a freedom of choice project.</p>
      
      <p>I quickly came up with ideas to make the game engaging with gun movement, and through testing I was able to make the user-experience as high as we could make it gameplay-wise.</p>
      
      <p>My main focus during this project was adding visual identity and high graphical fidelity to improve the user-experience. I spent a lot of time on pixel art and we made use of Unity's URP lighting as well as pixel-perfect camera techniques.</p>
      
      <p>This project was really a difficult experience as we hadn't had much experience with Unity at the time, and the scope is quite large with lots of upgrades and boss battles, but we were able to create what we wanted to with our planning techniques!</p>
    `,
    screenshots: ["KamoGameplay.mp4", "Kamoimg1.png"],
    },

    cadenza:{
    splashImage: "CadenzaSplashgif.gif",
    downloadLink: "https://schrecklock.itch.io/cadenza",
    title: "Cadenza 🏆",
    tags: ["2025", "Unity", "2D", "Rythm", "Hand-drawn Art", "Story"],
    description: `
      <p><strong>Cadenza got 15th place out of 1156 entries in Jacksepticeye's GameJam!</strong></p>
      
      <p>On the 1st of October 2025, popular Youtube creator Jacksepticeye announced he would host one of the biggest Game Jams of the year. I took up the courage to join and found a group needing Coders for their project, which with some interviewing I got accepted in as one of the primary programmers.</p>
      
      <p>It was my first time in a professional Game Dev team, working 18 hour days to fit the 3 day deadline. My role focused heavily on:</p>
      <ul>
        <li>Core gameplay programming</li>
        <li>UI design and implementation</li>
        <li>Game-loop and debugging</li>
      </ul>
      
      <p>I designed and created the rhythm gameplay, as well as using S.O.L.I.D programming principles to keep up with the growing scope of the project. We eventually published and it paid off big time, scoring some of the highest ratings and becoming the 15th most popular entry in the GameJam!</p>
      
      <p>After the GameJam's success, the group came together and created our new indie game team: <strong>JustATeam!</strong></p>
    `,
    screenshots: ["Cadenzaimg1.png", "Cadenzaimg2.png"],
    },

    tilted:{
    splashImage: "TTSplashgif.gif",
    downloadLink: "",
    title: "Tilted Towers",
    tags: ["2025", "Unity", "3D", "Puzzle", "Cell-Shaded", "Infinite"],
    description: `
      <p>Tilted Towers is a game we made for our rapid game-dev project. We had to plan out, conceptualise, document and create our game within 5 days, hence the smaller scope.</p>
      
      <p>I was tasked to create a game about using gravity for its gameplay. The goal was to take a familiar concept and make it feel fresh through gravity based gameplay mechanics.</p>
      
      <p>My primary focus was learning and implementing Unity3D's Rigidbody and adding forces. Even though the development was short, this project taught me a lot about rapid prototyping, scoping, and Unity's physics system.</p>
    `,
    screenshots: ["TTVid.mp4", "TTimg1.png"],
    },

    phoenix:{
    splashImage: "RMDPSplashgif.gif",
    downloadLink: "",
    title: "De Ramp met de Phoenix",
    tags: ["2026", "Unity", "3D", "HDRP", "Simulator", "High-Fidelity", "Resource Management"],
    description: `
      <p>De Ramp met de Phoenix is a large scale 3D roguelike/resource management game built in Unity, developed for a real client as our first fully client-oriented project.</p>
      
      <p>The goal was to turn their educational board game into an engaging game for a younger audience. With a 9 week dev cycle, this became one of the most ambitious projects I had worked on to date, both technically and in scope.</p>
      
      <p>It challenged me a lot because it's hard to design an educational game based on the client's expectations and new features I added within Unity. I really focused myself on finding a balance between it being educational, but also engaging so it doesn't feel educational.</p>
      
      <p>In this project I worked a lot in Unity HDRP (High Definition Render Pipeline) which helped me create realistic water and lighting physics. I also worked on reusable code compiling, making my code as reusable as possible and easy to use for my teammates, like creating UI-objects that developers can drag and drop into their scene.</p>
      
      <p>Designing the UI in this project was very difficult. The game was very realistic and I wanted to find a good balance between easy to understand UI, while also making it feel more complex than it is. The final result is a polished and well-received product that was used within our client's schools.</p>
      
      <p>This project taught me how to work professionally within real product constraints and larger scale projects.</p>
    `,
    screenshots: ["RMDPVid.mp4", "RMDPimg2.png", "RMDPimg1.png", "RMDPimg3.png"],
    },

    tanked:{
    splashImage: "TankedSplashgif.gif",
    downloadLink: "",
    title: "Tanked!",
    tags: ["2025", "Unity", "2D", "Multiplayer", "Turn-based", "Strategy"],
    description: `
      <p>Tanked! is a turn-based multiplayer strategy game built in Unity during a 5-day rapid development project, where planning and efficient teamwork were essential.</p>
      
      <p>My main focus was gameplay programming and project planning, using planning techniques like user stories and master planning. I also designed the gameplay.</p>
      
      <p>The shorter development timeframe meant I had to design the game based on reusing already made elements. Despite the short timeframe, we created a polished and replayable experience, teaching me valuable lessons in rapid prototyping, planning, and working efficiently under pressure.</p>
    `,
    screenshots: ["Tankedimg1.png"],
    },

    starry:{
    splashImage: "StarrySplashgif.gif",
    downloadLink: "",
    title: "Starry",
    tags: ["2024", "Monogame", "2D", "Shooter", "Pixel-Art"],
    description: `
      <p>Starry is a very basic shooter game I made within Monogame, which was my first time using it. Monogame is a way more bare-bones, difficult to use game-dev tool. In fact, it's not even software—it's a framework—so everything is done within your IDE.</p>
      
      <p>This project may be small, but it forced me to think outside the box and use advanced coding techniques to calculate angles and rotations. This really helped me shape my ways of thought while coding and skyrocketed my C# skills for the better.</p>
      
      <p>I also based my pixel-art to make it seem like the game is being played on a GameBoy for some visual identity.</p>
    `,
    screenshots: ["StarryGamePlay.png"],
    },

    rustbucket:{
    splashImage: "RustbucketSplashgif.gif",
    downloadLink: "https://www.instagram.com/justateam_games/",
    title: "Rustbucket",
    tags: ["2026", "Unity", "3D", "In-Development", "Horror", "Story"],
    description: `
      <p>Rustbucket is a survival horror game project currently in development by my indie game team.</p>
      
      <p>While not much info has been released yet, I am currently working on shader creation. We are pushing for a fall 2026 release date, and this game will be available for purchase on Steam.</p>
    `,
    screenshots: ["Rustbucketimg1.png", "Rustbucketvid.mp4", "MS_screen3.png"],
    },

    lighting:{
    splashImage: "UnitySplashgif.gif",
    downloadLink: "https://sway.cloud.microsoft/TiA6fXiYOHzxeHs3",
    title: "Lighting study",
    tags: ["2026", "Unity", "2D", "Shooter", "Pixel-Art", "URP", "Fast-paced"],
    description: `
      <p>Lighting Study is a technical research project I did focused on improving my environmental lighting and visual presentation skills in Unity. As my games became more ambitious, I realized that strong lighting is one of the biggest factors in making a game feel professional, immersive, and visually polished.</p>
      
      <p>During this project I explored:</p>
      <ul>
        <li>Unity lighting using HDRP</li>
        <li>Baked lighting</li>
        <li>Volumetric fog</li>
        <li>Post-processing</li>
        <li>Particle-based atmospheric effects</li>
      </ul>
      
      <p>I also compared Unity's pipeline to Blender's lighting tools. I applied these techniques directly to one of my older projects and significantly improved both its visual quality and performance, which I then applied into my other projects (like De Ramp met de Phoenix).</p>
      
      <p>This project taught me how much visual presentation can improve gameplay and hold retention on your game.</p>
    `,
    screenshots: ["Lightingimg3.jpg", "Lightingimg1.jpg", "Lightingimg2.jpg"],
    },
        three:{
    splashImage: "ThreeSplashgif.gif",
    downloadLink: "https://sway.cloud.microsoft/TiA6fXiYOHzxeHs3",
    title: "Three.js Study",
    tags: ["2024", "Three.js", "3D", "HTML", "Course"],
    description: `
      <p>Three.js Study is a technical research project I did focused on learning the ins and out of the Three.js library.</p>

      <p>Three.js is a Javascript library used to display animated 3D objects within websites, giving you lots of flexibility in how you create websites by adding a new dimension kind of.</p>

      <p>During this project I explored:</p>
      <ul>
        <li>How to render 3D objects within websites</li>
        <li>Animating 3D objects</li>
        <li>Using CSS to place and design 3D movement</li>
      </ul>
    `,
    screenshots: ["ThreeImg1.png"],
    },
            wii:{
    splashImage: "WiiSplashgif.gif",
    downloadLink: "rinzekuizenga.github.io",
    title: "Why and how did i make this website?",
    tags: ["2026", "HTML", "CSS", "Javascript", "Three.js", "Learn it yourself!"],
    description: `
      <p>As you might have noticed I have designed my website after the Nintendo Wii's home menu, which is one of my favorite consoles/design eras</p>
      <p>My original portfolio website was a little more proffesional but I wanted to create my new one based on what I love, which happens to be the thing I do.</p<
      <p>The reason I chose this to represent me is because the Wii might just be the thing that kick-started my love for coding/creating games and designing UI. The Wii was my first step into that landscape when I was just 4 years old and I became obsessed ever since.</p>
      <p>I used a hand-full of techniques to make my UI as accurate as possible to the Wii:</p>
      <li>I ripped audio files from the Wii menu and accurately used them in my website.</li>
      <li>Learned Javascript animations to enhance user-experience.</li>
      <li>Also the website became very heavy due to the sheer amount of assets and animations i put in so I used lazy loading and reusable components to make sure it lagged less.</li>
    `,
    screenshots: ["WiiImg1.png", "WiiImg2.png"],
    }
  };

  function populateInfo(data) {
  document.querySelector(".info-title").textContent = data.title;

  const tagsEl = document.querySelector(".info-tags");
  tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join("");

  document.querySelector(".info-description").innerHTML = data.description;

  const container = document.querySelector(".info-right");
  container.querySelectorAll(".info-screenshot, .info-video").forEach(el => el.remove());

  data.screenshots.forEach(src => {
    if (src.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.src = src;
      video.className = "info-video";
      video.muted = true;
      video.loop = true;
      video.preload = "none";
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