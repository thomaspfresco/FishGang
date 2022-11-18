// ------------------------------------------ Boia ------------------------------------------
class Boia {
    imgBoia;
    imgButtons;
    x;
    y;
    size1;
    size2;
    reactSize;
    ang = 1;
    opa1 = 1;
    opa2 = 0;
    raioPulsar = 0;
    opened = false;
    sound = new Howl({src: ["bubble.mp3"]});
    delete = new Howl({src: ["bubbleDelete.mp3"]});
    constructor(imgBoia, imgButtons, x, y, size1, size2) {
        this.imgBoia = loadImage(imgBoia);
        this.imgButtons = loadImage(imgButtons);
        this.x = x;
        this.y = y;
        this.size1 = size1;
        this.size2 = size2;
    }
    draw() {
        //menu
        if (this.opened) {
            if (this.opa2 < 255) this.opa2++;
            push();
            translate(this.x, this.y);
            rotate(radians((PI / 2.0) * this.ang));
            image(this.imgButtons, 0, 0, this.size2, this.size2);
            imageMode(CENTER);
            translate(-this.x, -this.y);
            pop();
            if (
                mouseX < this.x + this.size2 / 2 &&
                mouseX > this.x - this.size2 / 2 &&
                mouseY < this.y + this.size2 / 2 &&
                mouseY > this.y - this.size2 / 2 &&
                mouseIsPressed
            ) {
                if (
                    mouseX < this.x - this.size1 / 2 ||
                    mouseX > this.x + this.size1 / 2 ||
                    mouseY < this.y - this.size1 / 2 ||
                    mouseY > this.y + this.size1 / 2
                ) {
                    //this.delete.amp(1);
                    this.delete.play();
                    cleanTimeline();
                    colorBar = 0;
                    thinCoef = 2;
                    mouseIsPressed = false;
                }
            }
        }
        if (
            !(
                mouseX < this.x - this.size1 / 2 ||
                mouseX > this.x + this.size1 / 2 ||
                mouseY < this.y - this.size1 / 2 ||
                mouseY > this.y + this.size1 / 2
            ) &&
            mouseIsPressed
        ) {
            this.react();
            //this.sound.amp(1);
            this.sound.play();
            mouseIsPressed = false;
            this.opened = !this.opened;
        }
        if (this.opa2 > 0) this.opa2--; //boia
        push();
        translate(this.x, this.y);
        rotate(radians((PI / 2.0) * this.ang));
        if (this.reactSize > this.size1) {
            this.reactSize -= 2;
            image(this.imgBoia, 0, 0, this.reactSize, this.reactSize);
        } else image(this.imgBoia, 0, 0, this.size1, this.size1);
        imageMode(CENTER);
        translate(-this.x, -this.y);
        pop(); //pulso
        this.ang += 0.2;
        if (this.raioPulsar < 50) {
            this.opa1 = (255 - (255 * this.raioPulsar) / 50) * 2;
            this.raioPulsar += 2;
        } else this.raioPulsar = 0;
        noFill();
        stroke(255, 255, 255, this.opa1);
        strokeWeight(6);
        circle(this.x, this.y, this.raioPulsar);
    }
    react() {
        this.reactSize = this.size1 * 1.1;
    }
  }