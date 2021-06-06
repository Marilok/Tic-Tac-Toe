"use strict";

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

var human = new Player("P1", "X");
var bot = new Player("P2", "O");

var game = function () {
  var squares = Array.from(document.getElementsByClassName('board__square'));
  var score = new Array(squares.length);
  var turn = 1;

  var getScore = function getScore() {
    return score;
  };

  var getTurn = function getTurn() {
    return turn;
  };

  var nextTurn = function nextTurn() {
    turn += 1;
  };

  var checkWin = function checkWin() {
    var combinations = [score.slice(0, 3), score.slice(3, 6), score.slice(6, 9), [0, 3, 6].map(function (x) {
      return score[x];
    }), [1, 4, 7].map(function (x) {
      return score[x];
    }), [2, 5, 8].map(function (x) {
      return score[x];
    }), [0, 4, 8].map(function (x) {
      return score[x];
    }), [2, 4, 6].map(function (x) {
      return score[x];
    })];

    var allEqual = function allEqual(arr) {
      return arr.every(function (v) {
        return v === arr[0];
      }) && !arr.includes(undefined);
    };

    var checkRows = function checkRows() {
      for (var i = 0; i < combinations.length; i++) {
        if (allEqual(combinations[i])) return true;
      }
    };

    if (checkRows()) {
      console.log('win');
    } else if (score.includes(undefined)) {
      console.log('go on');
    } else {
      console.log('tie');
    }
  };

  var placeMarker = function placeMarker(place, player) {
    if (!getScore()[place]) {
      getScore()[place] = player.marker;
      var myImage = new Image();
      myImage.src = player.marker == 'X' ? './images/x.svg' : './images/o.svg';
      myImage.className = 'board__marker';
      squares[place].appendChild(myImage);
      nextTurn();
      checkWin();
    } else {
      console.log('wrongmove');
    }
  };

  var _loop = function _loop(i) {
    squares[i].addEventListener('click', function () {
      getTurn() % 2 ? placeMarker(i, human) : placeMarker(i, bot);
    });
  };

  for (var i = 0; i < squares.length; i++) {
    _loop(i);
  }

  return {
    getScore: getScore,
    getTurn: getTurn,
    nextTurn: nextTurn,
    placeMarker: placeMarker
  };
}();