// Setup Canvas Animation
const canvas = document.getElementById('backgroundCanvas');  // Get the canvas element
const ctx = canvas.getContext('2d');  // Get the 2d context for drawing

let circles = [];  // Array to hold all the circle objects

// Function to resize the canvas dynamically with the window size
function resizeCanvas() {
  canvas.width = window.innerWidth;  // Set canvas width to window's width
  canvas.height = window.innerHeight;  // Set canvas height to window's height
}

// Circle class to create circle objects with movement properties
class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;  // X position of the circle
    this.y = y;  // Y position of the circle
    this.radius = radius;  // Radius of the circle
    this.dx = dx;  // Horizontal speed (change in X)
    this.dy = dy;  // Vertical speed (change in Y)
  }

  // Function to draw the circle on the canvas
  draw() {
    ctx.beginPath();  // Start a new drawing path
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  // Draw the circle
    ctx.fillStyle = '#4f8ef7';  // Set the fill color to blue
    ctx.fill();  // Fill the circle
    ctx.closePath();  // End the drawing path
  }

  // Function to update the circle's position and redraw it
  update() {
    // If the circle hits the edge, reverse its direction
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;  // Update X position based on speed
    this.y += this.dy;  // Update Y position based on speed

    this.draw();  // Redraw the circle at the new position
  }
}

// Function to create circles with random positions and speeds
function createCircles() {
  for (let i = 0; i < 10; i++) {
    let radius = Math.random() * 20 + 10;  // Random radius between 10 and 30
    let x = Math.random() * (canvas.width - radius * 2) + radius;  // Random X position
    let y = Math.random() * (canvas.height - radius * 2) + radius;  // Random Y position
    let dx = (Math.random() - 0.5) * 2;  // Random X speed between -1 and 1
    let dy = (Math.random() - 0.5) * 2;  // Random Y speed between -1 and 1

    circles.push(new Circle(x, y, radius, dx, dy));  // Create a new Circle and add it to the circles array
  }
}

// Function to animate the canvas
function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas on each frame
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();  // Update and redraw each circle
  }
  requestAnimationFrame(animateCanvas);  // Request the next animation frame
}

// Event listener to resize the canvas when the window size changes
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();  // Set the initial size of the canvas
createCircles();  // Create the initial set of circles
animateCanvas();  // Start the animation loop