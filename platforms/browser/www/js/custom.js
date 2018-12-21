$(document).ready(function (){
    StartTheGame();
});
function StartTheGame (){
       wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    borderWidth = ((wWidth - blockWidth *2 ) % blockWidth) + blockWidth*2;
    borderHeight = ((wHeight - blockWidth *2) % blockWidth) + blockWidth*6;
    countRows = (wWidth - borderWidth) / blockWidth ;
    countCols = (wHeight - borderHeight) / blockWidth-1;
    for(var i = 0;i<countCols;i++){
        playMatrix[i] = [];
        //playMatrix[i][0] = "wall";
        //playMatrix[i][countRows] = "wall";
        for(var j = 0;j<countRows;j++){
            playMatrix[i][j] = "";
        //playMatrix[0][i] = "wall";
        //playMatrix[countCols][i] = "wall";
            if(i == 0 || i == countCols-1){
                playMatrix[i][j] = "wall";
            }
            if(j == 0 || j == countRows-1){
                playMatrix[i][j] = "wall";
            }
        }
    }
    //playMatrix[4][10] = 'food';

    Tick(function(){
        //console.log('1');
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
var wWidth ;
var wHeight ;
var borderWidth ;
var borderHeight;
var countRows ; //
var countCols ; 
var playMatrix = [];
$(document).on('touchstart', function (evt) {
    //evt.preventDefault();
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;
    //console.log("tap tap tap");
    if(evt.originalEvent.touches.length==2){
        X1 = evt.touches[0].clientX;
        X2 = evt.touches[1].clientX;
        Y1 = evt.touches[0].clientY;
        Y2 = evt.touches[1].clientY; 
    }                                  
} );
//document.addEventListener('deviceready', this.onDeviceReady, false);
//document.addEventListener(, true); 
var prevDirection ='right';
var X1;
var X2;
var Y1;
var Y2;  
$(document).on('touchend',function(evt){
    //if(evt.originalEvent.touches.length==2){
        //if(X1<evt.touches[0].clientX && X2 > evt.touches[1].clientX){
            console.log(evt.touches[0].clientX);
            console.log(evt.touches[1].clientX);
        //}
    //}
});     
$(document).on('touchmove', function (evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
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
    //if(evt.originalEvent.touches >=1){
        console.log(evt.originalEvent.touches.length);
        //console.log(touches + ' fingers');
    //}
    //evt.preventDefault();
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    prevDirection = direction;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if(direction == "up" || direction == "down"){
            if ( xDiff > 0 ) {
            /* left swipe */
            direction ="left";
            } else {
            /* right swipe */
            direction="right";
            }
            //console.log("cols: " +countCols);
        }                       
    } else if(Math.abs( xDiff ) < Math.abs( yDiff )) {
        if(direction == "left" || direction == "right"){

            if ( yDiff > 0 ) {
            /* up swipe */
            direction="up"; 
            } else { 
            /* down swipe */
            direction="down";
            }
            //console.log("rows: " +countRows); 
        }                                                                
    } else {
        if(yDiff> 0 && xDiff > 0){
            //swipe left-up
            if(direction == "up" || direction == "down"){
                direction="left";
            } else {
                direction="up";
            }
        } else if ( xDiff > 0 && yDiff <0){
            if(direction == "up" || direction == "down"){
                direction="left";
            } else {
                direction="up";
            }
            //swipe left-down
        } else if ( xDiff<0 && yDiff >0){
            if(direction == "up" || direction == "down"){
                direction="right";
            } else {
                direction="down";                    
            }
            //swipe right-up
        } else if ( xDiff<0 && yDiff<0){
            if(direction == "up" || direction == "down"){
                direction="right";
            } else {
                direction="down";                    
            }
            //swipe right-down
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    //console.log(playMatrix);
    //console.log(direction);
    
    //paintTheField();
    if(!isStarted && evt.originalEvent.touches.length<2){
        //console.log('3');
        isStarted = true;
        direction= 'right';
        if(isDead){
            
            isDead = false;
            snakeArray = ['4,6','4,5','4,4'];
            food = '4,10';
            score = 0;
            direction='right';
            return;
        }
        Tick(function(){
            
        });
    }    

});
var tableEl = document.getElementById('screen');
var scoreEl = document.getElementById('score');
var xDown = null;                                                        
var yDown = null;  
var direction = "right";
var blockWidth = 20; //width = height
var snakeArray = ['4,6','4,5','4,4'];
var score = 0;



function paintTheField(){
    if(tableEl.hasChildNodes()){
    tableEl.innerHTML = '';
    }
    var htmlString = '';
    if(!isStarted && !isDead){
        htmlString = '<div>Start the game with a tap, swipe in the direction you want to go, NO RETURNS</div>'
    } else {
        //console.log('is started' + isStarted);
        if(isDead){
            htmlString = '<div>Your dead, you can restart with a tap</div>';
            isStarted = false;
        } else {
        paintSnake();
        
        for(var i = 0; i<countCols;i++){
            htmlString += '<tr>';
            for(var j = 0;j<countRows;j++){
                htmlString+= '<td  style="left:' + blockWidth + 'px; top:' + blockWidth + 'px;width:' + blockWidth + 'px;height:' + blockWidth + 'px;"';
                switch (playMatrix[i][j]) {
                    case 'wall':
                        htmlString += 'class ="wall"';
                        break;
                    case 'food':
                        htmlString += 'class = "food"';
                        break;
                    case 'snakefood':
                        htmlString += 'class ="snakefood"';
                    case 'snake':
                        htmlString += 'class = "snake"'; 
                    default:

                        break;
                };
                htmlString+= '></td>';
            };
            htmlString+= '</tr>';
    };
}
//console.log(htmlString);
    }
    tableEl.innerHTML = htmlString;
    scoreEl.innerHTML = 'Your score is: ' +score;

};
function setDirectionMove(direc){
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
var difficulty = 1.5;
var directionMove = '0,0';

function moveSnake(){
    if(isDead){
        return;
    }
    setDirectionMove(direction);
//console.log(directionMove);
//console.log('first snake is ' + snakeArray.toString());
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

for(var i = snakeArray.length-1;i>0;i--){
    prevPos = snakeArray[i];
    snakeArray[i] = snakeArray[i-1];
    //console.log(prevPos);
}
prevPos = snakeArray[0];
snakeArray[0] = addPositon(snakeArray[0],directionMove,secondPos);

if(snakeArray[0] == secondPos){
    setDirectionMove(prevDirection);
    snakeArray[0] = addPositon(prevPos,directionMove,secondPos);

}
//console.log('snake is ' + snakeArray.toString());
    EatMe();
}
function getFirstPos(Pos){
return parseInt( Pos.split(',')[0]);
}
function getSecondPos(Pos){
return parseInt( Pos.split(',')[1]);
}
function addPositon(origPos,speed,secondPos){
var origX = getFirstPos(origPos);
var orgiY = getSecondPos(origPos);
var speedX = getFirstPos(speed);
var speedY = getSecondPos(speed);
origX += speedX;
orgiY += speedY;

//console.log("OrigPos " + origX);

return origX +','+orgiY;
}
var counter = 0;
function reDoMatrix(){
    /*if(counter < snakeArray.length){
        if(playMatrix[X][Y] != "wall"){
            playMatrix[X][Y] = "snake";
        }
        counter++;
        reDoMatrix()
    }*/
    for(var i = 0;i<countCols;i++){
        for(var j = 0;j<countRows;j++){
            if(playMatrix[i][j] != "wall" /*&& playMatrix[i][j] != 'food'*/){
                playMatrix[i][j] ='';
                for(var k = 0;k<snakeArray.length;k++){
                    var X = getFirstPos(snakeArray[k]);
                    var Y = getSecondPos(snakeArray[k]);
                    /* check the cell from playMatrix with every piece in snkakeArray */
                    if(X == i && Y == j){
                        playMatrix[i][j] = 'snake';
                        var Xfood = getFirstPos(prevFood);
                        var Yfood = getSecondPos(prevFood);
  
                        if(i==Xfood && j==Yfood){
                            playMatrix[i][j] = 'snakefood';
                            if(k==snakeArray.length-1){
                                prevFood='0,0';
                            }
                        }

                    }
                }
            }
        }
    }
    var Xfood = getFirstPos(food);
    var Yfood = getSecondPos(food);
    playMatrix[Xfood][Yfood] = 'food';
}
function EatMe(){
    for(var i = 1;i<snakeArray.length;i++){

    
    if(snakeArray[0] == snakeArray[i]){
        isDead = true;
    }
    }
}
function paintSnake(){
for(var i = 0;i<snakeArray.length;i++){
    var X = getFirstPos(snakeArray[i]);
    var Y = getSecondPos(snakeArray[i]);
    //console.log('X = '+ X + 'Y=' +Y);

    if(playMatrix[X][Y] != "wall"){
        //playMatrix[X][Y] = 'snake';
    } else {
        isDead = true;  
        //console.log("I be deeth");
    }
}
}
var isDead = false;
var isStarted = false;
var secondsNow = 0;
function Tick(callback){
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var ms = new Date().getMilliseconds();
    console.log(hour+':'+minutes+':'+seconds+':'+ms);
if(isDead){
    //console.log("Ya deeth man");
    return;
}
if(!isStarted){
    //console.log("Ima not running");
    paintTheField()
    //Tick();
    return;
}
secondsNow = new Date().getSeconds();
//console.log(secondsNow);
var timeDivDifficulty = 1000 / difficulty;
setInterval(function(){
    if(isDead){
        paintTheField();
        return;
    }
    moveSnake();
    Eat();
    reDoMatrix();

paintTheField();
    //console.log('2');
    callback();
},timeDivDifficulty);
}

var food = '4,10';
var prevFood = '0,0';
function setFood(){
    var X = getRndInteger(0,countCols);
    var Y = getRndInteger(0,countRows);
    if(playMatrix[X][Y] ==''){
        food = X +','+Y;
    } else{
        setFood();
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function Eat(){
    if(snakeArray[0] == food){
        prevFood = food;
        var X = getFirstPos(food);
        var Y = getSecondPos(food);
        playMatrix[X][Y] = '';
        score+= difficulty;
        snakeArray.unshift(food);
        setFood();
    }
}

