let boxes = document.querySelectorAll('.game-square');
let gameHeading = document.querySelector('#game-heading');
let restartButton = document.querySelector('#restart-button');
let winResults = [[0,3,6], [2,5,8],[1,4,7],[0,4,8], [2,4,6],[0,1,2],[3,4,5],[6,7,8]]
let arr =[0,0,0,0,0,0,0,0,0];
let click = 0;


boxes.forEach((box, i) =>{
    box.addEventListener('click', () => {
        restartButton.display = 'none';
        click++;
        const isX = click % 2 !== 0;
        if(isX){
            box.innerHTML = 'X';
            box.disabled = true;
            gameHeading.innerHTML = "Player 2's Turn";
            arr[i] = 1;
        }
        else{
            box.innerHTML = 'O';
            box.disabled = true;
            gameHeading.innerHTML = "Player 1's Turn";
            arr[i] = 2;
        }

        const clickedButtonIndex = arr.flatMap((el, i) => el === (isX ? 1 : 2) ? i : []);


        winResults.forEach((result) => {
            // result - heresi bir udush arrayidir 3 reqemnen ibaret

            const stringResult = result.join(""); // [0,4,7] -> 047

            const matchedNums = clickedButtonIndex.filter((nr) => stringResult.includes(nr));

            if (matchedNums.length === 3) {
                gameHeading.innerHTML = isX? "Player 1 Won!!!" : "Player 2 Won!!!";
                restartButton.style.display = 'block';
                click = 0;
                boxes.forEach(b => b.disabled = true);
            }
            else if(arr.every((a) => a!==0 )) {
                gameHeading.innerHTML = "Tie game!";
                restartButton.style.display = 'block';
            }
        })
    })
})

restartButton.addEventListener('click',function () {
    boxes.forEach(b => {
        b.innerHTML = '';
        b.disabled = false;
        click = 0;
        arr =[0,0,0,0,0,0,0,0,0];
    });
    gameHeading.innerHTML = "Player 1's Turn";
    this.style.display = 'none';
});
