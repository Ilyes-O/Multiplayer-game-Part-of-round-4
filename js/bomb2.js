class Bomb2 {
  constructor(x, y, width, height) {
    var options = {
      'density': 2.5,
      'friction': 1.0,
      'restitution': 0.5
    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.image = loadImage("images/bomb2.png");
    World.add(world, this.body);
  }
  attach(body) {
    this.sling.bodyA = body;
  }

  fly() {
    this.sling.bodyA = null;
  }

  display() {
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}