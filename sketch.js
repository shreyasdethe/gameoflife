let cells = [];

let size = 50;

let isRunning = true;

function setup(){
	canvas = createCanvas(size*10, size*10);
	canvas.parent('#canvas');

	for(let j = 0; j < size; j++){
		for(let i = 0; i < size; i++){
			cells[size*i + j] = new Cell(10*i, 10*j);
		}
	}

	for(let i = 0; i < size*size; i++){
		if(random(1) > 0.09) cells[i].fatal = true;
		else cells[i].fatal = false;

		cells[i].update();
		cells[i].show();
	}

	slider = createSlider(1, 20, 5);
	slider.parent('#slider');
	

	button1 = createButton("Start");
	button1.parent('#start');
	button1.style('background-color', 'black');
	button1.style('color', 'white');
	button1.style('font-size', '20px');
	button1.style('border', '0');
	button1.mousePressed(startSimulation);

	button2 = createButton("Stop");
	button2.parent('#stop');
	button2.style('background-color', 'black');
	button2.style('color', 'white');
	button2.style('font-size', '20px');
	button2.style('border', '0');
	button2.mousePressed(stopSimulation);

	
}

function draw(){
	frameRate(slider.value());

	for(let i = 0; i < size*size; i++){
		if(cells[i].isDead() == false){

			let aliveCount = 0;
			if((i + 1) % size != 0)									{ if(cells[i+1].isDead() 		== false)	aliveCount++;}
			if(i % size != 0)										{ if(cells[i-1].isDead() 		== false)	aliveCount++;}
			if(i+size < size*size - 1) 								{ if(cells[i+size].isDead() 	== false)	aliveCount++;}
			if(i-size > 0) 											{ if(cells[i-size].isDead() 	== false)	aliveCount++;}
			if(i+size+1 < size*size - 1 && (i + 1) % size != 0) 	{ if(cells[i+size+1].isDead() 	== false) 	aliveCount++;}
			if(i+size-1 < size*size - 1 && i % size != 0) 			{ if(cells[i+size-1].isDead() 	== false) 	aliveCount++;}
			if(i-size+1 > 0 && (i + 1) % size != 0) 				{ if(cells[i-size+1].isDead() 	== false) 	aliveCount++;}
			if(i-size-1 > 0 && i % size != 0) 						{ if(cells[i-size-1].isDead() 	== false) 	aliveCount++;}

			if((aliveCount < 2) | (aliveCount > 3)) cells[i].fatal = true;
			if(aliveCount == 2 | aliveCount == 3) 	cells[i].fatal = false;
		}

		else{

			let aliveCount = 0;
			if((i + 1) % size != 0)									{ if(cells[i+1].isDead() 		== false)	aliveCount++;}
			if(i % size != 0)										{ if(cells[i-1].isDead() 		== false)	aliveCount++;}
			if(i+size < size*size - 1) 								{ if(cells[i+size].isDead() 	== false)	aliveCount++;}
			if(i-size > 0) 											{ if(cells[i-size].isDead() 	== false)	aliveCount++;}
			if(i+size+1 < size*size - 1 && (i + 1) % size != 0) 	{ if(cells[i+size+1].isDead() 	== false) 	aliveCount++;}
			if(i+size-1 < size*size - 1 && i % size != 0) 			{ if(cells[i+size-1].isDead() 	== false) 	aliveCount++;}
			if(i-size+1 > 0 && (i + 1) % size != 0) 				{ if(cells[i-size+1].isDead() 	== false) 	aliveCount++;}
			if(i-size-1 > 0 && i % size != 0) 						{ if(cells[i-size-1].isDead() 	== false) 	aliveCount++;}

			if(aliveCount == 3) cells[i].fatal = false;
		}
	}
	
	for(let i = 0; i < size*size; i++){
		cells[i].update();
		cells[i].show();
	}

	if(!isRunning) noLoop();
	
}

function mouseClicked(){
	if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
		let cellIndex = 0;
		let mX = floor(mouseX / 10);
		let mY = floor(mouseY / 10);
		cellIndex = size*(mX) + mY;

		if(cells[cellIndex].isDead() == true) cells[cellIndex].fatal = false;
		else cells[cellIndex].fatal = true;

		cells[cellIndex].update();
		cells[cellIndex].show();
	}
}

function startSimulation(){
	isRunning = true;
	loop();
}

function stopSimulation(){
	isRunning = false;
}



//-----------------Cell class------------//
class Cell{

	isitDead;
	fatal;

	constructor(x_, y_){
		this.x = x_;
		this.y = y_;
	}

	update(){
		this.isitDead = this.fatal;
	}

	isDead(){
		return this.isitDead;
	}


	show(){
		stroke(0);
		strokeWeight(1);
		if(this.isitDead == true) fill(100);
		else fill(200);
		rect(this.x, this.y, 10, 10);
	}
}
