const menuMobile = document.querySelector('.pagos');
const navHome = document.querySelector('.nav-home');
menuMobile.addEventListener('click', () => {
  navHome.classList.toggle('hide');
  console.log('click');
});

const menuAdmin = document.querySelector('.admin');
const navAdmin = document.querySelector('.nav-admin');
menuAdmin.addEventListener('click', () => {
  navAdmin.classList.toggle('hide');
  console.log('click');
});


//funcion para mostrar lista de colaboradores en workerAdmin
const btnlista = document.querySelector('.list-worker');
const btnBack = document.querySelector('.back-worker');
const listWorker = document.querySelector('.container-boletas');
const addworker = document.querySelector('.container-add-worker');
  btnlista.addEventListener('click', () => {
    listWorker.classList.toggle('show');
    addworker.classList.remove('show');
    addworker.classList.toggle('hide');
    console.log('click');
  });

  btnBack.addEventListener('click', () => {
  listWorker.classList.remove('show');
  listWorker.classList.add('hide');
  addworker.classList.remove('hide');
  addworker.classList.toggle('show');
  console.log('click');
});




//funcion para ATRAS en lista de colaboradores
// const btnBack = document.querySelector('.back-worker');
// const listBoletas = document.querySelector('.container-boletas');
// const containerBoleta = document.querySelector('.container-add-worker');
// btnBack.addEventListener('click', () => {
//   listBoletas.classList.toggle('show');
//   containerBoleta.classList.toggle('hide');
//   console.log('click');
// });


 //funcion para cerra sesion
const logOut = document.querySelector('.logOut');
logOut.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(()=> {
    console.log('sign out')
    location.href="../intranet.html"
  }).catch()
}) 
