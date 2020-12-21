export default () => {
    const viewContacto = `
   
    <section class="contacto">
        <img src="../assets/viabilidad.jpg">
    
        <div class="form">
            <h2 class="title">CONTACTANOS</h2>
            <p>Para brindarle mayor información puede inscribirnos su consultas y nos comunicaremos con usted 
                en la brevedad posible</p>
            <div class="box-form">
                <div>
                    <input class="ident" placeholder="Nombres">
                    <input class="ident" placeholder="Email">
                </div>
                <div>
                    <input class="asunto" placeholder="Asunto">
                    <textarea class="mensaje" placeholder="Mensaje" name="mensaje" id="" cols="30" rows="10"></textarea>
                
                </div>
                <button class="sendMsj">ENVIAR MENSAJE</button>
            </div>
        </div>    
    </section>`

    const sectionElem = document.createElement('div');
    sectionElem.innerHTML = viewContacto;

    return sectionElem;
}