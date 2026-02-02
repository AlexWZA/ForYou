const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const container = document.querySelector(".container");

// Function to move NO button without going off-screen
function moveNoButton() {
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Full window width and height minus button size
  const x = Math.random() * (window.innerWidth - btnWidth);
  const y = Math.random() * (window.innerHeight - btnHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

// Move NO button immediately on hover or touch
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);

// Extra: move NO if mouse gets close (makes it almost impossible to click)
document.addEventListener("mousemove", (e) => {
  const rect = noButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (distance < 100) { // if cursor is within 100px
    moveNoButton();
  }
});

// YES button click
yesButton.addEventListener("click", () => {
  const now = new Date();

  // South African time (optional)
  const sastTime = now.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    dateStyle: "full",
    timeStyle: "medium"
  });

  // Send email via EmailJS
  emailjs.send("service_r9rb4tl", "template_d7gy4rc", {
    // time: sastTime  <-- optional, remove if template doesn't use it
  }).then(
    () => {
      // Show celebration screen
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          font-family:Arial;
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