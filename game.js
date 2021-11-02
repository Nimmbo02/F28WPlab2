function Bear() {
    this.dBear = 100; 
    this.htmlElement = document.getElementById("bear"); 
    this.id = this.htmlElement.id; 
    this.x = this.htmlElement.offsetLeft; 
    this.y = this.htmlElement.offsetTop; 

    
    this.move = function(xDir, yDir) {

        this.x += this.dBear * xDir; 
        this.y += this.dBear * yDir; 
        this.display(); 
    };

    
    this.display = function() {
        this.fitBounds();
        this.htmlElement.style.left = this.x + "px"; 
        this.htmlElement.style.top = this.y + "px"; 
        this.htmlElement.style.display = "absolute"; 
    };

 
    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };
}

function start() {

    bear = new Bear(); //create bear

    document.addEventListener("keydown", moveBear, false); //Add event listener to the keypress event.
    document.getElementById("speedBear").addEventListener("change", setSpeed) //Add event listener to the input field for changes

    bees = new Array(); //Create a new bees array
    makeBees(); //Create bees
    updateBees();
}
//Handling keyboard events to move the bear
// to move the bear
function moveBear(e) {
    if (start != true) {
        start = true;
        lastStingTime = new Date(); //take start time
    }

    //Codes of the four keys 
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0) //right key
    }
    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0) //left key
    }
    if (e.keyCode == KEYUP) {
        bear.move(0, -1) //up key
    }
    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1) //down key
    }
}

function setSpeed() {
    bear.dBear = parseInt(document.getElementById("speedBear").value);
}

class Bee {
    constructor(beeNumber) {
        
        this.htmlElement = createBeeImg(beeNumber);//the HTML element corresponding to the IMG of the bee 
        this.id = this.htmlElement.id; //iits HTML ID
        this.x = this.htmlElement.offsetLeft;//the left position (x)
        this.y = this.htmlElement.offsetTop; //the top position (y)

        //Function used to move the bee
        this.move = function(dx, dy) {
            this.x += dx; //Move the bee in the x axis by dx;
            this.y += dy; //Move the bee in the y axis by dy;
            this.display();
        };

        
        this.display = function() {
            //adjust position of bee and display it
            this.fitBounds();//add this to adjust to bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px"; 
            this.htmlElement.style.display = "block"; 
        };

       
        this.fitBounds = function() {
            //check and make sure the bees stays in the board space
            let parent = this.htmlElement.parentElement; 
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0) this.x = 0;
            if (this.x > w - iw) this.x = w - iw;
            if (this.y < 0) this.y = 0;
            if (this.y > h - ih) this.y = h - ih;
        };

    }
}

function createBeeImg(wNum) {
    //Get the dimension and position the board
    let boardDiv = document.getElementById("board"); 
    let boardDivW = boardDiv.offsetWidth; 
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft; 
    let boardDivY = boardDiv.offsetTop; 

    //Create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "images/bee.gif"); 
    img.setAttribute("width", "100"); 
    img.setAttribute("alt", "A bee!"); 
    img.setAttribute("id", "bee" + wNum); 
    img.setAttribute("class", "bee");//set class of html tag img 

    //Add the image to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    //Set the inital position
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivW);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";
    //Return the img object
    return img;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max); //Generate a random number between 0 and max
}

function makeBees() {

    let nbBees = document.getElementById("nbBees").value; //Get the number of bees specified by the user
    nbBees = Number(nbBees); //Convert the content of the input to a number

    if (isNaN(nbBees)) { //Check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }

    //Create bees
    let i = 1;
    while (i <= nbBees) {
        var num = i;
        var bee = new Bee(num); //create object and its IMG element
        bee.display(); //display the bee
        bees.push(bee); //add the bee object to the bees array
        i++;
    }

}

function addBee() {
    let nbBees = document.getElementById("nbBees").value; //Get the number of bees specified by the user
    nbBees = Number(nbBees); //Convert the content of the input to a number
    nbBees++;
    var bee = new Bee(nbBees); //Create a bee
    bee.display(); //Display the bee on screen
    bees.push(bee); //Add the bee to the bees array
}
function moveBees() {
    let speed = document.getElementById("speedBees").value; //Get the speed from the input field

    for (let i = 0; i < bees.length; i++) {
        //Move the bees randomly in the x and y axies 
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy); //For every bee in the array, move 
        isHit(bees[i], bear); //Everytime the bees move, checks if they hit the bear;
    }
}

function updateBees() {
    //move the bees randomly
    moveBees();
    //use a fixed update period
    let period = document.getElementById("periodTimer").value;

    let score = hits.innerHTML;
    if (Number(score) < 1000) {
        updateTimer = setTimeout('updateBees()', period); //Update the bees movement after the specified interval
    } else {
        score = "Game Over"
        hits.innerHTML = score;
        updateTimer = clearTimeout();
    }
}

function isHit(defender, offender) {

    if (overlap(defender, offender)) { //Check if the two images overlapped
        let score = hits.innerHTML;
        score = Number(score) + 1; //Increment the score
        hits.innerHTML = score;//display new score

        //Calculate longest duration
        let newStingTime = new Date();
        let thisDuration = newStingTime - lastStingTime;
        lastStingTime = newStingTime;
        let longestDuration = Number(duration.innerHTML);

        //If there is no longestDuration yet, the current Duration is the longest duration
        if (longestDuration === 0 || isNaN(longestDuration)) {
            longestDuration = thisDuration;
        } else {
            if (longestDuration < thisDuration) longestDuration = thisDuration;
        }

        //Update the longest duration display
        document.getElementById("duration").innerHTML = longestDuration;
    }
}

function overlap(element1, element2) {
    //consider the two rectangles wrapping the two elements 
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft;
    top1 = element1.htmlElement.offsetTop;
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;

    //The rectangle of the second element
    left2 = element2.htmlElement.offsetLeft;
    top2 = element2.htmlElement.offsetTop;
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;

    //Calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;

    //If intersection is nil no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }

    return true;
}