const register = document.querySelector('.box-fill-data');
const user = () => firebase.auth().currentUser;

// register con email
register.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('.name-register').value;
  const checkAdmin = document.querySelector('.checkAdmin').value;
  const dni = document.querySelector('.dni-register').value;
  const phone= document.querySelector('.phone-register').value;
  const email = document.querySelector('.email-register').value;
  const password = document.querySelector('.password-register').value;
  const area = document.querySelector('.area-register').value;
  const leader = document.querySelector('.leader-register').value;
  const entryDay = document.querySelector('.fechaAdmin').value;
  const salarioAdmin= document.querySelector('.salarioAdmin-register').value;
  const addImg = document.querySelector('.firm-register').value;
  

  console.log(name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin,addImg)
  firebase.auth().createUserWithEmailAndPassword(email,  password)
  .then(userCredential => {
    const db = firebase.firestore();
      return db.collection('users').doc(userCredential.user.uid).set({
        name, 
        checkAdmin,
        dni, 
        phone, 
        email, 
        password, 
        area,
        leader,
        entryDay,
        salarioAdmin,
        addImg
      });
     
  }).then(() => {
    register.reset();
    alert('Datos guardados'); 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      document.querySelector('#reg_error_inner').innerHTML = 'The password is too weak.';
    } else {
      document.querySelector('#reg_error_inner').innerHTML = errorMessage;
    }
  });

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



