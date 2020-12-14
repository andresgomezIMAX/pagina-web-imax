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

        <section class="servicios">
            <p class="title">Nuestros Servicios</p>
            <div class="box-services">
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/tasaciones.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Tasaciones</p>
                    </div>
                </div>
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/valuaciones.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Valuaciones NIIF</p>
                    </div>
                </div>
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/monitoreo.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Monitoreo de Obras</p>
                    </div>
                </div>
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/viabilidad.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Estudios de Viabilidad</p>
                    </div>
                </div>
            </div>
            <div class="box-services">
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/supervisiones.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Supervisiones</p>
                    </div>
                </div>
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/gerencia.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Gerencia de Proyectos</p>
                    </div>
                </div>
                <div class="box-btn">
                    <div class="div-servicios">
                        <input type="image" src="../assets/desarrollo.png" class="btn-imagen">
                        <!-- <button class="btn-imagen"></button> -->
                        <p>Desarrollo Integral de Proyectos</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="clientes">
            <p>Nuestros Clientes</p>
            <div class="box-clientes">
                <img src="../assets/client1.jpg">
                <img src="../assets/client2.jpg">
            </div>
        </section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewHome;

        return sectionElem;
}