import { Slider } from './Slider';
import '../sass/main.scss'

const imageArray = [
        './assets/public/img/rpi.jpg',
        './assets/public/img/sushi.jpg',
        './assets/public/img/armtable.jpg'
]

const slider = new Slider(imageArray);
slider.initializeSlider();