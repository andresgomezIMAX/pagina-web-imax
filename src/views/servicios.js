export default () => {
    const viewServicios = `
    <img class="portada" src="../assets/portada-servicios.jpg">
    
    <div class="contenedorSubir" >
        <div class="botonSubir">
            <img src="../assets/flecha-arriba.png" alt="subir">
        </div> 
    </div> `


    const sectionElem = document.createElement('div');
    sectionElem.innerHTML = viewServicios;

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