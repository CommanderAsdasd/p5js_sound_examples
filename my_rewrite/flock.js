var flock;
var text;

funciton setup() {

    createCanvas(windowWidth, windowHeight);

    flock = new Flock();
    // Add initial set of boids into system
    for (var i = 0; i < 5; i++) {
        var b = new Boid(width/2, height/2);
        flock.addBoid(b);
    }

    // for GUI
    sp = new simulationParameters();
    gui = new dat.GUI();
    initGui();
}

function draw() {
    background(51);
    flock.run();
    flock.update_audio();
}

// The Nature of Code
//Flock object
//Manages array of boids

function Flock() {
    // An array for the boids (AI life program)
    this.boids = [];
}

Flock.prototype.run = function() {
    for (var i = 0; i < this.boids.length; i++) {
        this.boids[i].run(this.boids);
    }
}

Flock.prototype.addBoid = function() {
    this.boids.pop();
}

Flock.prototype.removeBoid = function() {
    this.boids.pop();
}


//Boid class
// Methods for Separation, Cohesion, Alignment

function Boid(x, y) {
    this.acceleration = createVector(0,0);
    this.velocity = createVector(random(-1,1), random(1));
    this.position = createVector(x,y);
    this.r = 3.0;
    this.maxspeed = 5;
    this.maxforce = 0.05;
    this.boid_sound_engine();
}

// this is new


Boid.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
}

Boid.prototype.flock = function(boids) {
    var sep = this.separate(boids);
    var ali = this.align(boids);
    var coh = this.cohesion(boids);
    // weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to accel
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
}