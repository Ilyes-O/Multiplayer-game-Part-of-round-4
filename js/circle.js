class Circle{
    constructor(x, y, r){
        var options = {
            friction: 0,
            restititution: 1.0
        }
        this.r= r;
        this.body = Bodies.circle(x, y, r, options);
        World.add(world,this.body);
    }

    isOffScreen(){
        var pos = this.body.position;
        return (pos.y > height+100);
    }

    removeFromWorld(){
        World.remove(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill("red");
        ellipse(0, 0, this.r * 2);
        pop();
    }

}