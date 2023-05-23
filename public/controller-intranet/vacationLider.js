// PARA MOSTRAR EN LA TABLA DE VACACIONES LIDER

// var db = firebase.firestore();
// const traerId =  db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id);
//         const onGetVacationss = doc.id;
//         return onGetVacationss;
//     });
// });


// const onGetVacation = (callback) => firebase.firestore().collection('users').doc('k8Y5ZGjnxFatZ066T6njvIdUrfw2')
const onGetVacation = (callback) => fs.collection('vacation').orderBy("datetime", "desc").onSnapshot(callback);
const getUsers = () => fs.collection('users').get();
const getCts = () => fs.collection().get();






var leaderEmail;
var leaderName;







const vacationContainer = document.querySelector('.table-vacation')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetVacation((querySnapshot) => {
    vacationContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const vacation = doc.data();
      console.log(vacation)
      const userLogueado = firebase.auth().currentUser;
      // console.log(userLogueado)
      vacation.id = doc.id;

      if (userLogueado.uid === vacation.bossInmediate) {

        leaderEmail = userLogueado.email
        leaderName = userLogueado.displayName

        vacationContainer.innerHTML += `
        <tr class="nameWorker">
        <td>${vacation.nameWorker}</td>  
        <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
        <td>Cant. de Días Solicitados: ${vacation.contdias} días <br>
            Vencen: ${(vacation.resDateExpireYear) ? vacation.resDateExpireYear : vacation.newDateExpire} </td>
        <td>${vacation.confirmacion === true ? `<input type="checkbox" class="conformidadLider" value= ${vacation.confirmacion}  name="conformidad" data-id="${vacation.id}"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${vacation.confirmacion}  name="conformidad"  data-id="${vacation.id}" > `} </td>
        </tr> 
`;
      }

    });


    const searchName = document.querySelector('.search')
    console.log(searchName);

    const d = document;

    function searchFilter(input, selector) {
      d.addEventListener('keyup', (e) => {
        if (e.target.matches(input)) {
          d.querySelectorAll(selector).forEach((el) =>
            el.textContent.toLowerCase().includes(e.target.value) ?
            el.classList.remove("hide") :
            el.classList.add("hide"))
        }
      })
    }

    searchFilter('.search', '.nameWorker')


   var nameWorker;
  var emailWorker;
    const checkboxs = document.querySelectorAll('.conformidad');
    checkboxs.forEach(check => {
      check.addEventListener('change', function (e) {
        if (this.checked) {
          querySnapshot.forEach(doc => {
            // console.log(doc.id);
            // console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              const cityRef = fs.collection('vacation').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });

            
               cityRef.get().then((doc) => {
                if (doc.exists) {
                  console.log("Document data:", doc.data());
                  const vacation = doc.data();
                  vacation.id = doc.id;
                  nameWorker = vacation.nameWorker;
                  emailWorker = vacation.emailWorker
                  console.log(emailWorker, nameWorker)
                  
              sendEmail()
                }
              })

             

              function sendEmail() {

                console.log(nameWorker, emailWorker, leaderName, leaderEmail)

                const message = `Estimado(a) colaborador ${nameWorker},
                      el Lider IMAX ${leaderName} 
                      ha aprobado sus solicitud de vacaciones.`

                const email = emailWorker

                var templateParams = {
                  message,
                  email
                };
                emailjs.send("service_lgxydsq", "template_d5j36t7", templateParams, "user_0loQaVMyGMBSx2TKKJJQW")
                  .then(
                    function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                      if (response.status === 200) {
                        console.log("se envió correo")
                      }

                    },
                    function (error) {
                      console.log("FAILED...", error);
                    }
                  );
              }





            }

          })

        } else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              // confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              // window.localStorage.removeItem(doc.id, false)
              // window.localStorage.setItem(doc.id, false)
              const cityRef = fs.collection('vacation').doc(doc.id);
              const res = cityRef.update({
                confirmacion: false
              }, {
                merge: true
              });
            }
          })
        }
      })
    })



  })


})