export default () => {
    const viewSomos = `
   
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
        <img class="img-nosotros" src="../assets/somos.jpg"> 
    </div> 

    <div class="box-nosotros">
        <img class="img-nosotros1" src="../assets/mision.jpg">
        <div class="descripcion">
            <h2>MISIóN</h2> <br>
            <p>Asumir la necesidad del cliente como propia para brindarle 
            la mejor solución enfocados en la optimización de los recursos
            de nuestras unidades de negocio.</p>
            <h2>VISIóN</h2> <br>
            <p>Convertirnos en el aliado estratégico de cada uno de nuestros 
            clientes ofreciéndoles soluciones integrales que lideren el 
            mercado inmobiliario.</p>
        </div>
        <img class="img-nosotros2" src="../assets/mision.jpg">
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
        <img class="img-nosotros" src="../assets/valores.jpg">  
    </div>
        
</section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewSomos;

        

        return sectionElem;
}