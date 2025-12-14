var images = [
    "https://i.pinimg.com/736x/c7/68/36/c768366510e6ce8bbffb066d0b5e440e.jpg",
    "https://i.pinimg.com/736x/87/5a/ff/875aff34ca0a082d85fbab756b0d851c.jpg",
    "https://i.pinimg.com/736x/7d/68/89/7d68892c744be2c0e85991c60a543f45.jpg",
    "https://upload.wikimedia.org/wikipedia/en/0/05/Iliit_-_I%27ll_Like_You.png",
    "https://i.pinimg.com/736x/72/76/12/727612560182975ec59beddd793f8720.jpg",
    "https://i.pinimg.com/1200x/c3/aa/95/c3aa95a43d92b31cb858c4c80bdc37d5.jpg",
    "https://i.pinimg.com/736x/ba/cd/c5/bacdc507276610d185eb949178c5c172.jpg",
    "https://i.pinimg.com/736x/fc/44/f4/fc44f403a98736fb53b2cea2a8a9cec2.jpg",
];


var firstCard = null
var secondCard = null
var canFlip = true
var matches = 0
var moves = 0
var seconds = 0
var timerRunning = false
var timerInterval;


function startGame(){
    var gameBoard = document.getElementById("game-board")
    gameBoard.innerHTML = ""

    var cardImages = images.concat(images)
    cardImages.sort(function () {
        return Math.random() - 0.5

    });

    for (var i = 0; i < cardImages.length; i++) {
        var card = document.createElement("div");
        card.className="card";
        card.innerHTML = `
            <div class="card-front"><i class="fas fa-heart"></i></div>
            <div class="card-back"><img src="${cardImages[i]}" alt="" /></div>
        `
        card.onclick = flipCard;
        card.dataset.image=cardImages[i]
        gameBoard.appendChild(card)


    }
    firstCard=null;
    secondCard=null;
    canFlip=true;
    matches=0;
    moves=0;
    seconds=0;
    timerRunning=false;

    updateStats();
    clearInterval(timerInterval)

}

function flipCard(){
    if(!canFlip) return
    if(this.classList.contains("flipped")) return
    if(this.classList.contains("matched")) return

    if(!timerRunning){
        startTimer()
    }

    this.classList.add("flipped")

    if(firstCard==null){
        firstCard=this
    } else{
        secondCard=this;
        canFlip=false;
        moves++;
        updateStats();
        checkMatch();

    }
}
function checkMatch(){
    var match=firstCard.dataset.image == secondCard.dataset.image;
    if (match){
        setTimeout(()=>{
            firstCard.classList.add("matched")
            secondCard.classList.add("matched")
            matches++;
            updateStats()
            resetCards()
            if(matches===8){
                endGame()
            }
        }, 500);
    }else{
        setTimeout(()=>{
            firstCard.classList.remove("flipped")
            secondCard.classList.remove("flipped")
            resetCards()
        },1000);
    }
}

startGame()

function resetCards(){
    firstCard=null
    secondCard=null
    canFlip=true
}

function startTimer(){

}


