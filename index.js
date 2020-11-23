let density = 0.0002;
let stars = [];

sunSelection = {"x": null, "y": null};

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
    drawSelection(sunSelection.x, sunSelection.y);
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
      text(star.name, mouseX + 10, mouseY - 10);
      break;
    }
  }
}

function mouseClicked(){
  for (star of stars){
    distance = dist(mouseX, mouseY, star.x, star.y);
    if (distance < star.r){
      toggleDiv("list", "OFF");
      toggleDiv("info-box", "ON");
      toggleDiv("info", "ON");
      insertData(star);
      sunSelection.x = star.x;
      sunSelection.y = star.y;
      break;
    }
    Object.keys(sunSelection).forEach(el => sunSelection[el] = null);
  }
}

function toggleDiv(id, toggle){
  div = document.getElementById(id);
  if (toggle.toUpperCase() === "ON"){
    div.style.display = "block";
  } else if (toggle.toUpperCase() === "OFF"){
    div.style.display = "none";
  }
}

function insertData(body){
  document.getElementById("celestial-body-type").innerHTML = `Type: ${body.constructor.name}`;
  document.getElementById("celestial-body-name").innerHTML = `Name: ${body.name}`;
  document.getElementById("celestial-body-radius").innerHTML = `Radius: ${body.mesaR} km`;
  document.getElementById("celestial-body-satellite-count").innerHTML = `${body.satellitesType}: ${body.satellites.length}`;
  document.getElementById("celestial-body-satellite-count").addEventListener("click", () => showSatellites(body), false);
}

function showSatellites(body){
  toggleDiv("info", "OFF");
  list = document.getElementById("list");
  list.style.display = "block";
  list.innerHTML = `<span class="type-name">${body.satellitesType}</span>`;
  for (sat of body.satellites){
    list.innerHTML += `<span>${sat.name}</span>`;
  }
}

function drawSelection(x, y){
  smallVal = 1.4;
  bigVal = 5;
  let size = 10;
  noStroke();
  fill(255, 0, 0);
  beginShape();
    vertex(x - size, y - size);
    vertex(x - size, y - size/bigVal);
    vertex(x - size*smallVal, y - size*smallVal);
    vertex(x - size/bigVal, y - size);
  endShape();
  beginShape();
    vertex(x + size, y - size);
    vertex(x + size, y - size/bigVal);
    vertex(x + size*smallVal, y - size*smallVal);
    vertex(x + size/bigVal, y - size);
  endShape();
  beginShape();
    vertex(x + size, y + size);
    vertex(x + size, y + size/bigVal);
    vertex(x + size*smallVal, y + size*smallVal);
    vertex(x + size/bigVal, y + size);
  endShape();
  beginShape();
    vertex(x - size, y + size);
    vertex(x - size, y + size/bigVal);
    vertex(x - size*smallVal, y + size*smallVal);
    vertex(x - size/bigVal, y + size);
  endShape();
}