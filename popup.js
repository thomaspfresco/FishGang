function popup() {
    fill(0, 0, 0, 200);
    noStroke();
    rect(0, 0, displayWidth, displayHeight);
    fill(255,255,255,75);
    rect(displayWidth/4,displayHeight/2.65,displayWidth-2*displayWidth/4,displayHeight-2*displayHeight/2.65,5,5,5,5);

    fill(255,255,255);
    textFont(bold);
    textSize(displayWidth/50);
    textAlign(RIGHT, CENTER);
    text("Guarda a tua música", displayWidth-2*displayWidth/4-displayHeight / 40*2,displayHeight / 2-(displayHeight / 17));

    //botao
    stroke(255,255,255);
    strokeWeight(2);
    noFill();
    //fill(0,0,0);
    rect(displayWidth/4+displayWidth-2*displayWidth/4-displayHeight / 40-displayWidth / 15,
    displayHeight / 2+displayHeight / 40*2,
    displayWidth / 15,displayHeight / 20,5,5,5,5);

    noStroke();
    fill(255,255,255);
    textFont(bold);
    textSize(displayWidth/65);
    textAlign(LEFT, CENTER);
    text("Enviar", displayWidth/4+displayWidth-2*displayWidth/4-displayHeight / 40-displayWidth / 15+displayHeight / 40/1.4,
    displayHeight / 2+displayHeight / 40*2.85);

    noStroke();
    fill(255,255,255);
    textFont("arial");
    textSize(displayWidth/65);
    textAlign(LEFT, CENTER);
    text("x", displayWidth/4,
    displayHeight/4);

    document.getElementById("email").style.display = "block";

    if ((mouseX < displayWidth/4 || mouseX > displayWidth/4+(displayWidth-2*displayWidth/4) ||
    mouseY < displayHeight/4 || mouseY > displayHeight/4+(displayHeight-2*displayHeight/4)) && mouseIsPressed) {
        document.getElementById("email").style.display = "none";
        popupOpen = false;
    }
}