export default class Model {

    constructor() {
        this.interval = 1000;
    }

    generateSequence(length){

        this.sequence = '';

        for (let i = 0; i < length + 1; i++){
            const figure_num = this.getRandomInt(0, 4);
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
        
        document.dispatchEvent(new Event('start'));

        this.isStarted = true;
        this.isPaused = false;
        this.sequence = '';
        this.playerSequence = '';
  
        let counter = 0;

        this.generateSequence(this.sequence.length);

        this.timer = setInterval(() => {

            if (!this.isPaused) {

                setTimeout(() => {
                    document.dispatchEvent(new Event('disable'));    
                }, this.interval / 2);

                document.dispatchEvent(new CustomEvent('enable', {
                    detail: {
                        counter: this.sequence[counter],
                        num: counter + 1
                    }
                }));

                counter++;

                if (counter == this.sequence.length) {
                    counter = 0;
                    this.isPaused = true;

                    setTimeout(() => {
                        document.dispatchEvent(new Event('pause'));     
                    }, this.interval);
                }
            }

        }, this.interval);
    }

    stop() {

        // Reset start values.     
        clearInterval(this.timer);

        document.dispatchEvent(new CustomEvent('stop', {
            detail: {
                score: this.sequence.length - 1
            }
        }));

        this.isStarted = false;
        this.isPaused = true;
        this.sequence = '';
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}