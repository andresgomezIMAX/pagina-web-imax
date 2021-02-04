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
        function formato(texto){
            return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
          }
        if(useruid === doc.id){
            const uid = doc.data();
            var f = uid.entryDay;
            console.log(f);
            const vec = f.split('-');
            var fecha = new Date(vec[0], vec [1], vec[2]);
            console.log(fecha)

            fecha.setFullYear(fecha.getFullYear());
   
            let mes = fecha.getMonth();
            if(fecha.getMonth() < 10){
                mes= `0${fecha.getMonth()}`
              }else{
                mes= `${fecha.getMonth()}`
              }
            let dia = fecha.getDate();
            if(fecha.getDate() < 10){
                dia= `0${fecha.getDate()}`
              }else{
                dia= `${fecha.getDate()}`
              }  

            const salida = fecha.getFullYear()+1+'-'+mes+'-'+dia;
            console.log(salida)
            var resDateExpire = formato(salida);
            console.log(resDateExpire);
            

            // const resDateExpireYear = (fecha.getFullYear()+1)+'-'+mes+'-'+dia;
            // console.log(resDateExpireYear)

            var fechaActual = new Date();
            console.log(fechaActual);
            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
            
                return [year, month, day].join('-');
            }
             
            const resDateToday = formatDate(fechaActual);
            console.log(resDateToday);
            
         
            if(salida <= resDateToday){
                var f = salida;
                console.log(f)
                const vec = f.split('-');
                var fecha = new Date(vec[0], vec [1], vec[2]);
                console.log(fecha)
                fecha.setFullYear(fecha.getFullYear()+1);
                var getAño = new Date();
                var año = getAño.getFullYear();
                console.log(año)
                let mes = fecha.getMonth();
                if(fecha.getMonth() < 10){
                    mes= `0${fecha.getMonth()}`
                }else{
                    mes= `${fecha.getMonth()}`
                }
                let dia = fecha.getDate();
                if(fecha.getDate() < 10){
                    dia= `0${fecha.getDate()}`
                }else{
                    dia= `${fecha.getDate()}`
                }  
    
                const salida2 = año +'-'+mes+'-'+dia;
                console.log(salida2)

                if(salida2 <= resDateToday){
                var f = salida2;
                console.log(f)
                const vec = f.split('-');
                var fecha = new Date(vec[0], vec [1], vec[2]);
                console.log(fecha)
                fecha.setFullYear(fecha.getFullYear()+1);
                var getAño = new Date();
                var año = getAño.getFullYear()+1;
                console.log(año)
                let mes = fecha.getMonth();
                if(fecha.getMonth() < 10){
                    mes= `0${fecha.getMonth()}`
                }else{
                    mes= `${fecha.getMonth()}`
                }
                let dia = fecha.getDate();
                if(fecha.getDate() < 10){
                    dia= `0${fecha.getDate()}`
                }else{
                    dia= `${fecha.getDate()}`
                }  

    
                const salida3 = año +'-'+mes+'-'+dia;
                console.log(salida3)

                var resDateExpireYear1 = formato(salida3);
                console.log(resDateExpireYear1);

                const fecha2 = new Date ();
                const vacationPending = calcVacationToday(salida2,fecha2)

                

                vacationExpire.innerHTML += `
                <p><strong>Vencimiento:</strong> ${resDateExpireYear1} </p>
                <p><strong>Truncas:</strong> ${vacationPending} días</p>`

                } else {

                    var resDateExpireYear = formato(salida2);
                    console.log(resDateExpireYear);

                    const fecha2 = new Date ();
                    const vacationPending = calcVacationTodayYear(salida2,fecha2)
    
                    vacationExpire.innerHTML += `
                    <p><strong>Vencimiento:</strong> ${resDateExpireYear} </p>
                    <p><strong>Truncas:</strong> ${vacationPending} días</p>`
                }

             
            } else {
                vacationExpire.innerHTML += `
                <p><strong>Vencimiento:</strong> ${resDateExpire} </p>`
            }

            
        }
       
       
    })
})


//funcion para sacar meses de diferencia
const restaFechas = (d1, d2) => {
    var year1=d1.getFullYear();
var year2=d2.getFullYear();
var month1=d1.getMonth();
var month2=d2.getMonth();
if(month1===0){ //Have to take into account
  month1++;
  month2++;
}
var numberOfMonths;
numberOfMonths = (year2 - year1) * 12 + (month2 - month1);
return numberOfMonths;
}


const calcVacationTodayYear = (fecha1, fecha2) => {
    const item = fecha1.split('-');
    var fechaItem = new Date(item[0]-1, item [1], item[2]);
    console.log(fechaItem)
    alert(restaFechas(fechaItem,fecha2))
    const resFechas = restaFechas(fechaItem,fecha2)
    const vacationPending = resFechas*2.5;
    return vacationPending;
}

const calcVacationToday = (fecha1, fecha2) => {
    const item = fecha1.split('-');
    var fechaItem = new Date(item[0], item [1]-1, item[2]);
    console.log(fechaItem)
    alert(restaFechas(fechaItem,fecha2))
    const resFechas = restaFechas(fechaItem,fecha2)
    const vacationPending = resFechas*2.5;
    return vacationPending;
}





// const pendingVacation = document.querySelector('.box-vac-truncas');
// pendingVacation.innerHTML = '',
// firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // console.log(`${doc.id} => ${doc.data().entryDay}`);
//         const userLogueado = firebase.auth().currentUser;
//         const useruid = userLogueado.uid;
//         if(useruid === doc.id){
//             const uid = doc.data();
//             var entryDay = uid.entryDay;
//             // console.log(entryDay);
//             const vec = entryDay.split('-');
//             var date = new Date(vec[0], vec [1], vec[2]);
//             console.log(date)
//             let diasAcumulados=0;
//             if( date.setMonth(date.getMonth()+1)){
//                 diasAcumulados += 2.5;
//                 console.log(diasAcumulados)
//                 pendingVacation.innerHTML += `
//                 <p><strong>Truncas:</strong> ${diasAcumulados} días</p>
//                 `
//             }
//         }
     
//     })
// })



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

    // return firestore.collection('users').doc(userUid).collection('vacation').add({
    //     useruid,
    //     inicioVacation,
    //     finVacation,
    //     bossInmediate
    // });
    return firestore.collection('vacation').add({
      useruid,
      inicioVacation,
      finVacation,
      bossInmediate
    });
};

