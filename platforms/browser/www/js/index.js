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
/*var wWidth ;
var wHeight ;
var borderWidth ;
var borderHeight;
var countRows ; 
var countCols ; 
var playMatrix = [];*/
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('touchstart', handleTouchStart, true);        
        /*window.addEventListener('touchmove', function (evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }
            evt.preventDefault();
            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
        });
            /*if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                /*if(direction == "up" || direction == "down"){
                    if ( xDiff > 0 ) {
                    /* left swipe */
                    /*direction ="left";
                    } else {
                    /* right swipe */
                    /*direction="right";
                    }
                    console.log("cols: " +countCols);
            }                       
            } else if(Math.abs( xDiff ) < Math.abs( yDiff )) {
                if(direction == "left" || direction == "right"){
    
                    if ( yDiff > 0 ) {
                    /* up swipe */
                    /*direction="up"; 
                    } else { 
                    /* down swipe */
                    /*direction="down";
                    }
                    console.log("rows: " +countRows); 
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
            /*xDown = null;
            yDown = null;                                             
    }, {passive:false});
        window.addEventListener('scroll',function(e){e.preventDefault();}); */   
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        /*console.log("me is rady");
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;
        borderWidth = ((wWidth - blockWidth *2 ) % blockWidth) + blockWidth*2;
        borderHeight = ((wHeight - blockWidth *2) % blockWidth) + blockWidth*5;
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
        playMatrix[4][10] = 'food';
        console.log(playMatrix);
        console.log(direction);
        snakeArray = ['4,6','4,5','4,4'];
        
        //paintTheField();
        Tick();*/
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }};
/*var tableEl = document.getElementById('screen');
var scoreEl = document.getElementById('score');
var xDown = null;                                                        
var yDown = null;  
var direction = "right";
var blockWidth = 20; //width = height
var snakeArray = [];
var score = 0;

function handleTouchStart(evt) {
    //evt.preventDefault();
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;
    if(!isStarted){
        isStarted = true;
        Tick();
    }                                      
}; 

function paintTheField(){
    if(tableEl.hasChildNodes()){
        tableEl.innerHTML = '';
    }
    var htmlString = '';
    if(!isStarted){
        score = '<div>Start the game with a tap, swipe in the direction you want to go, NO RETURNS</div>'
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
                    case 'snake':
                        htmlString += 'class = "snake"';
                    default:
                        
                        break;
                };
                htmlString+= '></td>';
            };
            htmlString+= '</tr>';
        };
    //console.log(htmlString);
    }
    tableEl.innerHTML = htmlString;
    scoreEl.innerHTML = 'Your score is: ' +score;
    
};
var difficulty = 1;
function moveSnake(){
    console.log(snakeArray.length);
    var directionMove = '0,0';
    switch (direction) {
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
    console.log('first snake is ' + snakeArray.toString());
    var prevPos = '';
    for(var i = snakeArray.length-1;i>0;i--){
        prevPos = snakeArray[i];
        snakeArray[i] = snakeArray[i-1];
        console.log(prevPos);
    }
    snakeArray[0] = addPositon(snakeArray[0],directionMove);

    console.log('snake is ' + snakeArray.toString());

}
function getFirstPos(Pos){
    return parseInt( Pos.split(',')[0]);
}
function getSecondPos(Pos){
    return parseInt( Pos.split(',')[1]);
}
function addPositon(origPos,speed){
    var origX = getFirstPos(origPos);
    var orgiY = getSecondPos(origPos);
    var speedX = getFirstPos(speed);
    var speedY = getSecondPos(speed);
    origX += speedX;
    orgiY += speedY;
    console.log("OrigPos " + origX);

    return origX +','+orgiY;
}
function reDoMatrix(){
    
}
function paintSnake(){
    for(var i = 0;i<snakeArray.length;i++){
        var X = getFirstPos(snakeArray[i]);
        var Y = getSecondPos(snakeArray[i]);
        console.log('X = '+ X + 'Y=' +Y);

        if(playMatrix[X][Y] != "wall"){
            playMatrix[X][Y] = 'snake';
        } else {
            isDead = true;  
        }
    }
}
var isDead = false;
var isStarted = false;
var secondsNow = 0;
function Tick(){
    if(isDead){
        console.log("Ya deeth man");
        return;
    }
    if(!isStarted){
        console.log("Ima not running");
        paintTheField()
        //Tick();
        return;
    }
    secondsNow = new Date().getSeconds();
    console.log(secondsNow);
    moveSnake();
    paintTheField();
    window.setTimeout(Tick(),0);
}
*/

////