$(document).ready(() =>  {

    let game = new Game();

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
            game.recordResult();
            // Mostar la ventana modal
            $('.modal').addClass('active');
            // Asignar el texto de la ventana
            $('.modal-title').text(title);
            //Llenar la tabla
            // ------- Remplazar por el jugador que tenga registrado GAME
            let [wins, losses, games] = game.getPlayerScore();
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

    $('#btn-again').click(() => {
        game.restart();
        $('.modal').removeClass('active');
        updateText('#chances', `Tiros restantes: ${game.chances}`);
    });

    $('#btn-register').click(() => {
        const user_name = $('#user-name').val();
        const user_initials = $('#user-initials').val();
        const user_date = $('#user-date').val();
        if(localStorage.getItem(user_initials) !== null) {
            alert('Ya esta registrado');
            window.location.href = "index.html";
            return;
        }
        if(game.register(user_name, user_initials, user_date)) {
            sessionStorage.setItem('user', user_initials);
            alert('Registro exitoso');
            window.location.href = "gameSelection.html";
        }
    });

    $('#btn-login').click(() => {
        console.log('login');
        const user_initials = $('#login-initials').val();
        if(game.logIn(user_initials)){
            window.location.href = "gameSelection.html";
            sessionStorage.setItem('user', user_initials);
            return;
        }
        alert('No estas registrado');
    });
});

function updateText(id, text){
    $(id).text(text);
}





