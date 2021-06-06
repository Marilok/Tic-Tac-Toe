function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

const human = new Player("P1", "X");
const bot = new Player("P2", "O");

const game = (() => {
    const squares = Array.from(document.getElementsByClassName('board__square'));
    let score = new Array(squares.length);
    let turn = 1;
    
    const getScore = () => {
        return score
    }
    
    const getTurn = () => {
        return turn
    }
    
    const nextTurn = () => {
        turn += 1;
    }
    
    const checkWin = () => {
        const combinations = [score.slice(0,3),score.slice(3,6),score.slice(6,9),[0,3,6].map(x=>score[x]),[1,4,7].map(x=>score[x]),[2,5,8].map(x=>score[x]),[0,4,8].map(x=>score[x]),[2,4,6].map(x=>score[x])]
        const allEqual = arr => arr.every( v => v === arr[0] ) && !arr.includes(undefined);
        
        const checkRows = () => {for (let i = 0; i < combinations.length; i++) {
            if(allEqual(combinations[i])) return true
        }}

        if (checkRows()) {
            console.log('win');
            
        } else if (score.includes(undefined)
        ){
            console.log('go on');

        }else{
            console.log('tie');

        }
    }

    const placeMarker = (place, player) => {
        if (!getScore()[place]) {
            getScore()[place] = player.marker;

            let myImage = new Image();
            myImage.src = player.marker == 'X' ? './images/x.svg' : './images/o.svg';
            myImage.className = 'board__marker';
            squares[place].appendChild(myImage);
            nextTurn();
            checkWin();
        } else {
            console.log('wrongmove');
        }
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', () => {
            (getTurn() % 2) ? placeMarker(i, human) : placeMarker(i, bot);
        })
    }
    return {
        getScore,
        getTurn,
        nextTurn,
        placeMarker
    }

})();
