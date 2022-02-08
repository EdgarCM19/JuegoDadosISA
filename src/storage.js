class Storage {

    static getPlayerScore(player, level){
        const data = JSON.parse(localStorage.getItem(player));
        const level_selector = level == 1 ? 'easy' :
                            level == 2 ? 'mid' :
                            level == 3 ? 'hard' : '';
        console.log('Getting stats from level: ', level_selector);
        const level_score = data['games'][level_selector];
        const wins = level_score.reduce((prev, curr, index) => curr['won'] ? prev + 1 : prev, 0);
        const losses = level_score.length - wins;
        // const loss = level_score.reduce((prev, curr, index) => !curr['won'] ? prev + 1 : prev);
        console.log()
        return [wins, losses, level_score];
    }

    static setPlayerScore(player, level, score, chances){
        const data = JSON.parse(localStorage.getItem(player));
        const level_selector = level == 1 ? 'easy' :
                            level == 2 ? 'mid' :
                            level == 3 ? 'hard' : '';
        data['games'][level_selector].unshift({ "won": score, "chances" : 3 - chances});
        console.log(data['games']);
        localStorage.setItem(player, JSON.stringify(data));
    }

}