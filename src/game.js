class Game{

    constructor(){
        this.level = parseInt(sessionStorage.getItem('level')) || 9;
        this.dices = new Array(this.level).fill(new Dice());
        // Se cargan los datos del jugador desde la variable de sesion
        // guardada del login, o registro.
        const user_initials = sessionStorage.getItem('user');
        if(user_initials !== null){
            const [user_name, user_date] = Storage.getPlayerData(user_initials);
            this.player = new Player(user_name, user_initials, user_date);
        }
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
        console.log("/", sum);
        this.result = true;
        switch(this.level){
            case 1:
                if(sum != 6) {
                    this.chances--;
                    this.result = false;
                }
                break;
            case 2:
                if(sum != 7) {
                    this.chances--;
                    this.result = false;
                }
                break;
            case 3:
                if(sum != 15) {
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

    getPlayerScore(){
        return Storage.getPlayerScore(this.player.iniciales, this.level);
    }

    changeDiceImage(dice, value){
        let file = `dices/dice${value}.svg`;
        $(`#dice-${dice}`).attr('src', file);
    }

    restart() {
        this.chances = 3;
        this.result = true;
    }

    recordResult(){
        Storage.setPlayerScore(
            this.player.iniciales, 
            this.level, 
            this.score, 
            this.chances
        );
    }

    register(user_name, user_initials, user_date){
        return Storage.registerPlayer(user_name, user_initials, user_date);
    }

    selectLevel(level){
        sessionStorage.setItem('level', level);
        this.level = level;
    }

    logIn(user_initials){
        return localStorage.getItem(user_initials) !== null
    }

    logOut(){
        sessionStorage.removeItem('level');
        sessionStorage.removeItem('user');
    }
}