$(document).ready(function () {


    //screen.lockOrientation("portrait");
    //screen.msLockOrientation("portrait");
    //screen.orientation.lock("portrait");
    //StartTheGame();
    isMobile = /Mobi|Android/i.test(navigator.userAgent);
    paintTheField();
});

var isMobile = false;

function StartTheGame() {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight - 34;
    borderWidth = ((wWidth - blockWidth * 2) % blockWidth) + blockWidth * 2;
    //console.log(screen.orientation.type);
    if ((screen.orientation.type === "portrait-secondary" || screen.orientation.type === "portrait-primary") && isMobile) {


        borderHeight = ((wHeight - blockWidth * 2) % blockWidth) + blockWidth * 4;
    } else if ((screen.orientation.type === "landscape-secondary" || screen.orientation.type === "landscape-primary") && isMobile) {
        borderHeight = ((wHeight - blockWidth * 2) % blockWidth) + blockWidth * 1;
    } else if (!isMobile) {
        borderHeight = ((wHeight - blockWidth * 2) % blockWidth) + blockWidth * 6;

    }
    //console.log(window);
    //console.log(wHeight);
    //console.log(borderHeight);
    //console.log(screen.orientation.type);
    countRows = (wWidth - borderWidth) / blockWidth - 1;
    countCols = (wHeight - borderHeight) / blockWidth - 1;
    for (var i = 0; i < countCols; i++) {
        playMatrix[i] = [];
        //playMatrix[i][0] = "wall";
        //playMatrix[i][countRows] = "wall";
        for (var j = 0; j < countRows; j++) {
            playMatrix[i][j] = "";
            //playMatrix[0][i] = "wall";
            //playMatrix[countCols][i] = "wall";
            if (i == 0 || i == countCols - 1) {
                playMatrix[i][j] = "wall";
            }
            if (j == 0 || j == countRows - 1) {
                playMatrix[i][j] = "wall";
            }
        }
    }
    if (!isPaused) {
        setFood();
    }
    //playMatrix[4][10] = 'food';
    if (isStarted) {
        return;
    }
    Tick(function () {
        ////console.log('1');
        if (isDead) {
            return;
        }
        return;
    });

}
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var wWidth;
var wHeight;
var borderWidth;
var borderHeight;
var countRows; //
var countCols;
var playMatrix = [];
var amountOfTouches = 0;
var scaling = false;
window.addEventListener('touchstart', function (evt) {
    //evt.preventDefault();
    //console.log(evt);
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
    //console.log("tap tap tap");
    //console.log(evt.touches.length);
    //console.log(direction);
    if (evt.touches.length == 2) {
        X1 = evt.touches[0].clientX;
        X2 = evt.touches[1].clientX;
        Y1 = evt.touches[0].clientY;
        Y2 = evt.touches[1].clientY;
        ////console.log('X1 = ' + X1);
        ////console.log('Y1 = ' + Y1);
        scaling = true;
        amountOfTouches = 2;
        // //console.log('X2 = ' + X2);
        // //console.log('Y2 = ' + Y2);

    } else {
        scaling = false;
    }
});
//document.addEventListener('deviceready', this.onDeviceReady, false);
//document.addEventListener(, true); 
var prevDirection = 'right';
var X1;
var X2;
var Y1;
var Y2;
var X1End = 0;
var Y1End = 0;
var Y2End = 0;
var X2End = 0;
var scoreArr = [];
function GetCookies() {
    scoreArr = Cookies.getJSON('score');
    if (typeof scoreArr === 'undefined') {
        scoreArr = [];
        //console.log("no cookies for you");
        return;
    }
    //console.log("COOOOOOOOOOOKIEEEEEEES");
    //console.log(scoreArr);
}

function SetCookie() {
    //console.log(scoreArr);

    Cookies.set('score', scoreArr);
    //console.log("checking cookies");
    //console.log(Cookies.get('score'));
}

