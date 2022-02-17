const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const LIZARD = "lizard";
const SPOCK = "spock";


const TIE = 0;
const WIN = 1;
const LOSE = 2;


const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const lizardBtn = document.getElementById("lizard");
const spockBtn = document.getElementById("spock");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");
const scorePc = document.getElementById("marcadorPc");
const scoreUser = document.getElementById("marcadorUser");

let scorePcCount = 0;
let scoreUserCount = 0;


rockBtn.addEventListener("click", ()=>{
    Play(ROCK);
});

paperBtn.addEventListener("click", ()=>{
    Play(PAPER);
});

scissorsBtn.addEventListener("click", ()=>{
    Play(SCISSORS);
});

lizardBtn.addEventListener("click", ()=>{
    Play(LIZARD);
});

spockBtn.addEventListener("click", ()=>{
    Play(SPOCK);
});


function Play(userOption){
    const machineOption = calcMachineOption();
    const result = calcResult(userOption, machineOption);

    userImg.src = "img/"+userOption+".png";
    machineImg.src = "img/"+machineOption+".png";

    switch(result){

        case TIE:
            resultText.innerHTML =  "Empate";
            break;

        case WIN:
            resultText.innerHTML =  "Jugador Gana";
            scoreUser.innerHTML = ++scoreUserCount;
            break;

        case LOSE:
            resultText.innerHTML =  "PC Gana";
            scorePc.innerHTML = ++scorePcCount;
            break;
    }
}


function calcResult(userOption, machineOption){
    if(userOption === machineOption){
        return TIE;
    }
    
    else if(userOption===ROCK && machineOption===PAPER){
        return LOSE;
    }else if(userOption===ROCK && machineOption===SPOCK){
        return LOSE;
    }else if(userOption===ROCK && machineOption===SCISSORS){
        return WIN;
    }else if(userOption===ROCK && machineOption===LIZARD){
        return WIN;
    }
    
    else if(userOption===PAPER && machineOption===ROCK){
        return WIN;
    }else if(userOption===PAPER && machineOption===SPOCK){
        return WIN;
    }else if(userOption===PAPER && machineOption===SCISSORS){
        return LOSE;
    }else if(userOption===PAPER && machineOption===LIZARD){
        return LOSE;
    }

    else if(userOption===SCISSORS && machineOption===ROCK){
        return LOSE;
    }else if(userOption===SCISSORS && machineOption===SPOCK){
        return LOSE;
    }else if(userOption===SCISSORS && machineOption===PAPER){
        return WIN;
    }else if(userOption===SCISSORS && machineOption===LIZARD){
        return WIN;
    }

    else if(userOption===LIZARD && machineOption===ROCK){
        return LOSE;
    }else if(userOption===LIZARD && machineOption===SPOCK){
        return WIN;
    }else if(userOption===LIZARD && machineOption===SCISSORS){
        return LOSE;
    }else if(userOption===LIZARD && machineOption===PAPER){
        return WIN;
    }

    else if(userOption===SPOCK && machineOption===ROCK){
        return WIN;
    }else if(userOption===SPOCK && machineOption===PAPER){
        return LOSE;
    }else if(userOption===SPOCK && machineOption===SCISSORS){
        return WIN;
    }else if(userOption===SPOCK && machineOption===LIZARD){
        return LOSE;
    }
}


function calcMachineOption(){
    const number = Math.floor(Math.random() * 5);
    switch(number){
        case 0: 
            return ROCK;
        case 1: 
            return PAPER;
        case 2: 
            return SCISSORS;
        case 3: 
            return LIZARD;
        case 4: 
            return SPOCK;
    }
}
