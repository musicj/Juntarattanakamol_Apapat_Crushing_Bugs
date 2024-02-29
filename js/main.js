// variables always go at the top -> this is step 1
// these are the connections that you're making to elements on the page 
// use CSS selectors to make connections to elements with JavaScript

// create a 1 to 1 connection with a variable -> querySelector("queryString")
// let theButton = document.querySelector("#buttonOne");

// create a 1 to many connection with a variable -> querySelectorAll("queryString")
const theButtons = document.querySelectorAll("#buttonHolder img"),
	theHeading = document.querySelector("#headLine h1"),
	puzzleBoard = document.querySelector(".puzzle-board"),
	puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
	puzzlePiecesContainer = document.querySelector(".puzzle-pieces"),
	dropZones = document.querySelectorAll('.drop-zone');
	// store the dragged piece in a global variable
	// because we need it in the handleDrop function
let draggedPiece;

// step 3
// functionality always goes in the middle -> how do we want
// the app to behave?
function changeBGImage() {
	// the `` is a JavaScript template string. It tells the JS enging to evaluate the expression
	// inside the braces - run that little bit of code. In this case it's just pulling the ID of the
	// button we clicked on and putting it at the end of the image name (0, 1, 2, 3)
	// and updating the background-image style of the puzzle board element.
	const backgroundBox = this.id;

	// bug fix #2 should go here. it's at most 3 lines of JS code.
	puzzleBoard.style.backgroundImage = `url(images/backGround${backgroundBox}.jpg)`;

	for (let i = 0; i < dropZones.length; i++) {
        const zone = dropZones[i];
        
        if (zone.firstChild) {
            const piece = zone.firstChild;
            puzzlePiecesContainer.appendChild(piece);
            piece.classList.remove("dropped");
        }
    }
	
	for (let i = 0; i < puzzlePieces.length; i++) {
		const piece = puzzlePieces[i];
		const originalPieceImage = piece.getAttribute('src');
		const newPieceImage = originalPieceImage.replace(/\d/g, this.id);
		piece.src = newPieceImage;}
}

function handleStartDrag() { 
	console.log('started dragging this piece:', this);
	// store a reference to the puzzle piece image that we're dragging
	// so we can use it later and move it to a drop zone
	draggedPiece = this;
}

function handleDragOver(e) { 
	e.preventDefault(); // e is shorthand for event
	// this overrides the default dragover behaviour
	console.log('dragged over me'); 
}

function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');
    // bug fix #1 should go here, and it's at most 3 lines of JS code
    
	//code for when you place the images, it is won't crysh eachother
	if (this.children.length >= 1) {
		
	} 
	
	else {
		this.appendChild(draggedPiece);
	}
    // this line is going to move the dragged piece from the left side of the board
    // into whatever drop zone we choose. appendChild means "add element to the container"
   
}

//reset
function resetPuzzle() {
    for (let i = 0; i < puzzlePieces.length; i++) {
        const piece = puzzlePieces[i];
        piece.classList.remove("dropped");
        piece.parentNode.removeChild(piece);
        puzzlePiecesContainer.appendChild(piece);
    }
}

// step 2
// event handling always goes at the bottom => 
// how do we want users to interact with our app

// 1 to 1 event handling
//theButton.addEventListener("click", changeBGImage);

// 1 to many event handling
// add event handling to each button in the collection of buttons, one at a time
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

// add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

// add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

const resetAll = document.getElementById("resetBut");
resetAll.addEventListener("click", resetPuzzle);