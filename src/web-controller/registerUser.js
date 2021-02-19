
// REGISTRANDO USUARIOS 
const register = document.querySelector('.box-fill-data');
register.addEventListener('submit', (e) => {
  e.preventDefault();
  // const name = document.querySelector('.name-Register').value;
//   var validEmail = new RegExp("^[a-zA-Z][-_.a-zA-Z0-9]{5,29}@imax.com.pe$");
  const email = document.querySelector('.email-Register').value;
  const password = document.querySelector('.password-Register').value;
  console.log( email, password,)
  
  firebase.auth().createUserWithEmailAndPassword(email,  password)
  .then(userCredential =>
  //    {
  //   const db = firebase.firestore();
  //     return db.collection('users').doc(userCredential.user.uid).set({
  //       email, 
  //       password, 
  //     });
     
  // }).then(() => 
  {
    register.reset();
    location.href="noticias.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      document.querySelector('#reg_error_inner').innerHTML = 'La contraseña es demasiado débil. Utlice letras y números';
    } else {
      document.querySelector('#reg_error_inner').innerHTML = errorMessage;
    }
  });

});