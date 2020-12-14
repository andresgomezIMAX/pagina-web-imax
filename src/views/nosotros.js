export default () => {
    const viewSomos = `
   
        <section >
            <div class="somos">
            <h2>¿QUIÉNES SOMOS?</h2>
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

            <br></br>

            <div class="mision">
            <h2>MISION</h2>
            <p>Asumir la necesidad del cliente como propia para brindarle 
            la mejor solución enfocados en la optimización de los recursos
            de nuestras unidades de negocio.</p>

            <h2>VISION</h2>
            <p>Convertirnos en el aliado estratégico de cada uno de nuestros 
            clientes ofreciéndoles soluciones integrales que lideren el 
            mercado inmobiliario.</p>
            </div>

            <br></br>
            <div class="valores">
            <h2>VALORES</h2>
            <p>Los valores son los pilares del éxito de toda empresa y que 
            caracterizan a cada una de las personas que la conforman. 
            Por ello, el Equipo IMAX reafirma sus valores en:
            
                Llevamos la calidad al máximo.
                Somos íntegros y auténticos.
                Desarrollamos la autocrítica con espíritu de superación.
                Estamos comprometidos con nuestros colaboradores y 
                con el medio ambiente.
                Tenemos constancia para crecer juntos.</p>
            </div>
            
        </section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewSomos;

        return sectionElem;
}