export default () => {
  const viewSomos = `
    <section class="course-banner">
      <img src="./assets/video.png">
      <div class="circle-overlay">
        <div class="gs-banner-content">
          <div>
              <p>Te invitamos a que conozcas <br> mas de IMAX, 
                a travéz de <br> nuestro video institucional. <br>  <br>  <br>Click aquí: </p>
          </div>
        </div>
        <div class="play-button-container"> 
        <a aria-label="Play course trailer" class="circle-play-button" href="#">
        <div class="circle"> <i class="fas fa-play"></i> </div>
        </a>
        </div>
      </div>

      <div class="modal-container-video">
        <div class="modalVideo modal-closeVideo">
          <p class="closeVideo">X</p>
          <iframe src="https://www.youtube.com/embed/uK6rxOvwIzA" controls load class="video" frameborder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </section>
    
   
    <section class="nosotros">
    <div class="box-nosotros">
        
        <div class="descripcion">
            <h2>¿QUIÉNES SOMOS?</h2> <br>
            <p>Somos una empresa dedicada a la Consultoría en Ingeniería, 
            Arquitectura, Gestión Inmobiliaria y Diseño y Desarrollo de 
            Proyectos con ocho años de experiencia en el manejo de 
            supervisiones de proyectos de mediana y gran escala, 
            tasaciones, desarrollo integral y gerencia de proyectos tanto 
            en Lima como en provincias.
            
            Brindamos servicios vinculados al sector inmobiliario a 
            través de nuestras principales unidades de negocio a la 
            velocidad que el mercado lo requiera.</p>
        </div>
        <img class="img-nosotros" src="./assets/somos.jpg"> 
    </div> 

    <div class="box-nosotros">
        <img class="img-nosotros1" src="./assets/mision.jpg">
        <div class="descripcion">
            <h2>MISION</h2> <br>
            <p>Asumir la necesidad del cliente como propia para brindarle 
            la mejor solución enfocados en la optimización de los recursos
            de nuestras unidades de negocio.</p>
            <h2>VISION</h2> <br>
            <p>Convertirnos en el aliado estratégico de cada uno de nuestros 
            clientes ofreciéndoles soluciones integrales que lideren el 
            mercado inmobiliario.</p>
        </div>
        <img class="img-nosotros2" src="./assets/mision.jpg">
    </div>

    <div class="box-nosotros">
        
        <div class="descripcion">
            <h2>VALORES</h2> <br>
            <p>Los valores son los pilares del éxito de toda empresa y que 
            caracterizan a cada una de las personas que la conforman. 
            Por ello, el Equipo IMAX reafirma sus valores en: <br>
            
            🔹Llevamos la calidad al máximo.<br>
            🔹Somos íntegros y auténticos.<br>
            🔹Desarrollamos la autocrítica con espíritu de superación.<br>
            🔹Estamos comprometidos con nuestros colaboradores y 
                 con el medio ambiente.<br>
            🔹Tenemos constancia para crecer juntos.</p>
        </div>
        <img class="img-nosotros" src="./assets/valores.jpg">  
    </div>
</section>
<div class="contenedorSubir" >
<div class="botonSubir">
    <img src="./assets/flecha-arriba.png" alt="subir">
</div> 
</div> `

  const sectionElem = document.createElement('div');
  sectionElem.innerHTML = viewSomos;

  const abrirModal = sectionElem.querySelectorAll(".circle-play-button")[0];
  const cerrarModal = sectionElem.querySelectorAll(".closeVideo")[0];
  const modalVideo = sectionElem.querySelectorAll(".modalVideo")[0];
  const modalCvideo = sectionElem.querySelectorAll(".modal-container-video")[0];
  const video = sectionElem.querySelectorAll(".video")[0];
  console.log('jajajaaj' + video.src)



  abrirModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalCvideo.style.opacity = "1";
    modalCvideo.style.visibility = "visible";
    modalVideo.classList.toggle("modal-closeVideo");
  })



  cerrarModal.addEventListener("click", () => {
    modalVideo.classList.toggle("modal-closeVideo");
      modalCvideo.style.opacity = "0";
      modalCvideo.style.visibility = "hidden";
      
  });

  window.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target == modalCvideo) {
      modalVideo.classList.toggle("modal-closeVideo");
        modalCvideo.style.opacity = "0";
        modalCvideo.style.visibility = "hidden";
        
    }
  })


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
}