class Game{

    constructor(){
        this.level = parseInt(sessionStorage.getItem('level')) || 9;
        this.dices = new Array(this.level).fill(new Dice());
        // Se cargan los datos del jugador desde la variable de sesion
        // guardada del login, o registro.
        // this.player = new Player(sessionStorage.getItem('user') || 'guess');
        this.player = new Player();
        this.result = false;
        this.score = 0;
        this.chances = 3;
    }

    play(){
        let dices_sum = this.dices.map((e, i) => 
            this.diceThrow(i + 1, e)
        );
        let sum = dices_sum.reduce((prev, current, index) => 
            prev + current
        );
        
        this.result = true;
        switch(this.level){
            case 1:
                if(dices_sum != 6) {
                    this.chances--;
                    this.result = false;
                }
                break;
            case 2:
                if(dices_sum != 7) {
                    this.chances--;
                    this.result = false;
                }
                break;
            case 3:
                if(dices_sum != 15) {
                    this.chances--;
                    this.result = false;
                }
                break;
        }
        if(this.result){
            this.score++;
            return false;
        }
        if(this.chances == 0) return false;
        return true;
    }

    diceThrow(index, dice){
        let value = dice.throwDice();
        this.changeDiceImage(index, value);
        return value;
    }

    getPlayerScore(player, level){
        // const data = JSON.parse(localStorage.getItem(player));
        // const level_selector = level == 1 ? 'easy' :
        //                     level == 2 ? 'mid' :
        //                     level == 3 ? 'hard' : '';
        // console.log('Getting stats from level: ', level_selector);
        // const level_score = data['games'][level_selector];
        // const wins = level_score.reduce((prev, curr, index) => curr['won'] ? prev + 1 : prev, 0);
        // const losses = level_score.length - wins;
        // // const loss = level_score.reduce((prev, curr, index) => !curr['won'] ? prev + 1 : prev);
        // console.log()
        // return [wins, losses, level_score];
        return Storage.getPlayerScore(player, level);
    }

    changeDiceImage(dice, value){
        let file = `dices/dice${value}.svg`;
        console.log(file);
        $(`#dice-${dice}`).attr('src', file);
    }

    restart() {
        this.chances = 3;
        this.result = true;
    }

    recordResult(player, level){
        Storage.setPlayerScore(player, level, this.score, this.chances);
    }

    register(){
        
    }

    selectLevel(level){
        sessionStorage.setItem('level', level);
        this.level = level;
    }

    logIn(){
    }

    logOut(){
        sessionStorage.removeItem('level');
    }
}