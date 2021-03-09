// export const currentUser = () => firebase.auth().currentUser;

export const register = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    if (register) {
      saveUser((currentUser(email)));
    }
  });
  
export const logIn = (emailLogin, passwordLogin) => firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then(() => {
      if (logIn) {
        getUser(emailLogin);
        changeView('#/home');
      }
    });

export const signInOff = () => firebase.auth().signOut().then().catch();