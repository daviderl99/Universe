
function genRadius(min, max){
  return randomInt(min, max);
}

// Meant to generate more realistic radii using meta radius 
function genMesaRadius(radius){
  radii = [{"min": 50, "max": 200}, {"min": 400, "max": 1000}, {"min": 50000, "max": 20000}, {"min": 40000, "max": 200000}, 
           {"min": 400000, "max": 800000}, {"min": 1000000, "max": 5000000}, {"min": 10000000, "max": 50000000}, {"min": 50000000, "max": 200000000}, 
           {"min": 200000000, "max": 500000000}, {"min": 800000000, "max": 1200000000}];

  return randomInt(radii[radius-1].min, radii[radius-1].max).toLocaleString();
}

function genColor(){
  hue = (Math.random() > 0.5) ? randomInt(0, 55) : randomInt(200, 250); // red to yellow or blueish
  sat = (Math.random() > 0.3) ? 75 : 1; // sat 75 or 1 (white)
  bri = 100;
  return color(`hsb(${hue}, ${sat}%, ${bri}%)`);
}

function genName(min, max){
  const vowels = "aeiou".split("");
  const consonants = "bcdfghjklmnpqrstvwxyz".split("");
  nameLength = randomInt(min, max);
  let name = "";

  while (name.length < nameLength){
    if (Math.random() > 0.5) {
      if (lastLetters(name, vowels, 2)) {
        name = addLetter(name, consonants);
        continue;
      }
      name = addLetter(name, vowels);
    } else {
      if (lastLetters(name, consonants, 2)) continue;
      name = addLetter(name, consonants);
    }
  }
  return capitalizeFirstLetter(name);
}

function genPlanets(min, max){
  planets = [];
  planetCount = randomBiasInt(min, max);
  for (let i = 0; i < planetCount; i++){
    planet = new Planet();
    planets.push(planet);
  }
  return planets;
}

function genMoons(min, max){
  moons = [];
  moonCount = randomBiasInt(min, max);
  for (let i = 0; i < moonCount; i++){
    moon = new Moon();
    moons.push(moon);
  }
  return moons;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Random int between min and max, with outputs closer to min being more common
function randomBiasInt(min, max){
  return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
}

function addLetter(name, type){
  index = randomInt(0, type.length-1);
  name += type[index];
  return name;
}

function lastLetters(word, letters, count){
  chars = word.slice(-count).split("");
  for (c of chars){
    if (!letters.includes(c)){
      return false;
    }
  }
  return true;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}