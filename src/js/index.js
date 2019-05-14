import $ from 'jquery';
import game from './game.js';

const initDataActions = () => {

    $(document).on('click', '[data-action="game:start"]', () => {

        if (!game.isStarted) {
            game.start();
        } else {
            game.stop();
        }
    });

    $(document).on('click', '[data-action="figure:set"]', (e) => {
        $(e.target).css('opacity', '.3');
        if (game.isStarted && game.isPaused) {
            game.getPlayerSequence($(game.figures).index(e.target));
        }
    });

    $(document).on('mousemove', '[data-action="figure:set"]', (e) => {
        if (game.isStarted && game.isPaused) {
            $(e.target).css('opacity', '1');
        }
    });

    $(document).on('mouseout', '[data-action="figure:set"]', (e) => {
        if (game.isStarted && game.isPaused) {
            $(e.target).css('opacity', '.3');
        }
    });

    // Modal.

    $(document).on('click', '[data-action="modal:close"]', () => {
        $('.modal').fadeOut(150);
        
    });
}

initDataActions();

// console.log($);

