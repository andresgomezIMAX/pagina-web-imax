export default () => {
    const viewStaff = `
    <section class="staff" >
        <div class="box-staff">
            <div class="portada-staff">
                <img class="portada" src="./assets/staff.jpg">
            </div>
        </div>
        <h2 class="tittle">NUESTRO STAFF</h2>
        <div class="box-staff1">
            <div class="descrip-staff">
                <h2>Max Alfaro - Gerencia</h2>
                <img class="portada" src="./assets/staff/Max Alfaro - Gerencia.jpg">
                <button class="btn-mas">Ver más</button>
                <div class="descrip-container">
                    <div class="descripcion modal-closeDescrip"> 
                        <p class="closeDescrip">X</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis 
                        repudiandae ut doloribus ad at quibusdam nisi veniam omnis nam, aspernatur 
                        debitis nemo. Alias cum nostrum atque, officiis incidunt quia corporis</p>
                    </div>
                </div>    
            </div>
            <div class="descrip-staff">
                <h2>Maurice Calmet - EVP</h2>
                <img class="portada" src="./assets/staff/Maurice Calmet - EVP.png">
                <button class="btn-mas">Ver más</button>
            </div>
            <div class="descrip-staff">
                <h2>Marcela Mendoza - GDP</h2>
                <img class="portada" src="./assets/staff/Marcela Mendoza - GDP.png">
                <button class="btn-mas">Ver más</button>

            </div>
        </div>

        

        <div class="box-staff1">
            
            <div class="descrip-staff">
                <h2>Patricia Valdivia - EMP</h2>
                <img class="portada" src="./assets/staff/Patricia Valdivia - EMP.png">
                <button class="btn-mas">Ver más</button>
                
            </div>
            <div class="descrip-staff">
                <h2>Manuel Farje - GEC</h2>
                <img class="portada" src="./assets/staff/Manuel Farje - GEC.png">
                <button class="btn-mas">Ver más</button>
                
            </div>
            <div class="descrip-staff">
                <h2>Elena Alfaro - ADH</h2>
                <img class="portada" src="./assets/staff/Elena Alfaro - ADH.png">
                <button class="btn-mas">Ver más</button>
                
            </div>
        </div>


        <div class="box-staff1">
            <div class="descrip-staff">
                <h2>Andrés Gómez - GSO e IAD</h2>
                <img class="portada" src="./assets/staff/Andrés Gómez - GSO e IAD.png">
                <button class="btn-mas">Ver más</button>
                
            </div>
            <div class="descrip-staff">
                    <h2>Claudia Coronel - TAS</h2>
                    <img class="portada" src="./assets/staff/Claudia Coronel - TAS.png">
                    <button class="btn-mas">Ver más</button>
                    
            </div>

            <div class="descrip-staff">
                <h2>Enrique Alaba - Marketing</h2>
                <img class="portada" src="./assets/staff/Enrique Alaba - Marketing.png">
                <button class="btn-mas">Ver más</button>
                
            </div> 
            
        </div>


    
    </section>
    <div class="contenedorSubir" >
<div class="botonSubir">
    <img src="./assets/flecha-arriba.png" alt="subir">
</div> 
</div> `

        const sectionElem = document.createElement('div');
        sectionElem.innerHTML = viewStaff;

        
    const btnMas = sectionElem.querySelectorAll(".btn-mas")[0];
    const btnMas1 = sectionElem.querySelectorAll(".btn-mas")[1];
    const btnMas2 = sectionElem.querySelectorAll(".btn-mas")[2];
    const btnMas3 = sectionElem.querySelectorAll(".btn-mas")[3];
    const btnMas4 = sectionElem.querySelectorAll(".btn-mas")[4];
    const btnMas5 = sectionElem.querySelectorAll(".btn-mas")[5];
    const btnMas6 = sectionElem.querySelectorAll(".btn-mas")[6];
    const btnMas7 = sectionElem.querySelectorAll(".btn-mas")[7];
    const btnMas8 = sectionElem.querySelectorAll(".btn-mas")[8];
    

    const array = [btnMas, btnMas1, btnMas2, btnMas3, btnMas4, btnMas5, btnMas6, btnMas7, btnMas8];
    
    const cerrarDescrip = sectionElem.querySelectorAll(".closeDescrip")[0];
    const descripcion = sectionElem.querySelectorAll(".descripcion")[0];
    const containerDescrip = sectionElem.querySelectorAll(".descrip-container")[0];


    array.forEach((btnMas) => {
    btnMas.addEventListener("click", (e) => {
        e.preventDefault();
        containerDescrip.style.opacity = "1";
        containerDescrip.style.visibility = "visible";
        descripcion.classList.toggle("modal-closeDescrip");
    });
});

      cerrarDescrip.addEventListener("click", () => {
        descripcion.classList.toggle("modal-closeDescrip");
        setTimeout(() => {
            containerDescrip.style.opacity = "0";
            containerDescrip.style.visibility = "hidden";
        }, 600)
    });

    window.addEventListener("click", (e) => {
        console.log(e.target)
        if (e.target == containerDescrip) {
            descripcion.classList.toggle("modal-closeDescrip");

            setTimeout(() => {
                containerDescrip.style.opacity = "0";
                containerDescrip.style.visibility = "hidden";
            }, 900)
        }
    });





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