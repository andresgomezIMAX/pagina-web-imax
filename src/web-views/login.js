const login = document.querySelector('.login-form');

const iconGoogle = document.querySelector('.google-icon');
// const currentUser = () => firebase.auth().currentUser;

// const saveUser = ({ displayName, photoURL, email }) => {
//   fs.collection('usuarios').doc(email).set({
//     nameUser: displayName,
//     photoURL,
//     emailUser: email,
//   });
// };

const googleAuth = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(() => {
    // saveUser(currentUser());
    if (googleAuth) {
    login.reset();
      console.log('ingresaste por google');
      location.href="web-views/noticias.html"
    
    }
  }).catch();
  return provider;
};


iconGoogle.addEventListener('click', (event) => {
  event.preventDefault();
  googleAuth();
});

// iconGoogle.addEventListener('click', (event) => {
//   // event.preventDefault();
//   const provider = new firebase.auth.GoogleAuthProvider();
//   auth.signInWithPopup(provider)
//   .then(result => {
//     console.log('login con goo')
//     login.reset();
//   })
//   .catch(err => {
//     console.log('ocurrio algo')
//   })
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




//  //funcion para cerra sesion
// const logOut = document.querySelector('.logout');

// logOut.addEventListener('click', e => {
//   e.preventDefault();
//   auth.signOut().then(()=> {
//     console.log('sign out')
//   }).catch()
// }) 