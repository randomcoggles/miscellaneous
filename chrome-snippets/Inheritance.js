function Vehicle() {
  //   Private property in Vehicle;
    this.move = function() {
      conso.log('Move in Vehicle');
    }
}

//   Public property in Vehicle
Vehicle.prototype.moveBy = function(x,y) {
  console.log('moveBy in Vehicle');
}

function Car() {
//   Inherit Vehicle's members
  this.move = function() { console.log('Move in Car')}
}
Car.prototype = Vehicle.prototype;

var car_a = new Car();
car_a.move();
car_a.moveBy();
