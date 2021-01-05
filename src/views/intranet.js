export default () => {
    const viewIntranet = `
   
    <header>
    <nav>
        <img class="logo" src="../assets/logo.png">
        <ul>
            <li><a  href="#/noticias">Noticias</a></li>
            <li><a  href="#/nosotros">Mis Pagos</a></li>
            <li><a  href="#/nosotros">Mis Vacaciones</a></li>
            <li><a  href="#/nosotros">Herramientas Imax</a></li>
            <li><a  href="#/nosotros">Cerrar Sesión</a></li>
        </ul>
    </nav>
</header>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewIntranet;

        return sectionElem;
}