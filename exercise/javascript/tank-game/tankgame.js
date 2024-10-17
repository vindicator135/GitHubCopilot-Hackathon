// Global variables
var gameEnded = false;

// Create canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let bullet = null;

// Constants for physics. Gravity and air resistance

document.body.appendChild(canvas);
canvas.width = 720;
canvas.height = 480;

// Tank and target details
let tank = { x: 50, y: 550, angle: Math.PI / 4, power: 10 };
let target = {
  x: Math.random() * (canvas.width / 2) + canvas.width / 2,
  y: Math.random() * (canvas.height - 50),
  width: 50,
  height: 50,
};

// Draw function
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw boundary
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  // Draw reset button
  ctx.fillRect(10, canvas.height - 40, 80, 30);
  ctx.fillStyle = "white";
  ctx.fillText("Reset", 20, canvas.height - 20);
  ctx.fillStyle = "black";

  // Draw angle and power meter
  ctx.fillText(
    "Angle: " + Math.round(tank.angle * (180 / Math.PI)),
    canvas.width - 100,
    canvas.height - 50
  ); // Convert radian to degree
  ctx.fillText(
    "Power: " + Math.round(tank.power),
    canvas.width - 100,
    canvas.height - 30
  );

  // Draw tank as a circle inside a rectangle
  ctx.beginPath();
  ctx.rect(tank.x - 30, canvas.height / 2 - 20, 60, 40); // Draw wider rectangle for the tank body
  ctx.lineWidth = 5; // Make the line thicker

  ctx.stroke();

  ctx.beginPath(); // Start a new path for the circle
  ctx.arc(tank.x + 10, canvas.height / 2, 20, 0, 2 * Math.PI); // Draw circle inside the rectangle closer to the right edge
  ctx.moveTo(tank.x + 10, canvas.height / 2); // Move to center of circle
  ctx.lineTo(
    tank.x + 10 + 50 * Math.cos(tank.angle),
    canvas.height / 2 - 50 * Math.sin(tank.angle)
  ); // Draw line for the tank gun
  ctx.stroke();

  ctx.lineWidth = 1; // Reset the line width for other drawings
  ctx.strokeStyle = "black"; // Reset the line color for other drawings

  // Draw target
  if (target.hit) {
    // Draw X
    ctx.beginPath();
    ctx.moveTo(target.x, target.y);
    ctx.lineTo(target.x + target.width, target.y + target.height);
    ctx.moveTo(target.x + target.width, target.y);
    ctx.lineTo(target.x, target.y + target.height);
    ctx.stroke();
  } else {
    // Draw rectangle
    ctx.fillRect(target.x, target.y, target.width, target.height);
  }

  // Draw bullet
  if (bullet) {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 5, 0, 2 * Math.PI);
    // Change color of the bullet
    ctx.fill();
  }

  // Draw bullet count
  ctx.fillText(
    "Bullets: " + tank.bulletCount,
    canvas.width - 100,
    canvas.height - 10
  );

  // Draw game over message
  if (gameEnded && !target.hit) {
    var oldFont = ctx.font; // Save current font
    ctx.font = "30px Arial"; // Change font size
    ctx.fillText("You lose", canvas.width / 2, canvas.height / 2); // Draw text
    ctx.font = oldFont; // Restore old font
  }

  // Draw success message
  if (target.hit) {
    var oldFont = ctx.font; // Save current font
    ctx.font = "30px Arial"; // Change font size
    ctx.fillText("Great Job!", canvas.width / 2, canvas.height / 2); // Draw text
    ctx.font = oldFont; // Restore old font
  }
}

// Update function
function update() {
  // Update bullet
  if (bullet) {
    // Apply physics

    // Update position
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    // Check if hit target
    if (
      bullet.x > target.x &&
      bullet.x < target.x + target.width &&
      bullet.y > target.y &&
      bullet.y < target.y + target.height
    ) {
      // Mark target as hit
      target.hit = true;
    }
  }

  // Listen for arrow keys
  document.onkeydown = function (e) {
    switch (e.code) {
      case "ArrowLeft": // left arrow
        tank.power--;
        break;
      case "ArrowUp": // up arrow
        tank.angle += 0.1;
        break;
      case "ArrowRight": // right arrow
        tank.power++;
        break;
      case "ArrowDown": // down arrow
        tank.angle -= 0.1;
        break;
      case "Space": // spacebar
        if (!gameEnded) {
          shoot();
        }
        break;
    }
  };

  // Check if game is over
  if (tank.bulletCount === 0 && !target.hit) {
    gameEnded = true;
  }
}

// Shoot function
function shoot() {
  console.log("Shoot function called");

  // Decrement bullet count
  tank.bulletCount--;

  // Create bullet
  bullet = {
    x: tank.x + 50 * Math.cos(tank.angle),
    y: canvas.height / 2 - 50 * Math.sin(tank.angle),
    vx: tank.power * Math.cos(tank.angle),
    vy: -tank.power * Math.sin(tank.angle),
  };
}

// Game loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Reset game function
function resetGame() {
  // Reset tank and target
  tank = {
    x: 50,
    y: canvas.height / 2,
    power: 10,
    angle: Math.PI / 4,
    bulletCount: 3,
  };
  target = {
    x: Math.random() * (canvas.width - target.width),
    y: Math.random() * (canvas.height - target.height),
    width: 50,
    height: 50,
    hit: false,
  };
  gameEnded = false;
}

// Event listener for clicks
canvas.addEventListener("click", function (event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // Check if click is within reset button
  if (x > 10 && x < 90 && y > canvas.height - 40 && y < canvas.height - 10) {
    resetGame();
  }
});

// Event listener for window resize. Resize canvas when browser window is resized.

// Start game
resetGame();
loop();
