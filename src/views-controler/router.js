import { components } from '../views/index.js';

const changeView = (hash) => {
    const id = hash.split('/')[1];
    const sectionMain = document.getElementById('container');
    sectionMain.innerHTML = '';
   switch (hash) {
       case '': 
       case '#':
       case '#/':
            { return sectionMain.appendChild(components.home()); }
 
       case '#/nosotros': 
       case '#/staff': 
       case '#/servicios':
            { return sectionMain.appendChild(components[id]()); } 
   
       default:
        { return sectionMain.appendChild(components.different()); }
   }
   console.log(hash)
}

export { changeView}