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
       case '#/proyectos':
       case '#/contacto':
       case '#/intranet':
          case '#/intranet':

            { return sectionMain.appendChild(components[id]()); } 
   
       default:
        { return sectionMain.appendChild(components.different()); }
   }

}


const changeViewIntranet = (hash) => {
     const id = hash.split('/')[1];
     const sectionMain = document.getElementById('intranet');
     sectionMain.innerHTML = '';
    switch (hash) {
     //    case '': 
     //    case '#':
     //    case '#/':
     //         { return sectionMain.appendChild(components.home()); }
  
        case '#/noticias': 
     //    case '#/staff': 
     //    case '#/proyectos':
     //    case '#/contacto':
             { return sectionMain.appendChild(compIntranet[id]()); } 
    
        default:
         { return sectionMain.appendChild(compIntranet.different()); }
    }
 
 }

export { changeView, changeViewIntranet}