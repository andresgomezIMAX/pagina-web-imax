// funcion para cargar lista de jefe imediato
const leaderRegister = document.querySelector('.leader-register');
console.log(leaderRegister)
leaderRegister.innerHTML = '';
fs.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().checkLider}`);
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const user = doc.data();
    console.log(user)
    user.id = doc.id;
    if (doc.data().checkLider === "SI") {
      leaderRegister.innerHTML += `
                <option value="${user.id}" >${doc.data().name}</option>`
    }

  })
})



//CAPTURANDO EL URL DE LA FIRMA ELECTRONICA
let file;
const currentUser = () => firebase.auth().currentUser;
console.log(currentUser.email)
const firmRegister = document.querySelector('.firm-register');
console.log(firmRegister)
if (firmRegister) {
  firmRegister.addEventListener('change', (e) => {
    console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
    // Get file
    let file = e.target.files[0];
    if (file) {
      const storageRef = firebase.storage().ref(`firmRegister/${currentUser().email}/${file.name}`);
      const task = storageRef.put(file);
      console.log(task)
      let urlfirmRegister = '';
      // Update progress bar
      task.on('state_changed', () => {
        task.snapshot.ref.getDownloadURL()
          .then((url) => {
            console.log('File available at', url);
            urlfirmRegister = url;
            console.log('holaaaaaaaaaaaa', urlfirmRegister);
            sessionStorage.setItem('firmRegister', urlfirmRegister);
          })

      });

    }
  })
}


const emailWorker = document.querySelector('.email-register');
console.log(emailWorker)
emailWorker.innerHTML = '';
fs.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().leader}`);
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const user = doc.data()
    user.id = doc.id;
    emailWorker.innerHTML += `
                <option value="${user.email}" >${doc.data().email}</option>`
  })
})


// //Obteniendo fecha actual
// var dateToday = new Date();
// console.log(dateToday);

// function formatDate(date) {
//   var d = new Date(date),
//     month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2)
//     month = '0' + month;
//   if (day.length < 2)
//     day = '0' + day;

//   return [year, month, day].join('-');
// }

// const currentDate = formatDate(dateToday);
// console.log(currentDate);


// //funcion para sacar meses de diferencia
// const monthDiff = (date1, date2) => {
//     const vec1 = date1.split('-');
//     var d1 = new Date(vec1[0], vec1[1] - 1, vec1[2]);
//     const vec2 = date2.split('-');
//     var d2 = new Date(vec2[0], vec2[1] - 1, vec2[2]);
//     var months;
//     months = (d2.getFullYear() - d1.getFullYear()) * 12;
//     months -= d1.getMonth() + 1;
//     months += d2.getMonth();
//     if (d2.getDate() >= d1.getDate()) months++
//     return months <= 0 ? 0 : months;
// }

// //multiplicar meses por 2.5 dias de vacaciones
// const calcVacationTodayYear = (fecha1, fecha2) => {
//     console.log(monthDiff(fecha1, fecha2))
//     const resFechas = monthDiff(fecha1, fecha2)
//     const pendingVacations = resFechas * 2.5;
//     console.log(pendingVacations)
//     return pendingVacations;


// }


function formato(texto){
  return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1');
}

// REGISTRANDO USUARIOS 
const register = document.querySelector('.box-fill-data');
register.addEventListener('submit', (e) => {
  e.preventDefault();
  fs.collection('users').get().then((querySnapshot)=>{
    querySnapshot.forEach(doc => {
      const user = doc.data();
      console.log(user)
      user.id = doc.id;
      const docId = user.id;
      // const userLogueado = firebase.auth().currentUser;
      const email = document.querySelector('.email-register').value;
      console.log(docId)
      console.log(email)
      console.log(user.email)   
      if (email === user.email) {
        const name = document.querySelector('.name-register').value;
        const checkAdmin = document.querySelector('.checkAdmin').value;
        const dni = document.querySelector('.dni-register').value;
        const phone= document.querySelector('.phone-register').value;
        const area = document.querySelector('.area-register').value;
        const leader = document.querySelector('.leader-register').value;
        const entryDay = formato(document.querySelector('.fechaAdmin').value);
        const salarioAdmin= document.querySelector('.salarioAdmin-register').value;
        const urlfirmRegister = sessionStorage.getItem('firmRegister');
        const checkLider = document.querySelector('.checkLider').value;
        const counterVacation = 0;
        console.log(name, checkAdmin, dni, phone, area,leader,entryDay,salarioAdmin,urlfirmRegister,checkLider,counterVacation)
        const cityRef = firebase.firestore().collection('users').doc(docId);
        const res = cityRef.update({
        name, 
        checkAdmin,
        email,
        dni, 
        phone, 
        area,
        leader,
        entryDay,
        salarioAdmin,
        urlfirmRegister,
        checkLider,
        counterVacation,
        estado: true

       }, { merge: true });
       register.reset();
       alert('Los datos han sido guardados')
       
      }
    })
  })
})    













// const getPostEdit = (id) => fs.collection('posts').doc(id).get();



//funcion para mostrar lista de colaboradores en workerAdmin
const btnlista = document.querySelector('.list-worker');
const btnBack = document.querySelector('.back-worker');
const listWorker = document.querySelector('.container-boletas');
const addworker = document.querySelector('.container-add-worker');
btnlista.addEventListener('click', () => {
  listWorker.classList.toggle('show');
  addworker.classList.remove('show');
  addworker.classList.toggle('hide');
  console.log('click');
});

btnBack.addEventListener('click', () => {
  listWorker.classList.remove('show');
  listWorker.classList.add('hide');
  addworker.classList.remove('hide');
  addworker.classList.toggle('show');
  console.log('click');
});