window.addEventListener('touchend', function (evt) {
    //evt.preventDefault();
    //if(evt.originalEvent.touches.length==2){
    //if(X1<evt.touches[0].clientX && X2 > evt.touches[1].clientX){
    ////console.log('touchend X1 = ');
    ////console.log(evt);
    /*//console.log('Y1 = ' + evt.touches[0].clientY);
    //console.log('X2 = ' + evt.touches[1].clientX);
    //console.log('Y2 = ' + evt.touches[1].clientY);
    */
    //}
    //}
    ////console.log(amountOfTouches);
    if (scaling) {
        //var dist = Math.hypot(
        //evt.touches[0].pageX - evt.touches[1].pageX,
        //evt.touches[0].pageY - evt.touches[1].pageY);
        ////console.log(dist);
        //scaling = false;
        //amountOfTouches--;
        if (X1End === 0 && Y1End === 0) {
            X1End = evt.touches[0].pageX;
            Y1End = evt.touches[0].pageY;
        } else {

            X2End = evt.touches[0].pageX;
            Y2End = evt.touches[0].pageY;
            getScale();
            paintTheField();
        }
    }
});

function getScale() {
    var dist1 = Math.hypot(X1 - X2, Y1 - Y2);

    var dist2 = Math.hypot(X1End - X2End, Y1End - Y2End);

    if (!isStarted) {
        if (dist1 > dist2) {
            difficulty -= 0.25;
            if (difficulty <= 0.25) {
                difficulty = 0.25;
            }
        } else if (dist2 > dist1) {
            difficulty += 0.25;
            if (difficulty >= 5) {
                difficulty = 5;
            }
        }
        ////console.log('dist');
        ////console.log(dist1 + ' ' + dist2);

        dist1 = 0;
        dist2 = 0;
    }
};
window.addEventListener('touchmove', function (evt) {
    //console.log("Move move move")
    if (!xDown || !yDown || isPaused) {
        return;
    }
    ////console.log("touchmove");
    ////console.log(evt);
    /*if(evt.originalEvent.touches.length==2){
        var X1 = evt.touches[0].clientX;
        var X2 = evt.touches[1].clientX;
        var Y1 = evt.touches[0].clientY;
        var Y2 = evt.touches[1].clientY;
        var xDiff2fing = xDown - X2;
        var yDiff2fing = yDown - Y2;
        if(xDiff2fing <= 0 && yDiff2fing <= 0){

        }

    }*/

    //evt.preventDefault();
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    prevDirection = direction;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (direction == "up" || direction == "down") {
            if (xDiff > 0) {
                /* left swipe */
                direction = "left";
            } else {
                /* right swipe */
                direction = "right";
            }
            ////console.log("cols: " +countCols);
        }
    } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
        if (direction == "left" || direction == "right") {

            if (yDiff > 0) {
                /* up swipe */
                direction = "up";
            } else {
                /* down swipe */
                direction = "down";
            }
            ////console.log("rows: " +countRows); 
        }
    } else {
        if (yDiff > 0 && xDiff > 0) {
            //swipe left-up
            if (direction == "up" || direction == "down") {
                direction = "left";
            } else {
                direction = "up";
            }
        } else if (xDiff > 0 && yDiff < 0) {
            if (direction == "up" || direction == "down") {
                direction = "left";
            } else {
                direction = "up";
            }
            //swipe left-down
        } else if (xDiff < 0 && yDiff > 0) {
            if (direction == "up" || direction == "down") {
                direction = "right";
            } else {
                direction = "down";
            }
            //swipe right-up
        } else if (xDiff < 0 && yDiff < 0) {
            if (direction == "up" || direction == "down") {
                direction = "right";
            } else {
                direction = "down";
            }
            //swipe right-down
        }
    }
    /* reset values */
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    ////console.log(playMatrix);
    ////console.log(direction);

    //paintTheField();
    //if (evt.originalEvent.touches.length === 2 && !isStarted) {
    //    difficulty += 0.25;
    //    //console.log(difficulty);
    //    paintTheField();
    //}
    xDown = null;
    yDown = null;

});


var tableEl = document.getElementById('screen');
var scoreEl = document.getElementById('score');
var highscoresEl = document.getElementById('highscores');
var xDown = null;
var yDown = null;
var direction = "right";
var blockWidth = 20; //width = height
var snakeArray = ['4,6', '4,5', '4,4'];
var score = 0;

function resetHighscores() {
    console.log("no more cookies for you");

    Cookies.remove('score');
    scoreArr = [];
    paintTheField();
};

