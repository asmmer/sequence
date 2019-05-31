import $ from 'jquery';

export default class View {

    constructor() {

        this.box = $('.box');
        this.figures = this.box.children('.item');
        this.startButton = $('#button_start');
        this.tipTitle = $('.tip-title');

        $(document).on('enable', (e, data) => {
            this.enable(data.counter, data.num);
        });
        $(document).on('disable', (e, counter) => {
            this.disable();
        });
        $(document).on('start', () => {
            this.start();
        });
        $(document).on('restart', () => {
            this.restart();
        });
        $(document).on('stop', (e, score) => {
            this.stop(score);
        });
        $(document).on('pause', () => {
            this.pause();
        });

    }

    disable() {
        this.figures.css('opacity', '.3');
    }

    enable(counter, num) {
        $(this.figures[counter]).css('opacity', '1');
        $(this.tipTitle).text(`${num}`);
    }

    start() {
        $(this.startButton).text('Stop');
    }

    restart() {

    }

    pause() {
        this.tipTitle.text(`Your move`);
    }

    stop(score) {
        this.figures.css('opacity', '.3');
        this.tipTitle.text(`Press start`);
        this.startButton.text('Start');

        $('.score-text').text(`${score}`);

        $('.modal').fadeIn(150).css('display', 'flex');
    }
}