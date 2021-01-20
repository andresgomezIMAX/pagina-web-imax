const login = document.querySelector('.login-form');

// AUTH CON GOOGLE
// const iconGoogle = document.querySelector('.google-icon');

// const googleAuth = () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider).then(() => {
//     // saveUser(currentUser());
//     if (googleAuth) {
//     login.reset();
//       console.log('ingresaste por google');
//       location.href="web-views/noticias.html"
    
//     }
//   }).catch();
//   return provider;
// };


// iconGoogle.addEventListener('click', (event) => {
//   event.preventDefault();
//   googleAuth();
// });







//Login con email

login.addEventListener('submit', (e) => {
    e.preventDefault();
   const emailLogin = document.querySelector('.emailLogin').value;
   const passwordLogin = document.querySelector('.passwordLogin').value;
   console.log(emailLogin,passwordLogin);
   console.log('jajajjaja')
  auth
      .signInWithEmailAndPassword(emailLogin,passwordLogin)
      .then(userCredential => {
        login.reset();
        console.log('ingresasteeeee');
        location.href="web-views/noticias.html"
      }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        var validEmail = new RegExp("^[a-zA-Z][-_.a-zA-Z0-9]{5,29}@imax.com.pe$");
        if (errorCode === 'auth/wrong-password') {
          document.querySelector('#reg_error_inner').innerHTML = 'Contraseña incorrecta.';
        } else if (( validEmail.test(emailLogin.trim())) === false){
          document.querySelector('#reg_error_inner').innerHTML = 'utilice su correo institucional.';
        } else {
            document.querySelector('#reg_error_inner').innerHTML = errorMessage;
        }
      })
});