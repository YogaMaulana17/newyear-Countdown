document.addEventListener("DOMContentLoaded", function () {
  var targetDate = new Date("January 1, 2024 00:00:00").getTime();
  var countdownInterval;

  function updateCountdown() {
    var currentDate = new Date().getTime();
    var timeDifference = targetDate - currentDate;

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("time").innerHTML =
      days + "d " + hours + ":" + minutes + ":" + seconds;

    if (timeDifference < 0) {
      clearInterval(countdownInterval);
      document.getElementById("textAlert").innerHTML = "Selamat Tahun Baru!";
      setTimeout(function () {
        window.location.href = "Fireworks.html";
      }, 3000);
    }
  }

  function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function testCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("textAlert").innerHTML = "Selamat Tahun Baru!";
    setTimeout(function () {
      window.location.href = "Fireworks.html";
    }, 3000);
  }

  // Inisialisasi countdown
  updateCountdown();
  startCountdown();

  // Menambahkan event listener untuk tombol uji coba
  document
    .getElementById("testButton")
    .addEventListener("click", testCountdown);
});

// flare cursor
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

onload = function () {
  setTimeout(init, 0);
};

init = function () {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  onresize = function () {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };
  onresize();

  mouse = { x: canvas.width / 2, y: canvas.height / 2, out: false };

  canvas.onmouseout = function () {
    mouse.out = true;
  };

  canvas.onmousemove = function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      out: false,
    };
  };

  gravityStrength = 10;
  particles = [];
  spawnTimer = 0;
  spawnInterval = 10;
  type = 0;
  requestAnimationFrame(startLoop);
};

newParticle = function () {
  type = type ? 0 : 1;
  particles.push({
    x: mouse.x,
    y: mouse.y,
    xv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
    yv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
    c: type
      ? "rgb(255," +
        ((200 * Math.random()) | 0) +
        "," +
        ((80 * Math.random()) | 0) +
        ")"
      : "rgb(255,255,255)",
    s: type ? 5 + 10 * Math.random() : 1,
    a: 1,
  });
};

startLoop = function (newTime) {
  time = newTime;
  requestAnimationFrame(loop);
};

loop = function (newTime) {
  draw();
  calculate(newTime);
  requestAnimationFrame(loop);
};

draw = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    ctx.globalAlpha = p.a;
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
    ctx.fill();
  }
};

calculate = function (newTime) {
  var dt = newTime - time;
  time = newTime;

  if (!mouse.out) {
    spawnTimer += dt < 100 ? dt : 100;
    for (; spawnTimer > 0; spawnTimer -= spawnInterval) {
      newParticle();
    }
  }

  particleOverflow = particles.length - 700;
  if (particleOverflow > 0) {
    particles.splice(0, particleOverflow);
  }

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    if (!mouse.out) {
      x = mouse.x - p.x;
      y = mouse.y - p.y;
      a = x * x + y * y;
      a = a > 100 ? gravityStrength / a : gravityStrength / 100;
      p.xv = (p.xv + a * x) * 0.99;
      p.yv = (p.yv + a * y) * 0.99;
    }
    p.x += p.xv;
    p.y += p.yv;
    p.a *= 0.99;
  }
};
//test
// document.addEventListener("DOMContentLoaded", function () {
//   var currentDate = new Date().getTime();
//   var targetDate = new Date(currentDate + 10000).getTime();
//   var countdownInterval = setInterval(updateCountdown, 1000);

//   function updateCountdown() {
//     var currentDate = new Date().getTime();
//     var timeDifference = targetDate - currentDate;
//     var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     var hours = Math.floor(
//       (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//     document.getElementById("countdown").innerHTML =
//       days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

//     if (timeDifference < 0) {
//       clearInterval(countdownInterval);
//       document.getElementById("countdown").innerHTML = "Waktu sudah habis!";
//       document.getElementById("countdown").classList.add("exploded");

//       // Mengarahkan ke halaman lain setelah waktu habis (ganti "halaman-lain.html" dengan nama file yang sesuai)
//       setTimeout(function () {
//         window.location.href = "Fireworks.html";
//       }, 3000); // Delay 3 detik sebelum mengarahkan ke halaman lain
//     }
//   }

//   function resetCountdown() {
//     targetDate = new Date(new Date().getTime() + 10000).getTime();
//     countdownInterval = setInterval(updateCountdown, 1000);
//     updateCountdown();
//     document.getElementById("countdown").classList.remove("exploded");
//   }

//   updateCountdown();
//   document
//     .getElementById("resetButton")
//     .addEventListener("click", resetCountdown);
// });
