const register = document.querySelector('.box-fill-data');
const user = () => firebase.auth().currentUser;


const saveUser = ({ displayName, photoURL, email }) => {
  fs.collection('usuarios').doc(email).set({
    nameUser: displayName,
    photoURL,
    emailUser:email,
  });
};

// register con email
register.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('.name-register').value;
  const lastName = document.querySelector('.lastName-register').value;
  const dni = document.querySelector('.dni-register').value;
  const phone= document.querySelector('.phone-register').value;
  const email = document.querySelector('.email-register').value;
  const password = document.querySelector('.password-register').value;
  const area = document.querySelector('.area-register').value;
  const leader = document.querySelector('.leader-register').value;
  const entryDay = document.querySelector('.fechaAdmin').value;
  const salarioAdmin= document.querySelector('.salarioAdmin-register').value;
  const addImg = document.querySelector('.addImg-register').value;
  const checkAdmin = document.querySelector('.checkAdmin-register').value;

  console.log(name, lastName, dni, phone, email, password, area,leader,entryDay,salarioAdmin,addImg,checkAdmin)
  firebase.auth().createUserWithEmailAndPassword(email,  password)
  .then(userCredential => {
    if (register) {
      saveUser((user(email)));
      register.reset();
      alert('guardado');
     
  
    }    
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

})