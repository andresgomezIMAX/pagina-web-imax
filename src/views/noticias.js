export default () => {
    const viewNoticias = `
   
        <section >
            <div class="lema">
                <p>aqui ira la session noticias</p>
            </div>
            
        </section>`

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewNoticias;

        return sectionElem;
}