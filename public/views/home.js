export default () => {
    const viewHome = `
   
    <section>
    <div class="slider-fotos">
        <ul>
            <li>
                <div class="slid1">
                    <div class="space-logo">   
                        <img src="./assets/logo-imax.png">
                    </div>
                </div>
            </li>
            <li>
                <div class="slid2">
        
                    <div class="space-white1">
                        <p>LO ASESORAMOS MEJOR</p>
                    </div>
                    <div class="space-white2">
                        <p>PORQUE CONOCEMOS EL</p>
                        <p>SECTOR INMOBILIARIO DESDE</p>
                        <p>DENTRO</p>
                    </div>
             
                  
                </div>
            </li>
            <li>
                <div class="slid3">
                    <div class="space-lema">
                        <div class="box-lema1"> <p>NOS ADECUAMOS</p> <p>A SUS NECESIDADES</p> </div>
                        <div class="box-lema2"> <p>PARA ENTREGARLE</p> <p>SOLUCIONES DE LA</p> <p>MÁS ALTA CALIDAD</p> </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="slid4">
                    <div class="space-lema">
                        <div class="box-lema1"> <p>NOS</p> <p>COMPROMETEMOS</p> </div>
                        <div class="box-lema2"> <p>TRABAJAMOS</p> <p>CADA PROYECTO CON</p>  <p>PROFESIONALISMO Y</p> <p>DEDICACIÓN</p></div>
                    </div>
                 </div>
            </li>
        </ul>
    </div>
    </section>
    <!--<div class="contenedorVideo">
        <div class="pantallaVideo modal-closeVideo">
          <p class="closeVideo">X</p>
          <iframe src="https://www.youtube.com/embed/uK6rxOvwIzA" controls load class="video" frameborder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>-->

    <section class="background-image">
        <section  class="information-cards">
            <div class="card">
                <div class="side front"><p>Brindando soluciones desde el <strong>2008</strong></p></div>
                <div class="side back"><p><strong>IMAX</strong> siempre vamos por + </p></div>
            </div>
            <div class="card">
                <div class="side front1"><p>41 proyectos supervisados en el 2020</p></div>
                <div class="side back1"><p><strong>246,514.84 </strong> metros supervisados</p></div>
            </div>
            <div class="card">
                <div class="side front"><p><strong>7299</strong> Und tasadas en los últimos tres años</p></div>
                <div class="side back"><p>2018=<strong>2322un</strong>  2019=<strong>3032un</strong>  2020=<strong>1945un</strong></p></div>
            </div>
            <div class="card">
                <div class="side front1"><p>más de <strong>40</strong> proyectos mensuales monitoreados al año</p></div>
                <div class="side back1"><p>Brindando soluciones desde el <strong>2008</strong></p></div>
            </div>
        </section>

        <section  class="servicios">
            <div class="box-line"><p>Nuestros Servicios</p></div>
            
            <div class="box-services">
                <div class="box-squares">
                    <div class="squares"><div class="space-white"><p>Tasaciones (TAS)</p></div></div>
                    <div class="squares1"><div class="space-white"><p>Valuaciones, Peritajes y Consultoría (VPC)</p></div></div>
                </div>
                <div class="box-squares">
                    <div class="squares2"><div class="space-white"><p>Gestios y Desarrollo de Proyectos (GDP)</p></div></div>
                    <div class="squares3"><div class="space-white"><p>Evaluación y Monitoreo de Proyectos (EMP)</p></div></div>
                    <div class="squares4"><div class="space-white"><p>Gestión y Supervisión de Obras (GSO)</p></div></div>
                </div>
            </div>
        </section>
    
    </section>

    <section class="background-image1">
        <section class="projects">
            <div class="box-line">Ultimos Proyectos</div>
            <div class="box-card-projects">
                <div class="card-project"><img class="img-project" src="./assets/proyectos1.png"> <div><p>SUPERVISIÓN ALTAIR</p> </div></div>
                <div class="card-project"><img class="img-project" src="./assets/proyectos2.png"> <div><p>TASACION URBANIA</p> </div></div>
                <div class="card-project"><img class="img-project" src="./assets/proyectos3.png"> <div><p>SUPERVISIÓN URBALIMA</p> </div></div>
                <div class="card-project"><img class="img-project" src="./assets/proyectos4.png"> <div><p>SUPERVISIÓN PARQUES</p> </div></div>
           
            </div>
            <div class="box-link-projects"> <a href="#/proyectos">VER MÁS PROYECTOS </a></div>
        </section>
    </section>
   
    

    

    <!--<section class="servicios" >
        <p class="title">Nuestras Unidades de Negocio</p>
        <div class="box-services">
            <div class="box-btn">
                <div class="div-servicios">                   
                    <a href="#" class="cta"><input type="image" src="./assets/tasaciones.png" class="btn-imagen"></a>
                    <p>Tasaciones y valuaciones</p>
                </div>
            </div>
           
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="./assets/monitoreo.png" class="btn-imagen"></a>
                    <p>Evaluación y seguimiento de Proyectos</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="./assets/supervisiones.png" class="btn-imagen"></a>
                
                    <p>Gerencia y Supervision de obras</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="./assets/gerencia.png" class="btn-imagen"></a>
               
                    <p>Gerencia de Proyectos</p>
                </div>
            </div>
            
        </div>    

        <div class="modal-container">
            <div class="modal modal-close">
            <p class="close">X</p>
            <img src="./assets/home-big.jpg">
            <div class="modal-textos">
                <h2> titulo1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil error obcaecati animi ipsum doloremque 
                    molestias nesciunt est ea veniam ut enim consequuntur esse, neque repellendus fugit illum aperiam quo ducimus?</p>
            </div>
            </div>
        </div>

    </section> -->

    

    <!--<section class="servicios" >
    <p class="title">Nuestras Unidades de Negocio</p>

        <img class="ruleta" src="./assets/unidadesNegocio.png">
        <h1 class="title" >Nuestras Unidades de Negocio</h1>
        <div class="grafico"> 
            <canvas width="50" height="50" id="dibujito" class="dibujito"></canvas>
        </div>

    </section>-->
 

    <!-- <section class="informacion">
        <p class="title">Datos IMAX</p>
        <p class="text-desc">Más de 40 proyectos promedio mensuales Monitoreados al año con diferentes entidades financieras<p>
      <ul class="slider">
            <li>
                <input type="radio" id="sbutton1"  name="sradio" checked >
                <label for="sbutton1"></label>
                <img src="./assets/info.png">
            </li>
            <li>
                <input type="radio" id="sbutton2"  name="sradio">
                <label for="sbutton2"></label>
                <img src="./assets/info3.png">
            </li>
            <li>
                <input type="radio" id="sbutton3"  name="sradio">
                <label for="sbutton3"></label>
                <img src="./assets/info2.jpg">
            </li>
            <li>
                <input type="radio" id="sbutton4"  name="sradio">
                <label for="sbutton4"></label>
                <img src="./assets/info.png">
            </li>
      </ul>
    </section>-->



    

    <section class="clientes">
        <p class="title">Nuestros Clientes</p>
        <div class="box-clientes">
            <img src="./assets/client1.jpg">
            <img src="./assets/client2.jpg">
        </div>
        <div class="box-clientes">
            <img src="./assets/client3.jpg">
            <img src="./assets/client4.jpg">
        </div>
    </section>

    <div class="contenedorVid">
        <div class="videoUrl">
    <iframe  src="https://www.youtube.com/embed/uK6rxOvwIzA" controls load class="video" frameborder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>


    <div class="contenedorSubir" >
        <div class="botonSubir">
            <img src="./assets/flecha-arriba.png" alt="subir">
        </div> 
    </div>  
    
    `

    const sectionElem = document.createElement('div');
    sectionElem.innerHTML = viewHome;

    // const abrir = sectionElem.querySelectorAll(".cta")[0];
    // const abrir1 = sectionElem.querySelectorAll(".cta")[1];
    // const abrir2 = sectionElem.querySelectorAll(".cta")[2];
    // const abrir3 = sectionElem.querySelectorAll(".cta")[3];


    // const array = [abrir, abrir1, abrir2, abrir3]

    // let cerrar = sectionElem.querySelector(".close");
    // let modal = sectionElem.querySelector(".modal");
    // let modalC = sectionElem.querySelector(".modal-container");

    // array.forEach((abrir) => {
    //     abrir.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         modalC.style.opacity = "1";
    //         modalC.style.visibility = "visible";
    //         modal.classList.toggle("modal-close");
    //     });
    // });

    // cerrar.addEventListener("click", () => {
    //     modal.classList.toggle("modal-close");
    //     setTimeout(() => {
    //         modalC.style.opacity = "0";
    //         modalC.style.visibility = "hidden";
    //     }, 600)
    // });

    // window.addEventListener("click", (e) => {
    //     console.log(e.target)
    //     if (e.target == modalC) {
    //         modal.classList.toggle("modal-close");

    //         setTimeout(() => {
    //             modalC.style.opacity = "0";
    //             modalC.style.visibility = "hidden";
    //         }, 900)
    //     }
    // });

    //     // PARA EL VIDEO

    //     const cerrarModal = sectionElem.querySelectorAll(".closeVideo")[0];
    //     const modalVideo = sectionElem.querySelectorAll(".pantallaVideo")[0];
    //     const modalCvideo = sectionElem.querySelectorAll(".contenedorVideo")[0];
    //     const video = sectionElem.querySelectorAll(".video")[0];

    //     cerrarModal.addEventListener("click", () => {
    //         modalVideo.classList.toggle("modal-closeVideo");
    //           modalCvideo.style.opacity = "0";
    //           modalCvideo.style.visibility = "hidden";
    //           video.src = "";
    //       });

    //    window.addEventListener("click", (e) => {
    //     console.log(e.target)
    //     if (e.target == modalCvideo) {
    //       modalVideo.classList.toggle("modal-closeVideo");
    //         modalCvideo.style.opacity = "0";
    //         modalCvideo.style.visibility = "hidden";
    //         video.src = "";
    //     }
    //     });

    // // codigo para el grafico en servicios
    // const d = sectionElem.querySelector('#dibujito');
    // const lienzo = d.getContext("2d");

    // console.log(lienzo);

    // const myChart = new Chart  (lienzo, {
    //     type: 'pie',
    //     data: {
    //         labels:[
    //             "Innovación", "Marketing", "Proyectos", "Supervisión", "Tasaciones","Finanzas", "Industria y Seguridad"
    //         ],
    //         datasets: [{
    //             data:[
    //                 5.94,3,11.82,11.82,11.82,0.06,0.18
    //             ],
    //             backgroundColor:[
    //                 '#404040',
    //                 '#ffc000',
    //                 '#5b9bd5',
    //                 '#70ad47',
    //                 '#ff0000',
    //                 '#d9d9d9',
    //                 '#acacac'

    //             ],
    //         }],


    //     },
    //     options: {
    //         responsive:true,
    //     }
    // });





    window.onscroll = () => {
        // console.log(document.documentElement.scrollTop);
        if (document.documentElement.scrollTop > 100) {
            sectionElem.querySelector('.contenedorSubir').classList.add('show');
        } else {
            sectionElem.querySelector('.contenedorSubir').classList.remove('show');
        }
    };
    sectionElem.querySelector('.contenedorSubir').addEventListener('click', () => {
        window.scrollTo({
            top: 0, // para que suba - inicio
            behavior: 'smooth', // para que le de un efecto suave al subir
        });
    });

    return sectionElem;
};