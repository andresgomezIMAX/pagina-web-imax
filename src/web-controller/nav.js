const menuMobile = document.querySelector('.pagos');
const navHome = document.querySelector('.nav-home');
menuMobile.addEventListener('click', () => {
  navHome.classList.toggle('hide');
  console.log('click');
});

// const menuAdmin = document.querySelector('.admin');
// const navAdmin = document.querySelector('.nav-admin');
// menuAdmin.addEventListener('click', () => {
//   navAdmin.classList.toggle('hide');
//   console.log('click');
// })

//funcion para ATRAS en lista de colaboradores
// const btnBack = document.querySelector('.back-worker');
// const listBoletas = document.querySelector('.container-boletas');
// const containerBoleta = document.querySelector('.container-add-worker');
// btnBack.addEventListener('click', () => {
//   listBoletas.classList.toggle('show');
//   containerBoleta.classList.toggle('hide');
//   console.log('click');
// });

const onlyAdmin = document.querySelector('.only-admin')
fs.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().checkAdmin}`);
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    if (doc.id === userLogueado.uid) {
      if (doc.data().checkAdmin === 'SI') {
        onlyAdmin.innerHTML += `
          <li><a href="#/" class="admin">Administrador
          <ul class="nav-admin hide">
              <a href="boletasAdmin.html" ><li class="btn-admin-boletas second-parent" >Ingresar Boletas</li></a>
              <a href="ctsAdmin.html" ><li class="btn-admi-const second-parent" >Ingresar CTS</li></a>
              <a href="vacactionsAdmin.html" ><li class="btn-admi-const second-parent" >Solicitud Vacaciones</li></a>
              <a href="workerAdmin.html" ><li class="btn-admi-const second-parent" >Agregar Colaborador</li></a>
          </ul>
        </a> </li>
        <li><a href="vacationsLider.html">Lider de Unidad</a></li>`;

        const menuAdmin = document.querySelector('.admin');
        const navAdmin = document.querySelector('.nav-admin');
        menuAdmin.addEventListener('click', () => {
          navAdmin.classList.toggle('hide');
          console.log('click');
        })
      }




    }

  });

})






//funcion para cerra sesion
const logOut = document.querySelector('.logOut');
logOut.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('sign out')
    location.href = "../intranet.html"
  }).catch()
})