function paintTheField() {
    if (isPaused) {
        return;
    }
    if (tableEl.hasChildNodes()) {
        tableEl.innerHTML = '';

    }
    var htmlString = '';
    var htmlString2 = '';
    if (!isStarted && !isDead) {
        if (isMobile) {
            htmlString = '<div>Start the game with a tap on the button</br>\'zoom\' out to lower the difficulty, \'zoom\' in to raise the difficulty</br>min difficulty = 0.25, max difficulty = 5.0</br> swipe in the direction you want to go</br> NO RETURNS</div>'
        } else {
            htmlString = '<div>Start the game with a click on the button</br>Use the arrows up and down to increase or decrease the difficulty</br>You can use spacebar or enter to start/pause the game</br>min difficulty = 0.25, max difficulty = 10.0</br> use the arrows in the direction you want to go</br> NO RETURNS</div>'
        }
    } else {
        ////console.log('is started' + isStarted);
        if (isDead) {
            htmlString = '<div>You\'re <strong>dead</strong>, you can restart with a tap on the button</div>';
            isStarted = false;
            $(highscoresEl).attr('style', 'display:table;');
        } else {
            paintSnake();
            $(highscoresEl).attr('style', 'display:none;');

            for (var i = 0; i < countCols; i++) {
                htmlString += '<tr>';
                for (var j = 0; j < countRows; j++) {
                    htmlString += '<td  style="left:' + blockWidth + 'px; top:' + blockWidth + 'px;width:' + blockWidth + 'px;height:' + blockWidth + 'px;"';
                    switch (playMatrix[i][j]) {
                        case 'wall':
                            htmlString += 'class ="wall"';
                            break;
                        case 'food':
                            htmlString += 'class = "food"';
                            break;
                        case 'snakefood':
                            htmlString += 'class ="snakefood"';
                            break;
                        case 'snake':
                            htmlString += 'class = "snake"';
                            break;
                        case 'snakehead':
                            htmlString += 'class = "snakehead"';
                            break;
                        default:

                            break;
                    };
                    htmlString += '></td>';
                };
                htmlString += '</tr>';
            };
        }
        ////console.log(htmlString);
    }
    GetCookies();
    if (scoreArr.length > 0) {
        htmlString2 += '</table></br></br><table style="border-collapse:collapse;"><tr><th  style="text-align: left;" width="33%;">Highscores</th><th  style="text-align: left;" width="33%;">Difficulty</th><th  style="text-align: left;" >Last achieved</th></tr>';
        scoreArr.forEach(function (item, index) {
            var temp = ++index;
            //console.log(item.score);
            if (item.score === score && item.difficulty === difficultyTemp) {
                htmlString2 += '<tr style="border-bottom:1pt solid black; background-color:black; color: white;"><td>' + temp + '.' + item.score + '</td><td>' + item.difficulty + '</td><td>' + item.time + '</td></tr>';

            } else {
                htmlString2 += '<tr style="border-bottom:1pt solid black;"><td>' + temp + '.' + item.score + '</td><td>' + item.difficulty + '</td><td>' + item.time + '</td></tr>';

            }
        });
        htmlString2 += '</table><input type="button" id="resetHighscores" value="Reset the highscores"/>'

    }

    tableEl.innerHTML = htmlString;
    highscoresEl.innerHTML = htmlString2;
    scoreEl.innerHTML = 'Your score is: ' + score + '</br> The difficulty is: ' + difficulty.toFixed(2);
    $('input[id="resetHighscores"]').on('click', resetHighscores);

};

window.addEventListener('keydown', function (evt) {
    var prevDirectionTemp = prevDirection;
    prevDirection = direction;
    //console.log(evt.key);
    switch (evt.key) {
        case "ArrowUp":
            if (direction !== 'down') {
                direction = 'up';
            }
            if (!isStarted && !isPaused) {
                difficulty += 0.25;
                if (difficulty >= 10) {
                    difficulty = 10;

                }
                paintTheField();
            }
            break;
        case "ArrowDown":
            if (direction !== 'up') {
                direction = 'down';
            }
            if (!isStarted && !isPaused) {
                difficulty -= 0.25;
                if (difficulty <= 0.25) {
                    difficulty = 0.25;

                }
                paintTheField();
            }
            break;
        case "ArrowLeft":
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case "ArrowRight":
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case "Enter":
        case " ":
            buttonClick();
        default:
            prevDirection = prevDirectionTemp;
            return;
            break;
    }
    if (isPaused) {
        direction = prevDirection;
        prevDirection = prevDirectionTemp;
    }
});

