let density = 0.0002;
let stars = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  createStars();
}
  
function draw(){
  background(0);  
  drawStars();
  overStar();
}

function drawStars(){
  for (star of stars){
    star.show();
  }
}

function createStars(){
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      rnd = Math.random();
      if (rnd < density){
        star = new Star(x, y);
        stars.push(star);
      }
    }    
  }
}

function overStar(){
  for (star of stars){
    distance = dist(mouseX, mouseY, star.x, star.y);
    if (distance < star.r){
      fill(255);
      textSize(24);
      text(star.name, mouseX, mouseY);
    }
  }
}

function mouseClicked(){
  info = document.getElementById("info-box");
  for (star of stars){
    distance = dist(mouseX, mouseY, star.x, star.y);
    if (distance < star.r){
      info.style.display = "block";
      console.log(info.style.display);
    }
  }
}

function closeInfoBox(){
  info = document.getElementById("info-box");
  info.style.display = "none";
}