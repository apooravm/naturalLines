let lineYN = true;

let x1 = 30;
let y1 = 300;
let x2 = 1000;
let y2 = y1;
let currSeed = 42;

// sliders
let X1slider;
let Y1slider;
let divisionSlider;
let displaceSlider;
let rareDisplaceSlider;

let prevMouseX;
let prevMouseY;

let oftenness_of_spliting_Slider;

function setup() {
  createCanvas(windowWidth-20, windowHeight);
  // X1slider = createSlider(0, width, 0.70*width);
  // Y1slider = createSlider(0, height, 0.50*height);
  divisionSlider = createSlider(0, 100, 20);
  oftenness_of_spliting_Slider = createSlider(0, 100, 90);
  displaceSlider = createSlider(0, 1000, 190);
  rareDisplaceSlider = createSlider(0, 10, 0);
  currSeed = random(0, 100);

  prevMouseX = width*0.1;
  prevMouseY = height*0.5;
}

function draw() {
  background(41);
  strokeWeight(4);
  stroke(255);
  // let x2 = X1slider.value();
  // let y2 = Y1slider.value();
  if (mouseIsPressed && mouseX - prevMouseX < 40 && mouseY - prevMouseY < 40) {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
  if (mouseIsPressed && mouseX - x2 < 40 && mouseX - x2 > -40)
  {
    x2 = mouseX;
    y2 = mouseY;
  }
  x1 = prevMouseX;
  y1 = prevMouseY;
  naturalLine(x1, y1, x2, y2, false);

  // naturalLine(random(height), random(width), random(width), random(height), false);
}

function naturalLine(x1, y1, x2, y2, rand=false) {
  if (rand == false) {
    randomSeed(currSeed);
  }
  let slope = (y2-y1)/(x2-x1);
  let intercept = y1 - slope*x1;

  let Xpoints = [];
  let numOfDivisions = divisionSlider.value();
  let currX;
  let currY;

  let prevX = x1;
  let prevY = y1;

  let currentRandomX = 0;

  let weightArray = [];
  let currWeight;
  let maxWeight = 2.5;
  let minWeight = 0.7;

  let oftenness_of_spliting = (oftenness_of_spliting_Slider.value())/100; //range 0.0 - maxOftennes
  // divide by 100 since slider b/w 1-100 while range 0-1
  let maxOftennes = 1.0;
  let randOften = 0;

  let displace = (displaceSlider.value())/100;
  let rareDisplace = rareDisplaceSlider.value(); //0-20
  let specialDisplaceVal = 100;

  let minDivisionPerc = (x2-x1)/numOfDivisions;
  let addVal;

  function lineEq(xVal) {
    return (xVal*slope) + intercept;
  }

  currentRandomX = random(x1, x2);
  for (let i = 0; i < numOfDivisions; i++) {
    currX = random(x1, x2);
    while (currX in Xpoints) {
      currX = random(x1, x2);
    }
    Xpoints.push(currX);
  }
  for (let j = 0; j < numOfDivisions+1; j++) { //extra +1 for prevX,prevY----x2,y2
    currWeight = random(minWeight, maxWeight);
    while (currWeight in weightArray) {
      currWeight = random(minWeight, maxWeight);
    }
    weightArray.push(currWeight);
  }

  
  sort(Xpoints);
  sort(weightArray);

  // for (let i = 0; i < Xpoints.length-1; i++) {
  //   if (Xpoints[i+1]-Xpoints[i] < minDivisionPerc) {
  //     addVal = (minDivisionPerc-(Xpoints[i+1]-Xpoints[i]))/2;
  //     Xpoints[i+1] += addVal;
  //     Xpoints[i] -= addVal;
  //   } 
  // }

  for (let i = 0; i < numOfDivisions; i++) {
    currX = Xpoints[i];
    currY = lineEq(Xpoints[i]);

    randOften = random(0.0, maxOftennes);
    if (random(0, 20) < rareDisplace) {
      currY = random(currY - specialDisplaceVal, currY + specialDisplaceVal);
      currX = random(currX - specialDisplaceVal, currX + specialDisplaceVal);
    }
    else if (randOften <= oftenness_of_spliting) {
      currY = random(currY - displace, currY + displace);
      currX = random(currX - displace, currX + displace);
    }

    // stroke(random(255), random(255), random(255));
    // strokeWeight((1+10*i+20*noise(10))/70);
    strokeWeight(weightArray[i]);
    line(prevX, prevY, currX, currY); //prevX, prevY already set to x1,x2 earlier
    prevX = currX;
    prevY = currY;
  }
  // stroke(random(255), random(255), random(255));
  strokeWeight(weightArray[weightArray.length-1]);
  // line(prevX, prevY, Xpoints[numOfDivisions-1], lineEq(Xpoints[numOfDivisions-1]))
  line(prevX, prevY, x2, y2);

  for (let i = 0; i < 2; i++) {
    strokeWeight(3.5);
    point(random(x2, x2+2.4), random(y2-0.5, y2+1.8));
  }
  lineYN = false;
}
