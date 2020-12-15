export default () => {
    const viewServicios = `
    <img class="portada" src="../assets/portada-servicios.jpg">
    <section class="servicios" >
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
</section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewServicios;

        return sectionElem;
}