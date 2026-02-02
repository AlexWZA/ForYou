const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");

// Function to move NO button anywhere on screen without going off-screen
function moveNoButton() {
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Calculate random position inside viewport
  const x = Math.random() * (window.innerWidth - btnWidth);
  const y = Math.random() * (window.innerHeight - btnHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

// Move NO immediately on hover or touch
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);

// Extra: move NO if cursor gets close
document.addEventListener("mousemove", (e) => {
  const rect = noButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (distance < 100) {
    moveNoButton();
  }
});

// YES button click
yesButton.addEventListener("click", () => {
  // Get South African time
  const now = new Date();
  const sastTime = now.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    dateStyle: "full",
    timeStyle: "medium"
  });

  // ✅ Send email via EmailJS with the time variable
  emailjs.send(
    "service_r9rb4tl",   // Service ID
    "template_d7gy4rc",  // Template ID
    { time: sastTime },   // MUST match {{time}} in your template
    "RhXbtQWtt0wuoDRoT"  // Public key
  ).then(
    () => {
      // Celebration screen
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          font-family:Arial, sans-serif;
          background:linear-gradient(135deg,#ff4d6d,#ffb3c6);
          color:white;
          text-align:center;
        ">
          <h1>
            YAY!!! 💖🥰<br>
            You just made me the happiest person alive 💕
          </h1>
        </div>
      `;
    },
    (error) => {
      alert("Email failed, but she still said YES! 💖");
      console.error(error);
    }
  );
});