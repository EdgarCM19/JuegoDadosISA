$(document).ready(() =>  {

    let game = new Game();

    // Registro de prueba para usuario
    // localStorage.setItem('user', JSON.stringify({
    //     data: {},
    //     games: {
    //         easy: [
    //             {
    //             won: true,
    //             chances: 2
    //             }
    //         ],
    //         mid: [

    //         ],
    //         hard: [

    //         ],
    //     }
    // }));
    // console.log('Loaded')

    updateText('#chances', `Tiros restantes: ${game.chances}`);

    $('#btn-easy').click(() => {
        game.selectLevel(1);
    });

    $('#btn-mid').click(() => {
        game.selectLevel(2);
    });

    $('#btn-hard').click(() => {
        game.selectLevel(3);
    });

    //Boton de lanzar
    $('#btn-throw').click(() => {
        if(game.chances == 0) return
        if(!game.play()) {
            let title = game.result ? 'Ganaste' : 'Perdiste';
            // Registro del juego
            game.register('user', game.level);
            // Mostar la ventana modal
            $('.modal').addClass('active');
            // Asignar el texto de la ventana
            $('.modal-title').text(title);
            //Llenar la tabla
            // ------- Remplazar por el jugador que tenga registrado GAME
            let [wins, losses, games] = game.getPlayerScore('user', game.level);
            console.log(wins)
            $('#score-wins').text(`Ganados ${wins}`);
            $('#score-losses').text(`Perdidos: ${losses}`);
            games.forEach(e => {
                $('#table-body').append(`
                    <tr>
                        <td>
                            ${e['won'] ? 'Ganado' : 'Perdido'}
                        </td>
                        <td>
                            ${e['chances']}
                        </td>
                    </tr>
                `)
            });
        }
        updateText('#chances', `Tiros restantes: ${game.chances}`);
    });

    // $('#close-modal').click(() => {
    //     $('.modal').removeClass('active');
    // });

    $('#btn-again').click(() => {
        game.restart();
        $('.modal').removeClass('active');
        updateText('#chances', `Tiros restantes: ${game.chances}`);
    })

});

function updateText(id, text){
    $(id).text(text);
}





