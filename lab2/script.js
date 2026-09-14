// 1.2.3
var car1 = new Object();
car1.color = "black";
car1.maxSpeed = 220;
car1.tuning = true;
car1["number of accidents"] = 0;

car1.driver = new Object();
car1.driver.name = "Вікторія Сушко";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

// 1.2.4
var car2 = {
  color: "pink",
  maxSpeed: 200,
  tuning: false,
  "number of accidents": 2,
  driver: {
    name: "Вікторія Сушко",
    category: "B",
    "personal limitations": null
  }
};

// 1.2.5
car1.drive = function() {
  console.log("I am not driving at night");
};
car1.drive();

// 1.2.6
car2.drive = function() {
  console.log("I can drive anytime");
};
car2.drive();

// 1.2.7
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  // 1.2.9: Метод trip усередині конструктора
  this.trip = function() {
    if (!this.driver) {
      console.log("No driver assigned");
    } else {
      var message = "Driver " + this.driver.name;
      message += this.driver.nightDriving ? " drives at night" : " does not drive at night";
      message += " and has " + this.driver.experience + " years of experience";
      console.log(message);
    }
  };
}

// 1.2.8
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

// 1.2.10
console.log("1.2.10 Truck та trip()");
var truck1 = new Truck("grey", 3100, 130.0, "Tesla", "Cybertruck Cyberbeast");
var truck2 = new Truck("purple", 8100, 89.0, "Mercedes-Benz", "Actros Edition 2");

truck1.AssignDriver("Вікторія Сушко", true, 5);
truck2.AssignDriver("Вікторія Сушко", false, 3);

truck1.trip();
truck2.trip();

// 1.2.12 - 1.2.15
class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log("Square: чотирикутник, у якого всі сторони рівні, а всі кути прямі (90°).");
  }

  length() {
    console.log("Периметр квадрата: " + (4 * this.a));
  }

  square() {
    console.log("Площа квадрата: " + (this.a * this.a));
  }

  info() {
    console.log("Інформація про Square");
    console.log("Сторони: a1 = " + this.a + ", a2 = " + this.a + ", a3 = " + this.a + ", a4 = " + this.a);
    console.log("Кути: 90°, 90°, 90°, 90°");
    console.log("Сума сторін (периметр): " + (4 * this.a));
    console.log("Площа: " + (this.a * this.a));
  }
}

// 1.2.16 - 1.2.17
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this._b = b;
  }

  // 1.2.22: Геттери та сеттери для властивостей класу Rectangle
  get a() {
    return this._a;
  }
  set a(val) {
    this._a = val;
  }

  get b() {
    return this._b;
  }
  set b(val) {
    this._b = val;
  }

  static help() {
    console.log("Rectangle: чотирикутник, у якого протилежні сторони попарно рівні, а всі кути дорівнюють 90°.");
  }

  length() {
    console.log("Периметр прямокутника: " + (2 * (this.a + this.b)));
  }

  square() {
    console.log("Площа прямокутника: " + (this.a * this.b));
  }

  info() {
    console.log("--- Інформація про Rectangle ---");
    console.log("Сторони: a = " + this.a + ", b = " + this.b + ", c = " + this.a + ", d = " + this.b);
    console.log("Кути: 90°, 90°, 90°, 90°");
    console.log("Сума сторін (периметр): " + (2 * (this.a + this.b)));
    console.log("Площа: " + (this.a * this.b));
  }
}

// 1.2.18 - 1.2.19
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha; // тупий кут
    this.beta = beta;   // гострий кут
  }

  static help() {
    console.log("Rhombus: паралелограм, у якого всі сторони рівні, а протилежні кути попарно рівні.");
  }

  length() {
    console.log("Периметр ромба: " + (4 * this.a));
  }

  square() {
    // Площа S = a^2 * sin(beta)
    var rad = (this.beta * Math.PI) / 180;
    var s = this.a * this.a * Math.sin(rad);
    console.log("Площа ромба: " + s);
  }

  info() {
    var rad = (this.beta * Math.PI) / 180;
    var s = this.a * this.a * Math.sin(rad);
    console.log("Інформація про Rhombus");
    console.log("Сторони: a1 = " + this.a + ", a2 = " + this.a + ", a3 = " + this.a + ", a4 = " + this.a);
    console.log("Кути: " + this.alpha + "°, " + this.beta + "°, " + this.alpha + "°, " + this.beta + "°");
    console.log("Сума сторін (периметр): " + (4 * this.a));
    console.log("Площа: " + s);
  }
}

