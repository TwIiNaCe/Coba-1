let heartSize = 90;
let maxHeartSize = 1500;

let exploded = false;
let pulse = 0;

let phase = 1;
let clickCount = 0;
let explosionTime = 0;

let particles = [];


function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
}


function draw() {

  background(255, 235, 242);


  // =====================================
  // PHASE 1 - OPENING
  // =====================================

  if (phase === 1) {

    fill(220, 70, 120);
    textSize(28);

    text(
      "Coba ak belajar bikin sesuatu",
      width / 2,
      210
    );


    fill(170, 90, 120);
    textSize(21);

    text(
      "KLIKKKK",
      width / 2,
      250
    );
  }



  // =====================================
  // PHASE 2 - HEART
  // =====================================

  else if (phase === 2) {


    // HEART BELUM MELEDAK

    if (!exploded) {

      // efek detak
      pulse = sin(frameCount * 0.08) * 4;

      let currentSize =
        heartSize + pulse;


      drawHeart(
        width / 2,
        height / 2 - 20,
        currentSize
      );


      // =====================================
      // TEXT BERDASARKAN JUMLAH KLIK
      // =====================================

      if (clickCount < 10) {

        fill(0);
        textSize(18);

        text(
          "Lanjut klik ayo",
          width / 2,
          410
        );
      }


      else if (clickCount < 22) {

        fill(0);
        textSize(20);

        text(
          "Lanjuttt",
          width / 2,
          390
        );


        textSize(17);

        text(
          "Terusin klikkk",
          width / 2,
          420
        );
      }


      else {

        fill(0);
        textSize(20);

        text(
          "lama banget kamu",
          width / 2,
          390
        );


        textSize(17);

        text(
          "emg mey kentank",
          width / 2,
          420
        );
      }
    }



    // =====================================
    // HEART SUDAH MELEDAK
    // =====================================

    else {


      // particle hati kecil

      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {

        let p = particles[i];

        p.update();
        p.display();


        if (p.life <= 0) {

          particles.splice(i, 1);
        }
      }



      // =====================================
      // TULISAN PERTAMA
      // 0 - 4 DETIK
      // =====================================

      if (
        millis() - explosionTime < 4000
      ) {

        fill(220, 70, 120);

        textSize(30);

        text(
          "Meledak hatiku anjayyy",
          width / 2,
          215
        );


        textSize(26);

        text(
          "emang jahat kamu",
          width / 2,
          260
        );
      }



      // =====================================
      // SETELAH 4 DETIK
      // tulisan lama hilang
      // =====================================

      else {

        fill(170, 90, 120);

        textSize(40);

        text(
          "Love Youuuu",
          width / 2,
          220
        );


        textSize(30);

        text(
          "Wleeee",
          width / 2,
          270
        );


        textSize(23);

        text(
          "baru belajar maap kalau jelek :(",
          width / 2,
          320
        );
      }
    }
  }
}



// =====================================
// MOUSE CLICK
// =====================================

function mousePressed() {


  // Opening → Heart

  if (phase === 1) {

    phase = 2;

    return;
  }



  // Klik hati

  if (
    phase === 2 &&
    !exploded
  ) {

    clickCount++;


    // hati bertambah besar
    heartSize += 10;



    // kalau sudah besar → BOOM

    if (
      heartSize >= maxHeartSize
    ) {

      exploded = true;

      explosionTime = millis();

      createExplosion();
    }
  }
}



// =====================================
// DRAW HEART
// p5.js v2
// =====================================

function drawHeart(x, y, s) {

  push();

  translate(x, y);

  noStroke();

  fill(255, 90, 145);


  beginShape();


  // titik awal bawah hati

  bezierVertex(
    0,
    s * 0.35
  );


  // lengkungan kiri

  bezierVertex(
    -s * 0.65,
    -s * 0.05
  );

  bezierVertex(
    -s * 0.55,
    -s * 0.65
  );

  bezierVertex(
    0,
    -s * 0.30
  );


  // lengkungan kanan

  bezierVertex(
    s * 0.55,
    -s * 0.65
  );

  bezierVertex(
    s * 0.65,
    -s * 0.05
  );

  bezierVertex(
    0,
    s * 0.35
  );


  endShape(CLOSE);

  pop();
}



// =====================================
// CREATE EXPLOSION
// =====================================

function createExplosion() {

  for (
    let i = 0;
    i < 40;
    i++
  ) {

    let angle =
      random(TWO_PI);


    let speed =
      random(2, 8);


    let vx =
      cos(angle) * speed;


    let vy =
      sin(angle) * speed;


    particles.push(

      new Particle(

        width / 2,

        height / 2 - 20,

        vx,

        vy
      )
    );
  }
}



// =====================================
// PARTICLE CLASS
// =====================================

class Particle {


  constructor(x, y, vx, vy) {

    this.x = x;

    this.y = y;


    this.vx = vx;

    this.vy = vy;


    this.size =
      random(12, 30);


    this.life = 255;
  }



  update() {

    this.x +=
      this.vx;


    this.y +=
      this.vy;


    this.vy +=
      0.04;


    this.life -=
      3;
  }



  display() {

    noStroke();


    fill(
      255,
      90,
      145,
      this.life
    );


    drawHeart(
      this.x,
      this.y,
      this.size
    );
  }
}
