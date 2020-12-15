export default () => {
    const viewStaff = `
    <section class="staff" >
        <div class="box-staff">
            <div class="portada-staff">
                <h2>NUESTRO STAFF</h2>
                <img class="portada" src="../assets/staff.jpg">
            </div>
        </div>

        <div class="box-staff1">
            <div class="descrip-staff">
                <h2>Max Alfaro Ramírez</h2>
                <p>Ingeniero Civil de la Universidad Ricardo Palma cuenta con una Especialización
                en Gestión Inmobiliaria (Universidad del Pacifico, Perú), Administración del Riesgo 
                Crediticio (Universidad ESAN, Perú) Cuenta con 15 años de experiencia en el rubro 
                de la construcción y de las tasaciones; con participación en Proyectos de Diseño; 
                Gerencia y Supervisión de edificios de viviendas, edificios comerciales, edificios 
                industriales, casas de campo, cuidad y playa, maquinaria, inventarios. Amplia 
                experiencia en Tasaciones experiencia adquirida como encargado del área de Tasaciones 
                de uno de los principales Bancos del Perú.</p>
            </div>
        </div>



        <div class="box-staff2">
            <div class="descrip-staff">
                <h2>Maurice Calmet Williams</h2>
                <p>Ingeniero Civil de la Universidad Nacional de Ingeniería con 10 años de experiencia 
                en supervisión de obras civiles y tasaciones gestionando valuaciones de bienes muebles 
                e inmuebles, tasaciones NIIF, monitoreo de obras y estudios de viabilidad. Ha desempeñado 
                cargos como Analista del área de Tasaciones de un importante banco del Perú y como Jefe Técnico 
                de Tasaciones en conocidas empresas del sector.</p>
            </div>
        </div>


        <div class="box-staff1">
            <div class="descrip-staff">
                <h2>Sergio Alfaro Ramírez</h2>
                <p>Ingeniero Industrial de la Universidad de Lima con estudios de post grado en Gestión 
                Integral de Residuos Sólidos Urbanos (Ayuntamiento de Madrid, España), Gestión Pública 
                (Universidad del Pacifico, Perú), Maestría en Gerencia Industrial con especialización 
                en Transportes y Logística (Universidad Católica de Lovaina, Bélgica) y con 10 años de 
                experiencia en Gestión Logística trabajando. Trabajó como Evaluador de proyectos de inversión 
                del Ministerio de Educación - Oficina de Infraestructura Educativa. Tasador con 10 años de 
                experiencia en Valuación de bienes inmuebles, vehículos, líneas de producción del sector 
                textil e industrial, inventarios, maquinaria y equipos.</p>
            </div>
        </div>

        
        <div class="box-staff2">
            <div class="descrip-staff">
                <h2>Luis Alfaro Jiménez</h2>
                <p>Arquitecto de la Universidad Nacional del Centro con estudios de post grado en Formulación 
                y Evaluación de Proyectos de Inversión (Universidad Ricardo Palma, Perú). Experiencia de 45 años 
                en el medio de la construcción, con participación en proyectos, ejecución y supervisión de 
                edificios de viviendas, edificios comerciales, edificios industriales, casas de campo, cuidad 
                y playa y centros de estudios con más de 350 mil m2 de área construida.</p>
            </div>
        </div>

    
        <div class="box-staff1">
            <div class="descrip-staff">
                <h2>Andrés Ernesto Gómez Garcés</h2>
                <p>Ingeniero Civil con más de 10 años de experiencia en manejo de personal, manejo de contratistas 
                y proveedores, estimación y control de costos, programación de actividades, relación directa con el 
                cliente, control de contratos, coordinación de Diseños, seguimiento y obtención de trámites ante 
                entidades distritales y curadurís.</p>
            </div>
        </div>


        <div class="box-staff2">
            <div class="descrip-staff">
                <h2>Patricia del Carmen Valdivia Verástegui</h2>
                <p>Arquitecta con doce (12) años de experiencia en el área de construcción y proyectos inmobiliarios, 
                gestión del saneamiento inmobiliario desde la pre construcción hasta la inscripción en registros públicos. 
                Cuenta con capacidad para manejo de personal, negociación con clientes internos y externos, manejo de 
                costos y presupuestos de obra, así como diseño para acabados en construcción y decoración.</p>
            </div>  
        </div>

    
    </section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewStaff;

        return sectionElem;
}