

const btnMenu = document.querySelector("#btn-menu");

const menuList = document.querySelector ("#menu-list");

btnMenu.addEventListener("click", () =>{

    menuList.classList.toggle("mostrar")
})













// $(document).ready(main);

// var contador = 1;

// function main () {
//     $('.menu-bar').click(function(){
//         if(contador == 1){
//             $('nav').animate({
//                 left:'0'
//             });
//             contador = 0;
//         } else{
//             contador = 1;
//             $('nav').animate({
//                 left:'-100%'
//             })
//         }
//     })

//     // Mostramos y ocultamos submenus
//     $('.submenu').click(function(){
//         $(this).children('.children').slidetoggle();
//     })





// }
