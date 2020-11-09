import '../styles/css/style.css';
import '../styles/scss/main.scss';
// import images from '../assets/image/bg.png';
import GemUi from './gem-ui';
import GemPuzzle from './gem-puzzle';

const UiGemPuzzle = new GemUi('mainEl');
const GameGemPuzzle = new GemPuzzle(2, 2, UiGemPuzzle);

console.log(GameGemPuzzle.width);
