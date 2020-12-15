export default () => {
    const viewHome = `
    <section>
    <div class="slider">
        <ul>
            
            <li><img src="../assets/_home-slide-1.jpg"></li>
            <li><img src="../assets/home-slide-2.jpg"></li>
            <li><img src="../assets/_home-slide-3.jpg"></li>
            <li><img src="../assets/home-slide-1.jpg"></li>
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
                    <h2> titulo</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil error obcaecati animi ipsum doloremque 
                        molestias nesciunt est ea veniam ut enim consequuntur esse, neque repellendus fugit illum aperiam quo ducimus?</p>
                </div>
            </div>
        </div>
       
    </section>

    <section class="clientes">
        <p class="title">Nuestros Clientes</p>
        <div class="box-clientes">
            <img src="../assets/client1.jpg">
            <img src="../assets/client2.jpg">
        </div>
    </section>`

    const sectionElem = document.createElement('div');
    sectionElem.innerHTML = viewHome;

    const abrir = sectionElem.querySelector(".cta");
    let cerrar = sectionElem.querySelector(".close");
    let modal = sectionElem.querySelector(".modal");
    let modalC = sectionElem.querySelector(".modal-container");

 
    abrir.addEventListener("click", (e) => {
        e.preventDefault();
        modalC.style.opacity = "1";
        modalC.style.visibility = "visible";
        modal.classList.toggle("modal-close");
    })

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


    return sectionElem;
};