var isPaused = false;
$('#btnStart').on('click', buttonClick);
function buttonClick() {
    $('#btnStart').blur();
    //console.log("is started: " + isStarted);
    ////console.log(direction);
    ////console.log("is dead " + isDead);
    if (!isStarted) {
        screen.orientation.lock(screen.orientation.type);
        StartTheGame();
        //console.clear(); 
        if (!isPaused) {
            direction = 'right';

        }
        isPaused = false;
        isStarted = true;

        $('#btnStart').val('Pause');
        if (isDead) {

            isDead = false;
            snakeArray = ['4,6', '4,5', '4,4'];
            //food = '4,10';
            prevFoodArr = [];
            setFood();
            score = 0;
            direction = 'right';
            //return;
        }

        Tick(function () {
            return;
        });

    } else {

        isPaused = true;
        isStarted = false;
        $('#btnStart').val('Start');
    }
};

function setDirectionMove(direc) {
    switch (direc) {
        case 'left':
            directionMove = '0,-1';
            break;
        case 'right':
            directionMove = '0,1';
            break;
        case 'up':
            directionMove = '-1,0';
            break;
        case 'down':
            directionMove = '1,0';
            break;

        default:
            break;
    };

}
var difficulty = 3.0;
var directionMove = '0,0';

function moveSnake() {
    if (isDead) {
        return;
    }
    setDirectionMove(direction);
    ////console.log(directionMove);
    ////console.log('first snake is ' + snakeArray.toString());
    var prevPos = '';
    var secondPos = snakeArray[1];
    /*if(getFirstPos(snakeArray[0]) == getFirstPos(secondPos)){
        if(getSecondPos(directionMove) != 0){
            direction = prevDirection;
            setDirectionMove();
        }
    }/*else if(getSecondPos(snakeArray[0]) == getSecondPos(secondPos)){
        if(getFirstPos(directionMove) != 0){
            direction = prevDirection;
            setDirectionMove();
        }
    }*/

    for (var i = snakeArray.length - 1; i > 0; i--) {
        prevPos = snakeArray[i];
        snakeArray[i] = snakeArray[i - 1];
        ////console.log(prevPos);
    }
    prevPos = snakeArray[0];
    snakeArray[0] = addPositon(snakeArray[0], directionMove, secondPos);

    if (snakeArray[0] == secondPos) {
        setDirectionMove(prevDirection);
        snakeArray[0] = addPositon(prevPos, directionMove, secondPos);

    }
    ////console.log('snake is ' + snakeArray.toString());
    EatMe();
}
function getFirstPos(Pos) {
    return parseInt(Pos.split(',')[0]);
}
function getSecondPos(Pos) {
    return parseInt(Pos.split(',')[1]);
}
function addPositon(origPos, speed, secondPos) {
    var origX = getFirstPos(origPos);
    var orgiY = getSecondPos(origPos);
    var speedX = getFirstPos(speed);
    var speedY = getSecondPos(speed);
    origX += speedX;
    orgiY += speedY;

    ////console.log("OrigPos " + origX);

    return origX + ',' + orgiY;
}
var counterEmptyCells = 0;
function reDoMatrix() {
    /*if(counter < snakeArray.length){
        if(playMatrix[X][Y] != "wall"){
            playMatrix[X][Y] = "snake";
        }
        counter++;
        reDoMatrix()
    }*/
    var Xfood = getFirstPos(food);
    var Yfood = getSecondPos(food);
    playMatrix[Xfood][Yfood] = 'food';

    counterEmptyCells = (countCols - 2) * (countRows - 2);
    for (var i = 0; i < countCols; i++) {
        for (var j = 0; j < countRows; j++) {
            if (playMatrix[i][j] != "wall" && playMatrix[i][j] != 'food') {
                playMatrix[i][j] = '';
                for (var k = 0; k < snakeArray.length; k++) {
                    var X = getFirstPos(snakeArray[k]);
                    var Y = getSecondPos(snakeArray[k]);
                    if (X === Xfood && Y === Yfood) {
                        playMatrix[Xfood][Yfood] = 'snake';
                        setFood();
                        Xfood = getFirstPos(food);
                        Yfood = getSecondPos(food);
                        playMatrix[Xfood][Yfood] = 'food';

                    }
                    /* check the cell from playMatrix with every piece in snkakeArray */
                    if (X == i && Y == j) {
                        counterEmptyCells--;
                        playMatrix[i][j] = 'snake';
                        for (var l = 0; l < prevFoodArr.length; l++) {
                            var XfoodPrev = getFirstPos(prevFoodArr[l]);
                            var YfoodPrev = getSecondPos(prevFoodArr[l]);

                            if (i == XfoodPrev && j == YfoodPrev) {
                                playMatrix[i][j] = 'snakefood';
                                if (k == snakeArray.length - 1) {
                                    //prevFoodArr[l] = '0,0';
                                    prevFoodArr.splice(l, 1);
                                }
                            }
                        }
                        if (k === 0) {
                            playMatrix[i][j] = 'snakehead';
                        }

                    }
                }
            }
        }
    }
}

