// PARA MOSTRAR EN LA TABLA DE VACACIONES LIDER

// var db = firebase.firestore();
// const traerId =  db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id);
//         const onGetVacationss = doc.id;
//         return onGetVacationss;
//     });
// });

// traerId=db.collection("users").get().then((res)=>console.log(res))

// const onGetVacation = (callback) => firebase.firestore().collection('users').doc('k8Y5ZGjnxFatZ066T6njvIdUrfw2').collection('vacation').onSnapshot(callback);
const onGetVacation = (callback) => firebase.firestore().collection('vacation').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const getCts = () => firebase.firestore().collection().get();

const vacationContainer = document.querySelector('.table-vacation')
window.addEventListener('DOMContentLoaded', async(e) => {
    onGetVacation((querySnapshot)=>{
    vacationContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const vacation = doc.data();
      console.log(vacation)
      vacation.id = doc.id;
      const user = firebase.auth().currentUser;
      vacationContainer.innerHTML +=  `
                                        <tr>
                                        <td>${vacation.nameWorker}</td>  
                                        <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
                                        <td>Pendientes: ${vacation.vacationPending} días <br>
                                            Vencen: ${(vacation.resDateExpireYear) ? vacation.resDateExpireYear : vacation.resDateExpireYear2} </td>
                                        <td><input type="checkbox" class="conformidad" value=false name="conformidad"></td>
                                        </tr> 
                             `;
      const checkbox = document.querySelector('.conformidad');
      console.log(checkbox)
      checkbox.addEventListener( 'change', function() {
          if(this.checked) {
            firebase.firestore().collection('vacation').onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  console.log(`${doc.id} => ${doc.data().useruid}`);
                  const userLogueado = firebase.auth().currentUser;
                  const useruid = userLogueado.uid;
                  if(useruid === doc.data().useruid){
                      const cityRef = firebase.firestore().collection('vacation').doc(doc.id);
                      const res = cityRef.update({
                        confirmacion : true
                      }, { merge: true });
                  }

              })
          })
          } 
      });

    });
  })
 
});


