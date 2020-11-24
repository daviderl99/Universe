let density = 0.0002;
let stars = [];
sunSelection = {"x": null, "y": null};
// let fg;

function setup(){
  createCanvas(windowWidth, windowHeight);
  // fg = createGraphics(windowWidth, windowHeight);
  createStars();
}
  
function draw(){
  background(0);  
  drawStars();
  overStar();
  // image(fg, 0, 0);
  // fg.clear();
  
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
      insertData(star);
      sunSelection.x = star.x;
      sunSelection.y = star.y;
      break;
    }
    Object.keys(sunSelection).forEach(el => sunSelection[el] = null);
  }
}

function toggleDiv(id, toggle){
  div = $("#" + id);
  if (toggle.toUpperCase() === "ON"){
    div.css("display", "block");
  } else if (toggle.toUpperCase() === "OFF"){
    div.css("display", "none");
  }
}

function insertData(body){
  toggleDiv("list", "OFF");
  toggleDiv("info-box", "ON");
  toggleDiv("info", "ON");
  if (body === undefined) return;

  $("#celestial-body-type").html(`Type: ${body.constructor.name}`);
  $("#celestial-body-name").html(`Name: ${body.name}`);
  $("#celestial-body-radius").html(`Radius: ${body.mesaR} km`);
  $("#celestial-body-satellite-count").html(`${body.satellitesType}: ${body.satellites.length}`);
  $("#celestial-body-satellite-count").click(() => showSatellites(body));
}

// $(x).data('options', obj);
// $(x).data('options');

function showSatellites(body){
  toggleDiv("info", "OFF");
  list = $("#list");
  list.css("display", "block");
  list.html(`<button id="back-btn" onclick="insertData()">&lt;&lt;</button>`);
  list.append(`<span class="type-name">${body.satellitesType}</span>`);
  for (sat of body.satellites){
    list.append(`<span>${sat.name}</span>`);
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

// let drawingDistance = false;
// let mousePos = {};
// function mouseDragged(){
//   if (!drawingDistance) {
//     mousePos.x1 = mouseX;
//     mousePos.y1 = mouseY;
//     drawingDistance = true;
//   } else {
//     mousePos.x2 = mouseX;
//     mousePos.y2 = mouseY;
//     fg.stroke(255, 50, 0);
//     fg.line(mousePos.x1, mousePos.y1, mousePos.x2, mousePos.y2);
//   }
// }