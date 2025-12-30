var images = [
    "https://i.pinimg.com/736x/30/4b/bc/304bbc4d777a2f7d04916d285d3b8279.jpg",
    "https://i.pinimg.com/736x/10/02/71/100271b2c1fc6ef34542a0ab3e0c51c4.jpg",
    "https://i.pinimg.com/736x/03/77/8a/03778a39918b93b5011d434d69fb830a.jpg",
    "https://i.pinimg.com/1200x/9d/4f/af/9d4fafdf1d10104ec2680a10c8307460.jpg",
    "https://i.pinimg.com/736x/fe/96/f7/fe96f7b464c10fb73075c49c249ad96f.jpg",
    "https://i.pinimg.com/736x/f7/af/a5/f7afa50f5f622237a8cba14cc8a9471c.jpg",
    "https://i.pinimg.com/736x/a1/57/df/a157df1b25f4cdad37d2b1ad79a53939.jpg",
    "https://i.pinimg.com/736x/59/6b/e3/596be3dffd76f752bb4da52e21f949b6.jpg"
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

function newLevel(){
    // stop timer
    clearInterval(timerInterval);
    timerRunning = false;

    document.getElementById("level").style.visibility = "visible";
}
function nextLevel(){
    window.location.href="levelTwo.html";
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
                
                newLevel()
                
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