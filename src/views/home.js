export default () => {
    const viewHome = `
    <section>
    <div class="slider">
        <ul>
            <li><img src="../assets/construction-site.jpg"></li>
            <li><img src="../assets/home-slide-1.jpg"></li>
            <li><img src="../assets/home-slide-3.jpg"></li>
            <li><img src="../assets/monitoreo.jpg"></li>
        </ul>
    </div>
    </section>
    <section >
        <div class="lema">
            <p>Nos caracterizamos por ser una empresa que brinda a sus clientes 
                un servicio de máxima calidad, íntegro y personalizado.</p>
        </div>
        
    </section>

    <section class="servicios" >
        <p class="title">Nuestros Servicios</p>
        <div class="box-services">
            <div class="box-btn">
                <div class="div-servicios">                   
                    <a href="#" class="cta"><input type="image" src="../assets/tasaciones.png" class="btn-imagen"></a>
                    <p>Tasaciones</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="../assets/valuaciones.png" class="btn-imagen"></a>
                    <!-- <button class="btn-imagen"></button> -->
                    <p>Valuaciones NIIF</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="../assets/monitoreo.png" class="btn-imagen"></a>
                    <!-- <button class="btn-imagen"></button> -->
                    <p>Monitoreo de Obras</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="../assets/viabilidad.png" class="btn-imagen"></a>
                    <!-- <button class="btn-imagen"></button> -->
                    <p>Estudios de Viabilidad</p>
                </div>
            </div>
        </div>    
        <div class="box-services">
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="../assets/supervisiones.png" class="btn-imagen"></a>
                    <!-- <button class="btn-imagen"></button> -->
                    <p>Supervisiones</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="../assets/gerencia.png" class="btn-imagen"></a>
                    <!-- <button class="btn-imagen"></button> -->
                    <p>Gerencia de Proyectos</p>
                </div>
            </div>
            <div class="box-btn">
                <div class="div-servicios">
                    <a href="#" class="cta"><input type="image" src="../assets/desarrollo.png" class="btn-imagen"></a>
                    <!-- <button class="btn-imagen"></button> -->
                    <p>Desarrollo Integral de Proyectos</p>
                </div>
            </div>
        </div>
        <div class="modal-container">
            <div class="modal modal-close">
            <p class="close">X</p>
            <img src="../assets/home-big.jpg">
            <div class="modal-textos">
                <h2> titulo1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil error obcaecati animi ipsum doloremque 
                    molestias nesciunt est ea veniam ut enim consequuntur esse, neque repellendus fugit illum aperiam quo ducimus?</p>
            </div>
            </div>
        </div>

    </section>

    <section class="informacion">
        <p class="title">Datos IMAX</p>
        <div class="box-info">
            <p>Más de 40 proyectos promedio mensuales Monitoreados al año con diferentes entidades financieras:</p>
            <img src="../assets/info.png">
        </div>
    </section>

    

    <section class="clientes">
        <p class="title">Nuestros Clientes</p>
        <div class="box-clientes">
            <img src="../assets/client1.jpg">
            <img src="../assets/client2.jpg">
        </div>
        <div class="box-clientes">
            <img src="../assets/client3.jpg">
            <img src="../assets/client4.jpg">
        </div>
    </section>


    <div class="contenedorSubir" >
        <div class="botonSubir">
            <img src="../assets/flecha-arriba.png" alt="subir">
        </div> 
    </div>  
    
    `

    const sectionElem = document.createElement('div');
    sectionElem.innerHTML = viewHome;

    const abrir = sectionElem.querySelectorAll(".cta")[0];
    const abrir1 = sectionElem.querySelectorAll(".cta")[1];
    const abrir2 = sectionElem.querySelectorAll(".cta")[2];
    const abrir3 = sectionElem.querySelectorAll(".cta")[3];
    const abrir4 = sectionElem.querySelectorAll(".cta")[4];
    const abrir5 = sectionElem.querySelectorAll(".cta")[5];
    const abrir6 = sectionElem.querySelectorAll(".cta")[6];

    const array = [abrir, abrir1, abrir2, abrir3, abrir4, abrir5, abrir6]

    let cerrar = sectionElem.querySelector(".close");
    let modal = sectionElem.querySelector(".modal");
    let modalC = sectionElem.querySelector(".modal-container");

    array.forEach((abrir) => {
        abrir.addEventListener("click", (e) => {
            e.preventDefault();
            modalC.style.opacity = "1";
            modalC.style.visibility = "visible";
            modal.classList.toggle("modal-close");
        })
    });
    

    cerrar.addEventListener("click", () => {
        modal.classList.toggle("modal-close");

        setTimeout(() => {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 600)
    });

    window.addEventListener("click", (e) => {
        console.log(e.target)
        if (e.target == modalC) {
            modal.classList.toggle("modal-close");

            setTimeout(() => {
                modalC.style.opacity = "0";
                modalC.style.visibility = "hidden";
            }, 900)
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
};