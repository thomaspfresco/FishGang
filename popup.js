function popup() {
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, displayWidth, displayHeight);
    fill(255,255,255);
    rect(displayWidth/4,displayHeight/4,displayWidth-2*displayWidth/4,displayHeight-2*displayHeight/4);

    if ((mouseX < displayWidth/4 || mouseX > displayWidth/4+(displayWidth-2*displayWidth/4) ||
    mouseY < displayWidth/4 || mouseY > displayHeight/4+(displayHeight-2*displayHeight/4)) && mouseIsPressed) {
        popupOpen = false;
    }
}