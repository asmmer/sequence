import $ from 'jquery';

export default class Game {

    constructor() {

        this.box = $('.box');
        this.figures = this.box.children('.item');
        this.startButton = $('#button_start');
        this.tipTitle = $('.tip-title');
        this.interval = 1000;
    }

    generateSequence(length){

        this.sequence = '';

        for (let i = 0; i < length + 1; i++){
            const figure_num = this.getRandomInt(0, this.figures.length);
            this.sequence += String(figure_num);
        }
    }

    getPlayerSequence(figure_num) {

        this.playerSequence += String(figure_num);

        if (this.checkPlayerSequence()){
            if (this.playerSequence.length == this.sequence.length){ // Go to new level.
                this.playerSequence = '';
                this.isPaused = false;
                this.generateSequence(this.sequence.length);
            }
        } else {
            this.stop();
        }
    }

    checkPlayerSequence() {
        return this.playerSequence === this.sequence.substr(0, this.playerSequence.length) ;
    }

    start() {

        // Set start values.   
        this.startButton.text('Stop');
        this.isStarted = true;
        this.isPaused = false;
        this.sequence = ''; // Sequence string.
        this.playerSequence = ''; // Player sequence string.

        // Game logic.     
        let counter = 0;

        this.generateSequence(this.sequence.length);

        this.timer = setInterval(() => {



            if (!this.isPaused) {


                setTimeout(() => {
                    this.figures.css('opacity', '.3');           
                }, this.interval / 2);

                $(this.figures[this.sequence[counter]]).css('opacity', '1');

                counter++;

                this.tipTitle.text(`${counter}`);

                if (counter == this.sequence.length) {
                    counter = 0;
                    this.isPaused = true;

                    setTimeout(() => {
                        this.tipTitle.text(`Your move`);
                    }, this.interval);
                }
            }

        }, this.interval);
    }

    stop() {

        // Reset start values.     
        clearInterval(this.timer);

        this.figures.css('opacity', '.3');       
        this.tipTitle.text(`Press start`);
        this.startButton.text('Start');
        this.isStarted = false;
        this.isPaused = true;

        $('.modal').fadeIn(150).css('display', 'flex');
        $('.score-text').text(`${this.sequence.length - 1}`);

        this.sequence = '';
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}