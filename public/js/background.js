let canvas = document.querySelector('.background');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext('2d');

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  initCanvas();
})

let mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove',
  function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircles();
  }
)
window.addEventListener("touchmove",
  function (event) {
    let touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    drawCircles();
  }
)

function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  this.vx = vx;
  this.vy = vy;
  this.birth = birth;
  this.life = life;
  this.opacity = opacity;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = 'rgba(' + rgb + ',' + this.opacity + ')';
    c.fill();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.opacity = 1 - ((frame - this.birth) / this.life);

    if (frame > this.birth + this.life) {
      for (let i = 0; i < circleArray.length; i++) {
        if (this.birth == circleArray[i].birth && this.life == circleArray[i].life) {
          circleArray.splice(i, 1);
          break;
        }
      }
    } else {
      this.draw();
    }
  }

}

let circleArray = [];

function initCanvas() {
  circleArray = [];
}

const colorArray = [
  '221,99,252',
  '247,144,217',
  '158,13,230'
]

function drawCircles() {
  for (let i = 0; i < 6; i++) {
    let radius = Math.floor(Math.random() * 4) + 2;
    let vx = (Math.random() * 2) - 1;
    let vy = (Math.random() * 2) - 1;
    let spawnFrame = frame;
    let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
    let life = 100;
    circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));

  }
}

let frame = 0;
function animate() {
  requestAnimationFrame(animate);
  frame += 1;
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}

initCanvas();
animate();

for (let i = 1; i < +document.body.querySelector('h1').offsetWidth / 10; i++) {
  (function () {
    setTimeout(function () {
      mouse.x = document.body.querySelector('h1').offsetLeft + i * 10;
      mouse.y = document.body.querySelector('h1').offsetTop + 60;
      drawCircles();
    }, i * 10);
  })(i);
}
