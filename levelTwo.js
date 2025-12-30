var images = [
    "https://i.pinimg.com/736x/cf/9b/e1/cf9be14fa4b90d5be8c2a65acddc9299.jpg",
    "https://i.pinimg.com/1200x/2f/f6/67/2ff66716b07c1411d16b987783687044.jpg",
    "https://i.pinimg.com/736x/9f/ab/82/9fab82cebdb566802bb1a98103becbbe.jpg",
    "https://i.pinimg.com/1200x/19/f0/c3/19f0c365c9eca7675e1d8fe59e7283d5.jpg",
    "https://i.pinimg.com/736x/56/eb/cd/56ebcddc802e0b06651bf362f281295c.jpg",
    "https://i.pinimg.com/1200x/f5/6e/d4/f56ed41462cf5395f62913b30ff956aa.jpg",
    "https://i.pinimg.com/736x/80/35/56/803556152ad39358c5d32cb5c2d44209.jpg",
    "https://i.pinimg.com/736x/0d/69/f7/0d69f7d10dbbb12055bcc15bc2e3a145.jpg"
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
    // the HTML uses id="gameBoard" on the container, make sure we match it
    var gameBoard = document.getElementById("gameBoard")
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

// update the visible stats: Moves, Time, Matches
function updateStats(){
    // the HTML has three .stat-value elements in order: Moves, Time, Matches
    var statEls = document.querySelectorAll('.stat .stat-value');
    if(statEls.length >= 3){
        statEls[0].textContent = moves;
        statEls[1].textContent = formatTime(seconds);
        statEls[2].textContent = matches + '/8';
    }
    var finalMoves = document.getElementById('finalMoves');
    var finalTime = document.getElementById('finalTime');
    if(finalMoves) finalMoves.textContent = moves;
    if(finalTime) finalTime.textContent = formatTime(seconds);
}

function formatTime(totalSeconds){
    var mins = Math.floor(totalSeconds/60);
    var secs = totalSeconds % 60;
    return mins + ':' + (secs < 10 ? '0' + secs : secs);
}

function startTimer(){
    if(timerRunning) return;
    timerRunning = true;
    timerInterval = setInterval(()=>{
        seconds++;
        updateStats();
    },1000);
}

function endGame(){
    // stop timer
    clearInterval(timerInterval);
    timerRunning = false;

    // show modal-like summary; the HTML contains .modal-content
    var modal = document.querySelector('.modal-content');
    if(modal){
        modal.classList.add('show');
    }
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

// expose a global newGame() so the button in HTML works
window.newGame = startGame;

function resetCards(){
    firstCard=null
    secondCard=null
    canFlip=true
}

function startTimer(){

}
