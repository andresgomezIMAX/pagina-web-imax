export default () => {
    const viewDifferent = `
   
        <section >
            <div class="lema">
                <p>Página no encontrada, por favor verifique la ruta.</p>
            </div>
            
        </section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewDifferent;

        return sectionElem;
}