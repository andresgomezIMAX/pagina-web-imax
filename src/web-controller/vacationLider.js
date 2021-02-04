// para mostrar los datos en la tabla'pages'
const user = () => firebase.auth().currentUser;
console.log(user.useruid)
const userLogueado = firebase.auth().currentUser;
console.log(userLogueado)
const onGetVacation = (callback) => firebase.firestore().collection('users').doc(user.uid).collection('vacation').onSnapshot(callback);
console.log(onGetVacation)
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