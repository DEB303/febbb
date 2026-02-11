let userName = "";
let yesSize = 1;
let heartInterval = null;

function showPage(pageNumber) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById("page" + pageNumber).classList.add("active");

  // Hearts only on page 4
  if (pageNumber === 4) {
    startHearts();
  } else {
    stopHearts();
  }
}

function goToPage2() {
  const input = document.getElementById("nameInput").value.trim();
  if (input === "") {
    alert("Please enter your name 😊");
    return;
  }
  userName = input;
  document.getElementById("greeting").innerText = `Hayii ${userName} 💕`;
  showPage(2);
}

function goToPage3() {
  showPage(3);
}

function goToPage4() {
  showPage(4);
}

// Valentine button logic
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

function moveNoButton() {
  const container = document.querySelector(".btn-container");

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  yesSize += 0.15;
  yesBtn.style.transform = `scale(${yesSize})`;
}

yesBtn.addEventListener("click", (e) => {
  explodeHearts(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);

  setTimeout(() => {
    document.body.innerHTML = `
      <div style="
        text-align:center;
        color:white;
        padding:40px;
        animation: fadeIn 1s ease;
      ">
        <h1>YAYYYY 💖🥰</h1>
        <h2>Thank you, ${userName}!</h2>
        <p>You just made my Valentine's Day special 💘</p>
      </div>
    `;
  }, 900);
});


// Floating hearts animation
const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.innerHTML = "💖";

  const size = Math.random() * 20 + 10;
  heart.style.fontSize = size + "px";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

function startHearts() {
  if (!heartInterval) {
    heartInterval = setInterval(createHeart, 300);
  }
}

function stopHearts() {
  clearInterval(heartInterval);
  heartInterval = null;
}


function explodeHearts(x, y) {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.classList.add("explode-heart");
    heart.innerHTML = "💖";

    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    const randomX = (Math.random() - 0.5) * 300 + "px";
    const randomY = (Math.random() - 0.5) * 300 + "px";

    heart.style.setProperty("--x", randomX);
    heart.style.setProperty("--y", randomY);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
};