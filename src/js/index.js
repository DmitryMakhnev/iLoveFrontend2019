import '../styles/default.scss';


import { ImagePreview } from './ui/ImagePreview';


const fileInput = /** @type {HTMLInputElement} */ document.querySelector('.fileInput');
const output = /** @type {HTMLDivElement} */ document.querySelector('.output');

new ImagePreview(fileInput, output);




