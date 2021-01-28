const registerVacation = document.querySelector('.box-check-boss');
const user = () => firebase.auth().currentUser;

registerVacation.addEventListener('submit', (e) => {
    e.preventDefault();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    console.log(useruid)
    const inicioVacation = document.querySelector('.inicio-Vacation').value;
    const finVacation = document.querySelector('.fin-Vacation').value;
    const bossInmediate = document.querySelector('.boss-inmediate').value;
  
    console.log(useruid,inicioVacation,finVacation,bossInmediate)
    if(inicioVacation,finVacation){
        saveVacation(useruid,inicioVacation,finVacation,bossInmediate).then(() => {
            // sessionStorage.removeItem('fileNewTicked');
            console.log('se registró solicitud de vacaciones');
            registerVacation.reset();
            alert('Se registró solicitud de vacaciones');
        });
    }
    
  
  });

  const  saveVacation = (useruid,inicioVacation,finVacation,bossInmediate) => {
    const firestore = firebase.firestore();
    return firestore.collection('vacation').add({
        useruid,
        inicioVacation,
        finVacation,
        bossInmediate
    });
};