// 1.2.20 - 1.2.21
class Parallelogram extends Rhombus {
  constructor(a, b, alpha, beta) {
    super(a, alpha, beta);
    this.b = b;
  }

  static help() {
    console.log("Parallelogram: чотирикутник, у якого протилежні сторони попарно паралельні та рівні.");
  }

  length() {
    console.log("Периметр паралелограма: " + (2 * (this.a + this.b)));
  }

  square() {
    // Площа S = a * b * sin(beta)
    var rad = (this.beta * Math.PI) / 180;
    var s = this.a * this.b * Math.sin(rad);
    console.log("Площа паралелограма: " + s);
  }

  info() {
    var rad = (this.beta * Math.PI) / 180;
    var s = this.a * this.b * Math.sin(rad);
    console.log("Інформація про Parallelogram");
    console.log("Сторони: a = " + this.a + ", b = " + this.b + ", c = " + this.a + ", d = " + this.b);
    console.log("Кути: " + this.alpha + "°, " + this.beta + "°, " + this.alpha + "°, " + this.beta + "°");
    console.log("Сума сторін (периметр): " + (2 * (this.a + this.b)));
    console.log("Площа: " + s);
  }
}

// 1.2.23
console.log("Статичні методи help()");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24
var mySquare = new Square(5);
var myRectangle = new Rectangle(6, 10);
var myRhombus = new Rhombus(5, 120, 60);
var myParallelogram = new Parallelogram(6, 8, 135, 45);

mySquare.info();
myRectangle.info();
myRhombus.info();
myParallelogram.info();

// 1.2.25
function Triangular({ a = 3, b = 4, c = 5 } = {}) {
  return { a: a, b: b, c: c };
}

// 1.2.26
console.log("Тест Triangular");
var trDefault = Triangular();
var trCustom1 = Triangular({ a: 6, b: 8, c: 10 });
var trCustom2 = Triangular({ a: 7, b: 24, c: 25 });

console.log(trDefault);
console.log(trCustom1);
console.log(trCustom2);

// 1.2.27
function PiMultiplier(factor) {
  return function() {
    return Math.PI * factor;
  };
}

// 1.2.28
console.log("PiMultiplier");
var mulBy2 = PiMultiplier(2);
var mulByTwoThirds = PiMultiplier(2 / 3);
var divBy2 = PiMultiplier(1 / 2);

console.log("PI * 2 =", mulBy2());
console.log("PI * (2/3) =", mulByTwoThirds());
console.log("PI / 2 =", divBy2());

// 1.2.29
function Painter(color) {
  return function(obj) {
    if (obj && obj.type) {
      console.log("Color: " + color + ", Type: " + obj.type);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}

// 1.2.30
var PaintBlue = Painter("blue");
var PaintRed = Painter("red");
var PaintYellow = Painter("yellow");

// 1.2.31
var object1 = {
  maxSpeed: 280,
  type: "Sportcar",
  color: "magenta"
};

var object2 = {
  type: "Truck",
  "avg speed": 90,
  "load capacity": 2400
};

var object3 = {
  maxSpeed: 180,
  color: "purple",
  isCar: true
};

console.log("Тестування Painter (PaintBlue, PaintRed, PaintYellow)");
console.log("[Object 1]:");
PaintBlue(object1);
PaintRed(object1);
PaintYellow(object1);

console.log("[Object 2]:");
PaintBlue(object2);
PaintRed(object2);
PaintYellow(object2);

console.log("[Object 3]:");
PaintBlue(object3);
PaintRed(object3);
PaintYellow(object3);
