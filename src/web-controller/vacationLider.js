// para mostrar los datos en la tabla'pages'
  // const userLogueado = firebase.auth().currentUser;
  // console.log(userLogueado)
  // const userUid = userLogueado.uid;
var db = firebase.firestore();
const traerId =  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
        const onGetVacationss = doc.id;
        return onGetVacationss;
    });
});

traerId=db.collection("users").get().then((res)=>console.log(res))

const onGetVacation = (callback) => firebase.firestore().collection('users').doc('k8Y5ZGjnxFatZ066T6njvIdUrfw2').collection('vacation').onSnapshot(callback);

const getUsers = () => firebase.firestore().collection('users').get();
const getCts = () => firebase.firestore().collection().get();

const vacationContainer = document.querySelector('.table-vacation')
console.log(vacationContainer)
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
                                        <td>${vacation.useruid}</td>  
                                        <td>${vacation.inicioVacation} al ${vacation.finVacation}</td>
                                        <td>Pendientes: 15 días <br>
                                            Vencen: 31/12/2021</td>
                                        <td><input type="checkbox" id="cbox2" value="conformidad">  </td>
                                        </tr> 
                             `;
    });
  })
 
})