class Block2 {
    constructor(x, y,img) {
      var options = {
        'restitution': 0.4,
        'friction': .5
      }
      this.body = Bodies.rectangle(x, y, 30, 40, options);
      this.wdith = 30;
      this.height = 40;
      this.Visibility = 255;
      World.add(world, this.body); 
      this.image = img;
    }
    display() {
      var pos = this.body.position
      if (this.body.speed < 5) {
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height+10);
      }
      else {
        World.remove(world, this.body);
        push();
        tint(255, this.Visibility);
        image(this.image, this.body.position.x, this.body.position.y, this.width, this.height);
        this.Visibility = this.Visibility - 5;
        pop();
      }
    }
    score(){
      if(this.Visibility > -10&&this.Visibility <10){
        score++;
      }
    }
  }