const audioSymetricOne = new Audio('./audio/inspire.mp3');
const audioSymetricTwo = new Audio('./audio/expire.mp3');

const audioTriangleOne = new Audio('./audio/hold.mp3');
const audioTriangleTwo = new Audio('./audio/expire.mp3');
const audioTriangleThree = new Audio('./audio/inspire.mp3');

const audioSquareOne = new Audio('./audio/hold.mp3');
const audioSquareTwo = new Audio('./audio/expire.mp3');
const audioSquareThree = new Audio('./audio/hold.mp3');
const audioSquareFour = new Audio('./audio/inspire.mp3');

let instruction = "";

function countdownTimer(remainingTime, breathingType) {
    let remaining = "Terminé";
    if (remainingTime > 0) {
        
        minutes = Math.floor((remainingTime / 60) % 60);
        seconds = Math.floor(remainingTime % 60);
      
        remaining = minutes + ":" + new Intl.NumberFormat("fr", { minimumIntegerDigits: 2 }).format(seconds)

        switch(breathingType){
            case 'SYMETRIC':
                if (remainingTime % 10 === 0){
                    audioSymetricOne.play();
                    instruction = "Inspirez";
                    document.getElementById("visual").classList.add('bigger');
                    document.getElementById("visual").classList.remove('smaller');
                } else if (remainingTime % 5 === 0){
                    audioSymetricTwo.play();
                    instruction = "Expirez";
                    document.getElementById("visual").classList.add('smaller');
                    document.getElementById("visual").classList.remove('bigger');
                }
                break;
            case 'TRIANGLE':
                if (remainingTime % 15 === 0){
                    audioTriangleThree.play();
                    instruction = "Inspirez";
                    document.getElementById("visual").classList.add('bigger');
                    document.getElementById("visual").classList.remove('smaller');
                    document.getElementById("visual").classList.remove('hold');
                } else if (remainingTime % 10 === 0){
                    audioTriangleTwo.play();
                    instruction = "Expirez";
                    document.getElementById("visual").classList.add('smaller');
                    document.getElementById("visual").classList.remove('bigger');
                    document.getElementById("visual").classList.remove('hold');
                } else if (remainingTime % 5 === 0){
                    audioTriangleOne.play();
                    instruction = "Bloquez";
                    document.getElementById("visual").classList.add('hold');
                }
                break;
            case 'SQUARE':
                if (remainingTime % 20 === 0){
                    audioSquareFour.play();
                    instruction = "Inspirez";
                    document.getElementById("visual").classList.add('bigger');
                    document.getElementById("visual").classList.remove('smaller');
                    document.getElementById("visual").classList.remove('hold');
                } else if (remainingTime % 15 === 0){
                    audioSquareThree.play();
                    instruction = "Bloquez";
                    document.getElementById("visual").classList.add('hold');
                } else if (remainingTime % 10 === 0){
                    audioSquareTwo.play();
                    instruction = "Expirez";
                    document.getElementById("visual").classList.add('smaller');
                    document.getElementById("visual").classList.remove('bigger');
                    document.getElementById("visual").classList.remove('hold');
                } else if (remainingTime % 5 === 0){
                    audioSquareOne.play();
                    instruction = "Bloquez";
                    document.getElementById("visual").classList.add('hold');
                }
                break;
        }

    } else {
        document.getElementById("pause").style.visibility = "hidden";
        document.getElementById("play").style.visibility = "hidden";
        document.getElementById("reset").style.visibility = "visible";
        document.getElementById("start").style.visibility = "hidden";
    }
    document.getElementById("countdown").innerHTML = remaining;
    document.getElementById("instruction").innerHTML = instruction;
    document.getElementById("progress").value = remainingTime;
    
    return remainingTime - 1;
}

function countDown() {
    const minutes = document.getElementById("quantity").value;
    const breathingType = document.getElementById("breathingType").value;
    document.getElementById("pause").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("configuration").style.visibility = "hidden";

    let remainingTime = minutes * 60;
    document.getElementById("progress").max = remainingTime;
    remainingTime = countdownTimer(remainingTime, breathingType);
    setInterval(function(){
        if (!isPause){
            remainingTime = countdownTimer(remainingTime, breathingType)
        }
    }, 1000);
}

var isPause = false;

function pause() {
    isPause = true;
    document.getElementById("pause").style.visibility = "hidden";
    document.getElementById("play").style.visibility = "visible";
    document.getElementById("reset").style.visibility = "visible";
}

function play() {
    isPause = false;
    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("pause").style.visibility = "visible";
    document.getElementById("reset").style.visibility = "hidden";
}

function reset() {
    document.location.reload(true);
}