let density = 0.0002;
let stars = [];

sunSelection = {"x": null, "y": null, "r": null};

function setup(){
  createCanvas(windowWidth, windowHeight);
  createStars();
}
  
function draw(){
  background(0);  
  drawStars();
  overStar();
  
  const exists = Object.values(sunSelection).every(x => (x !== null));
  if (exists){
    drawSelection(sunSelection.x, sunSelection.y, sunSelection.r);
  }
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
      break;
    }
  }
}

function mouseClicked(){
  info = document.getElementById("info-box");
  for (star of stars){
    distance = dist(mouseX, mouseY, star.x, star.y);
    if (distance < star.r){
      info.style.display = "block";
      insertData(star);
      sunSelection.x = star.x;
      sunSelection.y = star.y;
      sunSelection.r = star.r;
    }
  }
}

function closeInfoBox(){
  info = document.getElementById("info-box");
  info.style.display = "none";
}

function insertData(star){
  document.getElementById("star-name").innerHTML = "Name: " + star.name;
  document.getElementById("star-radius").innerHTML = "Radius: " + star.mesaR + " km";
  document.getElementById("planet-count").innerHTML = "Planets: " + star.planets.length;
}

function drawSelection(x, y, r){
  smallVal = 1.4;
  bigVal = 5;
  noStroke();
  fill(255, 0, 0);
  beginShape();
    vertex(x - r, y - r);
    vertex(x - r, y - r/bigVal);
    vertex(x - r*smallVal, y - r*smallVal);
    vertex(x - r/bigVal, y - r);
  endShape();
  beginShape();
    vertex(x + r, y - r);
    vertex(x + r, y - r/bigVal);
    vertex(x + r*smallVal, y - r*smallVal);
    vertex(x + r/bigVal, y - r);
  endShape();
  beginShape();
    vertex(x + r, y + r);
    vertex(x + r, y + r/bigVal);
    vertex(x + r*smallVal, y + r*smallVal);
    vertex(x + r/bigVal, y + r);
  endShape();
  beginShape();
    vertex(x - r, y + r);
    vertex(x - r, y + r/bigVal);
    vertex(x - r*smallVal, y + r*smallVal);
    vertex(x - r/bigVal, y + r);
  endShape();
}