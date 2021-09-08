class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.message = createElement('h2')
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.message.hide();
  }

  display(){
    var title = createElement('h2')
    title.html("Slinging Game");
    title.position(displayWidth/2-60, 20);

    this.input.position(displayWidth/2-60, 300);
    this.button.position(displayWidth/2-5, 350);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name )
      this.greeting.position(560, 100);
      this.message.html("Knock down each others towers!");
      this.message.position(470,200)
    });

  }
}
