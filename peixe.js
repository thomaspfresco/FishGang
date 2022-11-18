// ------------------------------------------ Peixe ------------------------------------------
class Peixe {
    img;
    sounds = new Array(3);
    id;
    lastClick;
    x;
    y;
    size;
    reactSize;
    phase;
    constructor(id, img, sound1, sound2, sound3, x, y, size, phase) {
        this.id = id;
        this.img = loadImage(img);
        this.x = x;
        this.y = y;
        this.phase = phase;
        this.size = size;
        this.reactSize = size;
        this.sounds[0] = new Howl({src: [sound1]});
        this.sounds[1] = new Howl({src: [sound2]});
        this.sounds[2] = new Howl({src: [sound3]});
        this.lastClick = -1;
    }
    draw() {
        this.phase += 0.01;
        this.x = displayWidth / 2 + 500 * sin(this.phase);
        if (this.reactSize > this.size) {
            this.reactSize -= 2;
            image(this.img, this.x, this.y, this.reactSize, this.reactSize);
            imageMode(CENTER);
        } else {
            image(this.img, this.x, this.y, this.size, this.size);
            imageMode(CENTER);
        }
        if (
            !(
                mouseX < this.x - this.size / 2 ||
                mouseX > this.x + this.size / 2 ||
                mouseY < this.y - this.size / 2 ||
                mouseY > this.y + this.size / 2
            ) &&
            mouseIsPressed
        ) {
            mouseIsPressed = false;
            this.playAndRecord();
            this.react();
        }
    }
    react() {
        this.reactSize = this.size * 1.1;
    }
    playAndRecord() {
        this.lastClick = int(random(3));

        this.sounds[this.lastClick].play();
    }
    playSound(index) {
        this.sounds[index].play();
    }
  }