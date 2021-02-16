
var scoreDOM = document.querySelector(".scoreDOM");
var correctDOM = document.querySelector(".correctDOM");
var wrongDOM = document.querySelector(".wrongDOM");
var gameCard = document.querySelector(".gameCard")
var score = 0;
var currentWord = "";
var wrongWordsArr =[];
var rightWordsArr = [];

var questionCount = 0;
var wrongWordCount = 0;
var rightWordCount = 0;
var currentRightWord = ""

var correct=0;
var wrong = 0;

var quizLength=0;
var questCount = 0;




function startGame(){



    let startCard= document.createElement("div");
    startCard.className = 'startCard'
    
    let h2greetingone = document.createElement("h2");
        h2greetingone.className = "h2greetingone"
        h2greetingone.innerHTML = "So"
    
    let h2greetingtwo = document.createElement("h2");
        h2greetingtwo.className = "h2greetingtwo"
        h2greetingtwo.innerHTML = "You think your smaht"

    let h2greetingthree = document.createElement("h2");
        h2greetingthree.className = "h2greetingthree"
        h2greetingthree.innerHTML = "Huh?!"

    let startBtn = document.createElement("button");
        startBtn.className = "startBtn"
        startBtn.innerHTML = "Play"

    startCard.appendChild(h2greetingone);
    startCard.appendChild(h2greetingtwo);
    startCard.appendChild(h2greetingthree);
    startCard.appendChild(startBtn);

    gameCard.appendChild(startCard)


    startBtn.onclick=playGame
}


startGame()





function playGame(){
    gameCard.innerHTML=""


    questionCount = 0;
    wrongWordCount = 0;
    rightWordCount = 0;
    currentRightWord = ""
    questCount = 0;

var correct=0;
var wrong = 0;

    score = 0;
    scoreDOM.innerHTML = score
    correctDOM.innerHTML = correct
    wrongDOM.innerHTML = wrong

    let selectDiv = document.createElement("div");
        selectDiv.className="selectDiv"
    let selectEl = document.createElement("select");
    let labelEl = document.createElement("label");
        labelEl.innerHTML = "Quiz Length"
    let optionHtml="";


    for(let i=0;i<6;i++){
        optionHtml += `<option value=${questCount}>${questCount}</option>`
        questCount+=5
    }

    selectEl.className='questionSelect';
    selectEl.innerHTML = optionHtml;
    selectDiv.appendChild(labelEl);
    selectDiv.appendChild(selectEl)

    let selectWordCard = document.createElement("div");
        selectWordCard.className="selectWordCard"
    let selectWordDiv = document.createElement("div");
        selectWordCard.className="selectWordDiv"

    let arrowEl = document.createElement("h2");
    arrowEl.className='arrowh2';
    arrowEl.innerHTML = " <--"

    let h4error = document.createElement("h4");
    h4error.className='errorh4';
    h4error.innerHTML = "Give us a word you dummy!"

    let h1SelectWord = document.createElement("h1");
        h1SelectWord.className="h1SelectWord";
        h1SelectWord.innerHTML= "Pick a word"
    let h2SelectWord = document.createElement("h2");
        h2SelectWord.className="h2SelectWord";
        h2SelectWord.innerHTML= "Or go random"

    var rowDiv = document.createElement("div");
        rowDiv.className = "chooseWordDiv"
    
    let randomBtn = document.createElement("button");
        randomBtn.className="randomBtn";
        randomBtn.innerHTML= "Random Word"

    let enterBtn = document.createElement("button");
        enterBtn.className="enterBtn";
        enterBtn.innerHTML= "Enter"

    let wordInput = document.createElement("input");
        wordInput.className="wordInput";
        wordInput.setAttribute("placeholder","enter a word...")
        wordInput.setAttribute("type","text")
        wordInput.setAttribute("name","playersword")
        wordInput.setAttribute("id","playersword")
    

        rowDiv.appendChild(wordInput);
        rowDiv.appendChild(randomBtn);
        rowDiv.appendChild(enterBtn);

        selectWordDiv.appendChild(h1SelectWord)
        selectWordDiv.appendChild(h4error);
        selectWordDiv.appendChild(arrowEl);
        selectWordCard.appendChild(selectDiv)
        selectWordDiv.appendChild(h2SelectWord)
        selectWordDiv.appendChild(rowDiv);

        selectWordCard.appendChild(selectWordDiv);

        selectEl.onchange=(e)=>{
            console.log('selectEl fired!',e.target.value)
            quizLength = e.target.value;
        }

        gameCard.appendChild(selectWordCard)


        randomBtn.onclick=()=>{
                     fetchRandomWord();
                   
                                    }  

         enterBtn.onclick=async()=>{
             if(wordInput.value === ""){
                 console.log("no word entered!");
                 flashError()
                 return;
             }
             chooseClientWord();

         }
}





function flashError(){
    document.querySelector(".h4error").style.display='block'

    setTimeout(()=>{
        document.querySelector(".h4error").style.display = 'none'
    })
}





async function fetchRandomWord(){

    let url = `https://random-word-api.herokuapp.com/word?number=10`
    let json = await fetch(`https://random-word-api.herokuapp.com/word?number=10`)
    let data = await json.json();

    // console.log(data)

    currentWord = data[Math.random() * data.length | 0];
    confirmWord()
    return 
}



function chooseClientWord(){
    let word = document.querySelector("#playersword").value;
        currentWord = word;
        document.querySelector("#playersword").value=""

        confirmWord()

        return;
}







