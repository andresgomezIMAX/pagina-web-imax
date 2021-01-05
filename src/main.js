import { changeView } from './views-controler/router.js';

const init = () =>{
    changeView(window.location.hash)
    window.addEventListener('hashchange', ()=> changeView(window.location.hash))

}





window.addEventListener('load', init)
