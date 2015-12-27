var sampleArray = [];
var playerArray = [];
var turns = 0;
var faster = 1;
var fastArray = [[5,.8],[9,.7],[13,.6]];
var colorMap = [
  [1, "green", "#00a74a", "#00ff00", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"],
  [2, "red", "#9f0f17", "#ff0000", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"],
  [3, "blue", "#094a8f", "#00ccff", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"],
  [4, "yellow", "#cca707", "#ffff00", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"]
]
var timer = 500;
var timerPlus = 500;
var strictmode = 0;

function strict() {
  if (strictmode===0) {
    strictmode=1;
    document.getElementById("strict").style.backgroundColor = colorMap[1][3];
  } else {
    strictmode=0;
    document.getElementById("strict").style.backgroundColor = colorMap[1][2];
  }
}

function reset() {
  sampleArray = [];
  playerArray = [];
  turns = 0;
//  document.getElementById("followme").innerHTML = " ";
//  document.getElementById("turns").innerHTML = " ";
  document.getElementById("counter").value = " ";
//  document.getElementById("mysequence").innerHTML = " ";
//  document.getElementById("mysequencestatus").innerHTML = " ";
//  document.getElementById("speed").innerHTML = " ";
  document.getElementById("status").innerHTML = " ";
  j = 0;
}

function sequence() {
  if (turns===20) {
    document.getElementById("status").innerHTML = "You Win, " + turns + " correct presses in a row!";
  } else {
  var next = Math.floor((Math.random() * 4) + 1)
  for (i = 0; i < colorMap.length; i++) {
    if (next == colorMap[i][0]) {
      sampleArray.push(colorMap[i][1]);
      playSequence();
    } else {}
  }
//  document.getElementById("followme").innerHTML = "Computer Sequence: " + sampleArray;
  turns = turns + 1;
  document.getElementById("counter").innerHTML = "Number of turns taken: " + turns;
  document.getElementById("counter").value = turns;
}
}

function playSequence() {
  for (k=0; k < fastArray.length; k++) {
    if (turns === fastArray[k][0]) {
      faster=fastArray[k][1];
//      document.getElementById("speed").innerHTML = "Current Speed is: " + timer + " multiplied by " + fastArray[k][1];
    } else {

    }
  }
  for (j = 0; j < sampleArray.length; j++) {
    if (sampleArray[j] == "green") {
      setTimeout(function() {
        lightUp(0);
      }, timer + j * timerPlus * faster)
    } else {
      if (sampleArray[j] == "red") {
        setTimeout(function() {
          lightUp(1);
        }, timer + j * timerPlus * faster)
      } else {
        if (sampleArray[j] == "blue") {
          setTimeout(function() {
            lightUp(2);
          }, timer + j * timerPlus * faster)
        } else {
          if (sampleArray[j] == "yellow") {
            setTimeout(function() {
              lightUp(3);
            }, timer + j * timerPlus * faster)
          }
        }
      }
    }
  }
}

function lightUp(a) {

  document.getElementById(colorMap[a][1]).style.backgroundColor = colorMap[a][3];
  var audio = new Audio(colorMap[a][4]);
  audio.play();
    setTimeout(function() {
    lightDown(a)
    }, 0.5*timer)
}

function lightDown(b) {
  document.getElementById(colorMap[b][1]).style.backgroundColor = colorMap[b][2];
}

function selection(a) {
  playerArray.push(colorMap[a][1])
  setTimeout(function() {
        lightUp(a);
      }, 0.1*timer)
//  document.getElementById("mysequence").innerHTML = "Player Sequence: " + playerArray;
  if (playerArray[playerArray.length - 1] == sampleArray[playerArray.length - 1]) {
    if (playerArray.length == sampleArray.length) {
//      document.getElementById("mysequencestatus").innerHTML = "Player Sequence: Correct";
      playerArray = [];
        setTimeout(function() {
        sequence();
      }, timer);
    } else {

    }
  } else {
//    document.getElementById("mysequencestatus").innerHTML = "Player Sequence: Incorrect";
    document.getElementById("status").innerHTML = "Incorrect Button Pressed, Try Again";
    if (strictmode===1) {
    playerArray = [];
    reset();
    sequence();
    } else {
          playerArray = [];
    setTimeout(function() {
      document.getElementById("status").innerHTML = " ";
        playSequence();
      }, timer);;
    }
  }
}
