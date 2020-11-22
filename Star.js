
class Star{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = genRadius(1, 10);
    this.mesaR = genMesaRadius(this.r);
    this.color = genColor();
    this.name = genName(4, 10);
    this.planets = genPlanets(0, 10);
  }

  show(){
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r);
  }
}