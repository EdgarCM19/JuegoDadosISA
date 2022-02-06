class Dice {

    constructor(){
        this.value = 0;
    }

    value(){ return this.value; }
    
    throwDice() {
        let val = Math.round((Math.random() * 5) + 1);
        console.log('Valor', val);
        return val;
    }

}