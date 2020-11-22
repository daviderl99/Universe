
class Star{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = genRadius();
    this.color = genColor();
    this.name = genName();
  }

  show(){
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r);
  }
}

function genRadius(){
  return randomInt(1, 10);
}

function genColor(){
  hue = (Math.random() > 0.5) ? randomInt(0, 55) : randomInt(200, 250);
  sat = (Math.random() > 0.3) ? 75 : 1;
  bri = 100;
  return color(hue, sat, bri);
}

function genName(){
  const vowels = "aeiou".split("");
  const consonants = "bcdfghjklmnpqrstvwxyz".split("");
  nameLength = randomInt(4, 10);
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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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