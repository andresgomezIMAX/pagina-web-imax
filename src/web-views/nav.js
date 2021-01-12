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