var difficultyTemp;

function Dead() {
    var isNewHighscore = true;
    isDead = true;
    screen.orientation.unlock();
    $('#btnStart').val('Start');
    if (score === 0) {
        return;
    }
    var arrLength = scoreArr.length;
    scoreArr.forEach(function (item, index) {
        if (item.score === score && item.difficulty >= difficulty) {
            scoreArr.splice(index, 1);
            arrLength--;
        } else if (item.score === score && item.difficulty < difficulty) {
            isNewHighscore = false;
        }
    });
    difficultyTemp = difficulty;

    if (!isNewHighscore) {
        return;
    }
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    var datenow = new Date().toLocaleDateString() + ' ' + hour + ':' + minute;
    scoreArr[arrLength] = { score: score, time: datenow, difficulty: difficulty };
    scoreArr.sort(function (a, b) { return b.score - a.score; });
    if (scoreArr.length > 10) {
        scoreArr.splice(10);
    }
    SetCookie();

}

function EatMe() {
    for (var i = 1; i < snakeArray.length; i++) {


        if (snakeArray[0] == snakeArray[i]) {
            Dead();
        }
    }
}
function paintSnake() {
    for (var i = 0; i < snakeArray.length; i++) {
        var X = getFirstPos(snakeArray[i]);
        var Y = getSecondPos(snakeArray[i]);
        ////console.log('X = '+ X + 'Y=' +Y);

        if (playMatrix[X][Y] != "wall") {
            //playMatrix[X][Y] = 'snake';
        } else {
            Dead();

            ////console.log("I be deeth");
        }
    }
}
var isDead = false;
var isStarted = false;
var secondsNow = 0;
function Tick(callback) {
    // var hour = new Date().getHours();
    // var minutes = new Date().getMinutes();
    // var seconds = new Date().getSeconds();
    // var ms = new Date().getMilliseconds();
    ////console.log(hour + ':' + minutes + ':' + seconds + ':' + ms);
    if (isDead) {
        ////console.log("Ya deeth man");
        return;
    }
    if (!isStarted) {
        ////console.log("Ima not running");

        paintTheField();
        //Tick();
        return;
    }
    secondsNow = new Date().getSeconds();
    ////console.log(secondsNow);
    var timeDivDifficulty = 1000 / difficulty;
    setTimeout(function () {
        if (isDead || isPaused) {
            paintTheField();
            callback();
            return;
        }
        moveSnake();
        Eat();
        reDoMatrix();
        ////console.log('time diff:' + timeDivDifficulty);

        paintTheField();
        ////console.log('2');
        callback();
        if (isDead || isPaused) {

            paintTheField();
            callback();
            return;
        }

        if (!isDead && !isPaused && !IsFull) {
            Tick(function () { return; });
        }
    }, timeDivDifficulty);
}

var food = '0,0';
var prevFood = '0,0';
var prevFoodArr = [];
var IsFull = false;
function setFood() {
    if (counterEmptyCells < 1 && isStarted) {
        IsFull = true;
        return;
    }
    var X = getRndInteger(0, countCols - 1);
    var Y = getRndInteger(0, countRows - 1);
    if (X > countCols || Y > countRows) {
        setFood();
        return;
    }
    //console.log("setFood X: " + X + " Y: " + Y);
    try {
        if (playMatrix[X][Y] == '') {
            food = X + ',' + Y;
        } else {
            setFood();
        }
    }
    catch (exception) {
        //console.log("something happend in setfood");
        //console.log(exception);
        //console.log(playMatrix[X].length);
        setFood();


    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Eat() {
    if (snakeArray[0] == food) {
        prevFoodArr.push(food);
        var X = getFirstPos(food);
        var Y = getSecondPos(food);
        //console.log('x: ' + X + 'y: ' + Y);
        if (playMatrix.length <= 0) {
            return;
        }
        try {
            playMatrix[X][Y] = '';
        }
        catch (exception) {
            //console.log("something happend in Eat");
            setFood();
        }
        score += difficulty;
        snakeArray.unshift(food);
        setFood();
    }
}

