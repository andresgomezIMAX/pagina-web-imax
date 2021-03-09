export const saveUser = ({name, lastName}) => {
    const db = firebase.firestore();
    db.collection('usuarios').doc(email).set({
      nameUser: displayName,
      photoURL,
      emailUser: email,
    });
  };