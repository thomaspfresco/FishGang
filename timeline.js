function drawTimeline() {
    noFill();
    strokeCap(SQUARE);
    strokeWeight(thiness*2);
    stroke(0,0,0,100);
    arc(displayWidth/2,displayHeight/2,timelineRaio,timelineRaio,0,2*PI);
    stroke(255,colorBar,colorBar);
    arc(displayWidth/2,displayHeight/2,timelineRaio,timelineRaio,-PI/2,angTimeline);

    if (timelineRaio > displayHeight/5) timelineRaio-=1.5;
    if (colorBar < 255) colorBar+=9;

    //marcar notas
    for (let i = 0; i < nSlots; i++) {
        for (let j = 0; j < nPeixes; j++) {
            if (timeline[i][j] != -1) {
                noFill();
                strokeCap(SQUARE);
                strokeWeight(thiness*2);
                stroke(peixes[j].color[0],peixes[j].color[1],peixes[j].color[2]);
                arc(displayWidth/2,displayHeight/2,timelineRaio,timelineRaio,i*2*PI/nSlots,i*2*PI/nSlots+2*PI/nSlots/2);
                break;
            }
        }
    }
}

function cleanTimeline() {
    for (let i = 0; i < nSlots; i++) {
        for (let j = 0; j < nPeixes; j++) {
            timeline[i][j] = -1;
        }
    }
}