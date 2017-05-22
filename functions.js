
var board;
var grid;
var gridPicFront;
var gridPicBack;
var gridFront;
var gridBack;
var container, click;
var countFlipped = 0;//keep track of flipped cards, reset to 0 when reaching to 2. 
var id1, id2; 
var tempArr;
var picSet = ["pic.jpg","pic.jpg","2.jpg","2.jpg","3.jpg","3.jpg","4.jpg","4.jpg", "5.jpg","5.jpg","6.jpg","6.jpg","7.jpg","7.jpg","8.jpg","8.jpg"];
var finishedSets = []; //finished id's go here
var match; //set flag for match
var pairsFinished; 
var answerPanel, answerGrid;
var answerIndex, answerPic;
//debug functions
function show(){
    
    alert(countFlipped);
}
function reveal(){
    $(document).ready(function(){
        $("#a0").fadeTo(3000,0.9);
    });
}
//regular functions
function flip(el) {
    var temp = "#" + $(el).attr("id");
    if(countFlipped === 0){
        $(temp).toggleClass('flipped');
        
        id1 = $(el).attr("id");
        document.getElementById(id1).style.pointerEvents = 'none';
        countFlipped++;
    }
    else if(countFlipped === 1){
        $(temp).toggleClass('flipped');
        id2 = $(el).attr("id");
        countFlipped++;
        
    }
    if(countFlipped === 2){
       
        if(document.getElementById(id1+"p").src === document.getElementById(id2 + "p").src){
            pairsFinished++; //there should be 8 pairs when finished.
            $(document).ready(fadeAway(id1,id2));
            answerPic = document.createElement("img");
            answerPic.src = document.getElementById(id1+"p").src;
            answerPic.setAttribute("id", "i" + answerIndex);
            document.getElementById("a"+answerIndex).style.opacity = "0";
            document.getElementById("a"+answerIndex).appendChild(answerPic);
            $(document).ready(fadeUp("a"+answerIndex));
            answerIndex++;
            finishedSets.push(id1);
            finishedSets.push(id2);
            if(pairsFinished === 8){
                alert("You win!");
            }
            match = 1;
            disableAll();
        }
        else{
            disableAll();
        }
    }
}

function fadeAway(id, id1){
    var temp = "#" + id;
    var temp1 = "#" + id1;
    $( temp ).fadeTo( 2000, 0.01 );
    $( temp1 ).fadeTo( 2000, 0.01 );
}
function fadeUp(id){
    var tempId = "#" + id;
    $(tempId).fadeTo(2000, 0.9);
}
function disableAll(){
    for(var count1 = 0; count1 < 16; count1++){
        document.getElementById("card"+count1).style.pointerEvents = 'none';
        
        
    }
    setTimeout(enableAll, 1000);
}

function enableAll(){
    var n = "#"+id1+","+"#"+id2;
    if(match !== 1){
        $(n).toggleClass('flipped');
    }
    countFlipped = 0;
    id1 = "";
    id2 = "";
    match = 0;
    if(finishedSets.length > 0){
        for(var count2 = 0; count2 < 16; count2++){
            if(check("card"+count2) === 0){
                document.getElementById("card"+count2).style.pointerEvents = 'auto';
            }
        }
    }
    else{
        for(var count3 = 0; count3 < 16; count3++){
            document.getElementById("card"+count3).style.pointerEvents = 'auto';
        }
    }
    
    }
    

//checks if the element has been removed from the game, do not enable finished elements. 
function check(arr){
    for(var setCount = 0; setCount < finishedSets.length; setCount++){
        if(arr === finishedSets[setCount]){
            return 1;
        }
    }
    return 0;
}

/*
 * container div
 *   click div
 *     front div
 *     back div
 * */
 //make and initialize the board, and set/resetting some flags
function makeBoard(){
    match =0;
    pairsFinished = 0;
    answerIndex = 0;
    tempArr = picSet;
    shuffle(tempArr);
    board = document.createElement("div");
    board.setAttribute("class","board");
    board.setAttribute("class","container");
    document.body.appendChild(board);
    for(var count = 0; count < 16; count++){
        click = document.createElement("div");
        click.setAttribute("class", "card");
        
        click.setAttribute("onclick", "flip(this)");
        click.setAttribute("id","card"+count);
        board.appendChild(click);
        gridFront = document.createElement("div");
        gridFront.setAttribute("class","front");
        click.appendChild(gridFront);
        gridPicFront = document.createElement("img");
        gridPicFront.src = "wall.jpg";
        gridFront.appendChild(gridPicFront);
        gridBack = document.createElement("div");
        gridBack.setAttribute("class","back");
        click.appendChild(gridBack);
        gridPicBack = document.createElement("img");
        gridPicBack.src = tempArr[0];
        gridPicBack.setAttribute("id","card"+count + "p");
        tempArr.shift();
        gridBack.appendChild(gridPicBack);
    }
    answerPanel = document.createElement("div");
    answerPanel.setAttribute("class","answersPanel");
    document.body.appendChild(answerPanel);
    for(var answerCount = 0; answerCount < 8; answerCount++){
        answerGrid = document.createElement("div");
        answerGrid.setAttribute("class","answersGrid");
        answerGrid.setAttribute("id", "a"+answerCount);
        answerPanel.appendChild(answerGrid);
    }
}

//taken from stack overflow
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
makeBoard();
