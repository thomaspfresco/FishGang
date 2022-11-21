// ------------------------------------------ Peixe ------------------------------------------
class Peixe {
    img;
    sounds = new Array(3);
    id;
    lastClick;
    x;
    y;
    size;
    sizeAux;
    phase;
    raioPulsar = displayWidth / 6;
    opa = 1;
    instant;
    interval;

    position;
    velocity;
    angle = int(random(1,360));

    margin;

    constructor(id, img, sound1, sound2, sound3, x, y, size, phase) {
        this.id = id;
        this.img = loadImage(img);
        this.x = x;
        this.y = y;
        this.phase = phase;
        this.size = size;
        this.sizeAux = size;
        this.sounds[0] = new Howl({ src: [sound1] });
        this.sounds[1] = new Howl({ src: [sound2] });
        this.sounds[2] = new Howl({ src: [sound3] });
        this.lastClick = -1;

        this.margin = this.size / 2;

        this.position = createVector(int(random(this.margin, windowWidth - this.margin)), int(random(this.margin, windowHeight - this.margin)));

        this.calcVelocity(int(random(1, 5)));

        this.interval = int(random(5001,10001));
    }
    draw() {
        this.instant = millis();

        //pulsar
        if (this.raioPulsar < displayWidth / 6) {
            this.opa = (255 - (255 * this.raioPulsar) / (displayWidth / 6 - displayWidth / 100)) * 2;
            this.raioPulsar += 6;
        }
        noFill();
        stroke(255, 255, 255, this.opa);
        strokeWeight(6);
        circle(this.x, this.y, this.raioPulsar);

        this.move();

        if (this.instant-this.interval >= 0) {
            this.interval = this.interval+int(random(2001,10001));
            this.angle = int(random(1,360));
            this.calcVelocity(int(random(1, 4)));
        }

        this.x = this.position.x;
        this.y = this.position.y;

        if (this.sizeAux > this.size) this.sizeAux -= 2;
        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));
        image(this.img, 0, 0, this.sizeAux, this.sizeAux);
        pop();
        imageMode(CENTER);


        if (boia.opened == false) {
            if (!(mouseX < this.x - this.size / 2 || mouseX > this.x + this.size / 2
                || mouseY < this.y - this.size / 2 || mouseY > this.y + this.size / 2) 
                && dist(displayWidth/2,displayHeight/2,this.x,this.y) > boia.size1
                && mouseIsPressed) {
                mouseIsPressed = false;
                this.playAndRecord();
                this.react();
            }
        }
    }

    react() {
        this.raioPulsar = displayWidth / 15;
        this.sizeAux = this.size * 1.1;
    }

    playAndRecord() {
        this.lastClick = int(random(3));

        this.sounds[this.lastClick].play();
    }

    playSound(index) {
        this.sounds[index].play();
    }

    calcVelocity(exp) {
        this.velocity = p5.Vector.fromAngle(radians(this.angle));
        this.velocity.mult(exp);
    }

    move() {
        var newPos = p5.Vector.add(this.position, this.velocity);
        if (newPos.x > displayWidth - this.margin || newPos.x < 0 + this.margin) {
            this.angle = 180 - this.angle;
            this.calcVelocity(int(random(1, 5)));
        }

        if (newPos.y > displayHeight - this.margin || newPos.y < 0 + this.margin) {
            this.angle = 360 - this.angle;
            this.calcVelocity(int(random(1, 5)));
        }

        /*if(dist(displayWidth/2,displayHeight/2,this.x,this.y) < boia.size1) {
            this.angle = 180-this.angle;
            this.calcVelocity(int(random(1,3)));
        }*/

        this.position.add(this.velocity);
    }
}