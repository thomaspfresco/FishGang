var cicleClock = 0; //contador de 4 timestamps do tempo entre ciclos
var interClock = 0; //contador do tempo entre slots
var instant = 0; //instant atual
var loopLength; //em milissegundos
var nSlots = 100; //número de slots possíveis
var activeSlot = nSlots/4*3; //slot atual
var colorBar = 255;
var timeToTravelX, timeToTravelY; //tempo que a barra demora a percorrer os lados do ecrã
var incBarX, incBarY; //incremento em pixeis da barra
var xBar = 0, yBar = 0; //tamanho atual da barra
var invertX = 0, invertY = 0; //auxiliares à construção da barra
var timeline; //array da timeline
var timelineRaio; //raio da timeline
var peixesMar; //array peixes mar
var peixesRio; //array peixes rio
var peixes; //array peixes atual
var nPeixes = 2; //numero de peixes por cenario
var boia; //identifica a boia

var volumeMar = 1;
var volumeRio = 0;

var cenario = 1; //identifica o senario atual
var alphaChange = 0;
var changeAnim = false;

var popupOpen = false;

var thiness;
var thinCoef = 1;
var ambientSoundMar;
var ambientSoundRio;

var angTimeline = 0;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function setup() {

    textFont(loadFont('Fonts/Gilroy-ExtraBold.otf'));
    textSize(displayWidth/50);
    textAlign(CENTER, CENTER);

    frameRate(60); 
    createCanvas(windowWidth, windowHeight);
    background(175, 238, 238);
    noStroke();

    timeToTravelX = (float(displayWidth) / (2 * displayWidth + 2 * displayHeight)) *loopLength;
    timeToTravelY = (float(displayHeight) / (2 * displayWidth + 2 * displayHeight)) *loopLength;
    
    incBarX = displayWidth / ((timeToTravelX * 30) / 1000);
    incBarY = displayHeight / ((timeToTravelY * 30) / 1000);
    
    ambientSoundMar = new Howl({src: ["Sounds/ambient1.mp3"],  autoplay: true, loop: true, volume: 0});
    ambientSoundRio = new Howl({src: ["Sounds/ambient2.mp3"],  autoplay: true, loop: true, volume: 0});
    
    //inicializar timeline -----//-----//-----
    timeline = Array.from(new Array(nSlots), () => new Array(nPeixes));
    for (let i = 0; i < nSlots; i++) {
        for (let j = 0; j < nPeixes; j++) {
            timeline[i][j] = -1;
        }
    } 
    
    //inicializar peixes mar-----//-----//-----
    peixesMar = new Array(nPeixes);
    peixesMar[0] = new Peixe(0,"Images/peixinho1.png","Sounds/p1_1.mp3","Sounds/p1_2.mp3","Sounds/p1_3.mp3",displayWidth / 2,200,displayHeight / 7,(1 / 2) * PI);
    peixesMar[1] = new Peixe(1,"Images/peixinho2.png","Sounds/p2_1.mp3","Sounds/p2_2.mp3","Sounds/p2_3.mp3",displayWidth / 2,displayHeight - 200,displayHeight / 6,(3 / 2) * PI);
    
    //inicializar peixes rio-----//-----//-----
    peixesRio = new Array(nPeixes);
    peixesRio[0] = new Peixe(0,"Images/peixinho3.png","Sounds/p1_1.mp3","Sounds/p1_2.mp3","Sounds/p1_3.mp3",displayWidth / 2,200,displayHeight / 7,(1 / 2) * PI);
    peixesRio[1] = new Peixe(1,"Images/peixinho2.png","Sounds/p2_1.mp3","Sounds/p2_2.mp3","Sounds/p2_3.mp3",displayWidth / 2,displayHeight - 200,displayHeight / 6,(3 / 2) * PI);
    

    //criacao da boia -----//-----//-----
    boia = new Boia("Images/boia.png",displayWidth / 2,displayHeight / 2,displayHeight / 6,displayHeight / 2.2);

    loopLength = boia.tempos[boia.indTempos]*1000;
    timelineRaio = displayHeight/5;
}

function draw() {

    console.log(popupOpen);

    if (cenario == 1) {
        peixes = peixesMar;
        background(175, 238, 238);
    }
    else {
        peixes = peixesRio;
        background(175, 238, 0);
    }

    instant = millis();

    loopLength = boia.tempos[boia.indTempos]*1000;
    
    thiness = (displayHeight / 100) * thinCoef;

     //desenhar peixes
     for (let i = 0; i < nPeixes; i++) {
        peixes[i].draw();
    }
    if (instant - interClock >= loopLength / nSlots) {
        interClock = instant;
        for (let i = 0; i < nPeixes; i++) {
            //tocar o som caso esteja gravado no slot
            if (timeline[activeSlot][i] != -1) {
                peixes[i].playSound(timeline[activeSlot][i]);
                
                peixes[i].react();
            } //gravar o som caso o slot esteja vazio
            else if (peixes[i].lastClick != -1) {
                timeline[activeSlot][i] = peixes[i].lastClick;
                peixes[i].lastClick = -1;
            }
        }
        if (activeSlot < nSlots - 1) {
            activeSlot += 1;
            angTimeline=activeSlot*2*PI/nSlots;
        }
        else {
            cicleClock = instant;
            activeSlot = 0;
            angTimeline = 0;
        }
    }

    boia.draw(); 

    if (changeAnim) {
        if(alphaChange<300) {
            alphaChange+=9;
            if (cenario == 1 && volumeMar >= 0) volumeMar -= 0.05;
            if (cenario == 2 && volumeRio>= 0) volumeRio -= 0.05;
        }
        else {
            cleanTimeline();
            if (cenario == 1) cenario = 2;
            else cenario = 1;
            changeAnim = false;
            boia.opened = false;
            activeSlot = nSlots/4*3;
            ambientSoundMar.stop();
            ambientSoundRio.stop();
            ambientSoundMar.play();
            ambientSoundRio.play();
        }
    }

    if(alphaChange>0 && changeAnim==false) {
        alphaChange -= 9;
        if (cenario == 1 && volumeMar <= 1) volumeMar += 0.05;
        if (cenario == 2 && volumeRio <= 1) volumeRio += 0.05;
    }

    ambientSoundMar.volume(volumeMar);
    ambientSoundRio.volume(volumeRio);

    noStroke();
    fill(0,0,0,alphaChange);
    rect(0,0,displayWidth,displayHeight);

    //popup
    if(popupOpen) popup();
}