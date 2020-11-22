
class Planet{
  constructor(){
    this.r = randomInt(5000, 70000); // non-meta (mesa) radius
    this.color = genColor();
    this.name = genName(4, 7);
  }
}