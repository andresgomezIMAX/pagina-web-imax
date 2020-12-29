export default () => {
    const viewProyectos = `

    <section class="container-proyectos">
        <h2 class="title">Conoce nuestros proyectos</h2>
        <div class="box-proyectos"> 
            <div class="card-proyecto">
                <img class="img-proyecto" src="../assets/departamentos.jpg">
                <div class="info-proyecto">
                    <h3>Proyecto Miraflores</h3>
                    <p>Miraflores-Lima</p>
                </div>
            </div>
            <div class="card-proyecto">
                <img class="img-proyecto" src="../assets/departamentos.jpg">
                <div class="info-proyecto">
                    <h3>Proyecto Miraflores</h3>
                    <p>Miraflores-Lima</p>
                </div>
            </div>
            <div class="card-proyecto">
                <img class="img-proyecto" src="../assets/departamentos.jpg">
                <div class="info-proyecto">
                    <h3>Proyecto Miraflores</h3>
                    <p>Miraflores-Lima</p>
                </div>
            </div>
            <div class="card-proyecto">
                <img class="img-proyecto" src="../assets/departamentos.jpg">
                <div class="info-proyecto">
                    <h3>Proyecto Miraflores</h3>
                    <p>Miraflores-Lima</p>
                </div>
            </div>
            <div class="card-proyecto">
                <img class="img-proyecto" src="../assets/departamentos.jpg">
                <div class="info-proyecto">
                    <h3>Proyecto Miraflores</h3>
                    <p>Miraflores-Lima</p>
                </div>
            </div>
            <div class="card-proyecto">
                <img class="img-proyecto" src="../assets/departamentos.jpg">
                <div class="info-proyecto">
                    <h3>Proyecto Miraflores</h3>
                    <p>Miraflores-Lima</p>
                </div>
            </div>
        </div>
      
    </section>

    <img class="portada" src="../assets/portada-servicios.jpg">
    
    <section class="container-mapa">
        <h2 class="title">Ubica nuestros proyectos en todo el Perú</h2>
        <div class="box-mapa">
            <iframe class="mapa" src="https://www.google.com/maps/d/u/0/embed?mid=1_984ZeY0DhQLvXHhvTHkvvNU0IBlj3io" ></iframe>
        </div>
    </section>

    <div class="contenedorSubir" >
        <div class="botonSubir">
            <img src="../assets/flecha-arriba.png" alt="subir">
        </div> 
    </div> `


    const sectionElem = document.createElement('div');
    sectionElem.innerHTML = viewProyectos;

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