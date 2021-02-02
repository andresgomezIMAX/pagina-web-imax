const registerVacation = document.querySelector('.box-check-boss');
const user = () => firebase.auth().currentUser;


//Para mostrar el jefe inmediato por defecto
const boxNameLeader = document.querySelector('.boss-inmediate');
boxNameLeader.innerHTML = '',
firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().leader}`);
        const userLogueado = firebase.auth().currentUser;
        const useruid = userLogueado.uid;
        if(useruid === doc.id){
            boxNameLeader.innerHTML += `
            <label type="text" class="name-leader" > ${doc.data().leader} </label>`
        }
       
       
    })
})

//Para mostrar fecha de vencimiento
const vacationExpire = document.querySelector('.box-vac-venc');
vacationExpire.innerHTML = '',
firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().entryDay}`);
        const userLogueado = firebase.auth().currentUser;
        const useruid = userLogueado.uid;
        if(useruid === doc.id){
            const uid = doc.data();
            var f = uid.entryDay;
            // console.log(f);
            const vec = f.split('-');
            var fecha = new Date(vec[0], vec [1], vec[2]);
            fecha.setFullYear(fecha.getFullYear()+1);
            const resDateExpire = fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate();
            // console.log(resDateExpire)

            vacationExpire.innerHTML += `
            <p><strong>Vencimiento:</strong> ${resDateExpire} </p>`
        }
       
       
    })
})


const pendingVacation = document.querySelector('.box-vac-truncas');
pendingVacation.innerHTML = '',
firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().entryDay}`);
        const userLogueado = firebase.auth().currentUser;
        const useruid = userLogueado.uid;
        if(useruid === doc.id){
            const uid = doc.data();
            var entryDay = uid.entryDay;
            console.log(entryDay);
            const vec = entryDay.split('-');
            var date = new Date(vec[0], vec [1], vec[2]);
            console.log(date)
            let diasAcumulados=0;
            if( date.setMonth(date.getMonth()+1)){
                diasAcumulados += 2.5;
                console.log(diasAcumulados)
                pendingVacation.innerHTML += `
                <p><strong>Truncas:</strong> ${diasAcumulados} días</p>
                `
            }
           
          
          
            
        }
     
    })
})



// formulario para enviar solicitud de vacaciones
registerVacation.addEventListener('submit', (e) => {
    e.preventDefault();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    console.log(useruid)
    const inicioVacation = document.querySelector('.inicio-Vacation').value;
    const finVacation = document.querySelector('.fin-Vacation').value;
    const bossInmediate = document.querySelector('.name-leader').innerHTML;
    console.log(bossInmediate)
  
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


//funcion para guaradr vacacones en firestore  
   const  saveVacation = (useruid,inicioVacation,finVacation,bossInmediate) => {
    const firestore = firebase.firestore();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const userUid = userLogueado.uid;
    return firestore.collection('users').doc(userUid).collection('vacation').add({
        useruid,
        inicioVacation,
        finVacation,
        bossInmediate
    });
};

