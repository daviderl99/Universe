
class Planet{
  constructor(){
    this.r = randomInt(5000, 70000); // non-meta (mesa) radius
    this.name = genName(4, 7);
    this.satellites = genMoons(0, 5);
    this.satellitesType = "Moons";
  }
}