function confirmWord(){
    if(!document.querySelector(".h3confirm")){
        var h3Confirm = document.createElement("h3");
            h3Confirm.className = 'h3confirm';
            h3Confirm.innerHTML=`Your word is: <span class='wordSpan'>${currentWord}</span>`
    
        var h3ConfirmTwo = document.createElement("h3");
            h3ConfirmTwo.className = 'h3confirmtwo';
            h3ConfirmTwo.innerHTML =`Play or choose another word`
    
        var confirmBtn = document.createElement("button");
            confirmBtn.className = 'confirmBtn';
            confirmBtn.innerHTML =`Play`
    
            document.querySelector(".selectWordDiv").appendChild(h3Confirm)
            document.querySelector(".selectWordDiv").appendChild(h3ConfirmTwo)
            document.querySelector(".selectWordDiv").appendChild(confirmBtn)
    
            confirmBtn.onclick=()=>{
                if(quizLength === 0){
                    console.log("need to select quiz length!");
                    document.querySelector(".arrowh2").style.display='block';
                    setTimeout(()=>{
                        document.querySelector(".arrowh2").style.display='none'
                    },1500)
                    return;
                }
                beginGame()
            }
    }
    else{
        document.querySelector(".h3confirm").innerHTML = `Your word is: <span class='wordSpan'>${currentWord}</span>`
    }
}





async function beginGame(){
    gameCard.innerHTML = ""
    // console.log(`Word:${word}`)
    gameCard.innerHTML = "Loading..."
     rightWordsArr = await fetchSynonyms();
     wrongWordsArr = await fetchWrongWords();

     rightWordsArr = rightWordsArr.map(w=>w.word);

     rightWordsArr = rightWordsArr.sort(()=>Math.random() > .5)

    console.log(`Synonyms for ${currentWord}`,rightWordsArr)

    createTriviaCard()
     
}





function createTriviaCard(){
    gameCard.innerHTML = ""

    let triviaCard = document.createElement("div");
        triviaCard.className="triviaCard"

    currentRightWord = rightWordsArr[rightWordCount];
    let html = `
    <h4 class='questionh5'>Question:${questionCount}</h4>
    <h2 class='questionh2'>Find the synonym for: <span class='wordSpan'>${currentWord}</span></h2>
    <div class='radioInputDiv'>`

    let correctRandom = Math.random() * 4 | 0;
    for(let i=0;i<4;i++){
        if(correctRandom === i){
            html += `<label class='radioword'>${currentRightWord}</label><input class='radioinput' type='radio' name='radioword' value='${currentRightWord}'>`
        }
        else{
            html += `<label class='radioword'>${wrongWordsArr[wrongWordCount]}</label><input class='radioinput' type='radio' name='radioword' value=${wrongWordsArr[wrongWordCount]}>`
        }
        wrongWordCount++
    }

    html += "</div><button class='radioValBtn'>Click</button>"

    triviaCard.innerHTML = html;

                gameCard.appendChild(triviaCard)
             
                rightWordCount++
                console.log("RightWordCount: " + rightWordCount)
                questionCount++

    document.querySelector(".radioValBtn").onclick=chooseAnswer;
}


function chooseAnswer(){


        var answer = document.querySelector("input[name='radioword']:checked").value;
            console.log("Answer: " + answer);

        if(answer === currentRightWord){
            correct++
            correctDOM.innerHTML = correct;
            gameCard.innerHTML = "CORRECT!"
        }
        else{
            wrong++
            wrongDOM.innerHTML = wrong;
            gameCard.innerHTML = "WRONG!"
        }

    console.log(`quizLength:${quizLength},questionCount:${questionCount}`)
        if(quizLength == questionCount){
            console.log("gameOver condition fired")
            setTimeout(gameOver,1500);
            return;
        }

        setTimeout(createTriviaCard,1000)
}








async function fetchSynonyms(){

    let json = await fetch(`https://api.datamuse.com/words?ml=${currentWord}&max=${quizLength}`)
    let data = await json.json();

    if(!data.length){
        alert("Sorry, we couldnt find any synonyms for that word choice, please choose again")
        let word = prompt("Your word choice?");
        json = await fetch(`https://api.datamuse.com/words?ml=${word}&max=${quizLength}`)
        data = await json.json();

      
    }

    if(data.length < quizLength){
        alert("We could only dig up " + data.length + " words so we shortened the quiz for you! :)");
        quizLength = data.length;
    }

    console.log('SYNONYMS:',data)
    return data;
}



async function fetchWrongWords(){

    let json = await fetch(`https://random-word-api.herokuapp.com/word?number=200`);
    let data = await json.json();

    data = data.filter(d=>d.length !== 1)

        return data;
    
}


function gameOver(){
    console.log("gameOver fired!")
    gameCard.innerHTML = "";

    let gameOverDiv = document.createElement("div");
        gameOverDiv.className="gameOverDiv";

        let html = `<h1 class='gameoverh1'>Well...thats it!</h1>
                    <h3 class='gameoverh3'>You got ${correct} out of ${quizLength} right for a grade of ${(correct/quizLength).toFixed(2).split(".")[1]}%!
                    <h5 class='gameoverh5'>Play again..or not!</h5>
                    <button class='playAgainBtn'>Play</button>`

        gameOverDiv.innerHTML = html;

        gameCard.appendChild(gameOverDiv)


        document.querySelector(".playAgainBtn").onclick=playGame;
}
