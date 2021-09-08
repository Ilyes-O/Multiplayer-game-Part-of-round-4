class Slingshot2{
    constructor(pointA, bodyB){
        var options = {
            bodyB : bodyB,
            pointA: pointA,
            stiffness : 0.1,
            length : 10
        }
        this.pointA = pointA;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }
    fly(){
        this.sling.bodyB = null;
    }
    attach(body){
        this.sling.bodyB = body;
    }
    display(){
        if(this.sling.bodyB){
            var pointA = this.pointA;
            var pointB = this.sling.bodyB.position;
            push();
            strokeWeight(4);
            stroke("red");
            line(pointA.x, pointA.y, pointB.x, pointB.y);
            pop();
        }
    }
       
    
}