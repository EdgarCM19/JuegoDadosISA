class Storage {

    static getPlayerScore(player, level){
        const data = JSON.parse(localStorage.getItem(player));
        const level_selector = level == 1 ? 'easy' :
                            level == 2 ? 'mid' :
                            level == 3 ? 'hard' : '';
        const level_score = data['games'][level_selector];
        const wins = level_score.reduce((prev, curr, index) => curr['won'] ? prev + 1 : prev, 0);
        const losses = level_score.length - wins;
        return [wins, losses, level_score];
    }

    static setPlayerScore(player, level, score, chances){
        const data = JSON.parse(localStorage.getItem(player));
        const level_selector = level == 1 ? 'easy' :
                            level == 2 ? 'mid' :
                            level == 3 ? 'hard' : '';
        data['games'][level_selector].unshift({ "won": score, "chances" : 3 - chances});
        localStorage.setItem(player, JSON.stringify(data));
    }


    static registerPlayer(user_name, user_initials, user_date){
        if(localStorage.getItem(user_initials) !== null) return false;
        localStorage.setItem(user_initials, JSON.stringify({
            "data": {
                name: user_name,
                date: user_date
            },
            "games": {
                "easy": [],
                "mid": [],
                "hard": []
            }
        }));

        return true;
    }

    static getPlayerData(user_initials){
        const data = JSON.parse(localStorage.getItem(user_initials));
        const name = data['data']['name'];
        const date = data['data']['date'];
        return [name, date];
    }

}