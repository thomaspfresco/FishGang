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
    raioPulsar;
    opa = 0;
    instant;
    interval;
    color;

    cenario;

    position;
    velocity;
    angle = int(random(1,360));

    margin;

    constructor(img, sound1, sound2, sound3, size,color,cenario) {
        this.img = loadImage(img);
        this.size = size;
        this.sizeAux = size;
        this.sounds[0] = new Howl({ src: [sound1], volume: 0.7});
        this.sounds[1] = new Howl({ src: [sound2], volume: 0.7});
        this.sounds[2] = new Howl({ src: [sound3], volume: 0.7});
        this.lastClick = -1;
        this.color = color;

        this.cenario = cenario;

        this.raioPulsar = this.size*2;

        this.margin = this.size / 2;

        this.position = createVector(int(random(this.margin, windowWidth - this.margin)), int(random(this.margin, windowHeight - this.margin)));

        this.calcVelocity(random(0.1, 1.5));

        this.interval = int(random(5001,10001));
    }

    draw() {
        this.instant = millis();

        //pulsar
        if (this.raioPulsar < this.size*2) {
            this.opa = (255 - (255 * this.raioPulsar) / (this.size*2 - displayWidth / 100)) * 2;
            this.raioPulsar += 6;
        }
        noFill();
        stroke(255, 255, 255, this.opa);
        strokeWeight(6);
        circle(this.x, this.y, this.raioPulsar);

        this.move();

        //comportament aleatorio
        if (this.instant-this.interval >= 0) {
            this.interval = this.interval+int(random(1001,8001));
            this.angle = int(random(1,360));
            this.calcVelocity(random(1, 1.5));
        }

        this.x = this.position.x;
        this.y = this.position.y;

        if (this.sizeAux > this.size) this.sizeAux -= 2;

        if((this.cenario == "mar" && cenario == 1) || (this.cenario == "rio" && cenario == 2)) {
        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));
        image(this.img, 0, 0, this.sizeAux, this.sizeAux);
        pop();
        imageMode(CENTER);
        }


        if ((boia.opened == false && popupOpen == false)) {
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
        this.raioPulsar = this.size/1.5;
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
            this.calcVelocity(random(0.1, 1.5));
        }

        if (newPos.y > displayHeight - this.margin || newPos.y < 0 + this.margin) {
            this.angle = 360 - this.angle;
            this.calcVelocity(random(0.1, 1.5));
        }

        //console.log(random(0, 3));

        /*for (let i = 0; i<nPeixes; i++) {
            if((dist(peixes[i].x,peixes[i].y,this.x,this.y) < peixes[i].size/2
            || dist(peixes[i].x,peixes[i].y,this.x,this.y) < this.size/2) 
            && this.x!=peixes[i].x && this.y!=peixes[i].y){
                this.angle = 180-this.angle;
                peixes[i].angle = this.angle;
                this.calcVelocity(int(random(1,4)));
            }
        }*/
    

        /*if(dist(displayWidth/2,displayHeight/2,this.x,this.y) < boia.size1) {
            this.angle = 180-this.angle;
            this.calcVelocity(int(random(1,3)));
        }*/

        this.position.add(this.velocity);
    }
}