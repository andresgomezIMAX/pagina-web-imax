const registerVacation = document.querySelector('.box-check-boss');
const user = () => firebase.auth().currentUser;

var leaderName;
var leaderEmail;
//Para mostrar el jefe inmediato por defecto
const boxNameLeader = document.querySelector('.boss-inmediate');
boxNameLeader.innerHTML = '',
    fs.collection('users').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().leader}`);
            const userLogueado = firebase.auth().currentUser;
            const useruid = userLogueado.uid;
            const user = doc.data();
            if (useruid === doc.id) {
                const liderUser = doc.data().leader
                var docRef = firebase.firestore().collection("users").doc(liderUser);
                console.log(liderUser)

                docRef.get().then((doc) => {
                    if (doc.exists) {
                        leaderName = doc.data().name
                        leaderEmail = doc.data().email

                        boxNameLeader.innerHTML += `
                       <option value="${liderUser}" class="name-leader"> ${doc.data().name} <option>`
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            };
        })
    })



//Obteniendo fecha actual
var dateToday = new Date();
console.log(dateToday);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    console.log([day, month, year].join('-'))

    return [day, month, year].join('-');
}

function formatDate2(date) {
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

const currentDate = formatDate(dateToday);
console.log(currentDate);




function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
}


//Para mostrar fecha de vencimiento 
const vacationExpire = document.querySelector('.box-vac-venc');
vacationExpire.innerHTML = '',
    fs.collection('users').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().entryDay}`);
            const userLogueado = firebase.auth().currentUser;
            const useruid = userLogueado.uid;
            const user = doc.data();
            user.id = doc.id;

            if (useruid === user.id) {
                const vacationPending = user.vacationDaysPending - user.counterVacation
                console.log(vacationPending)
                let diaT = user.vacationDaysPending % 30
                console.log(diaT)
                const sumat = diaT + 30
                let vacationExpired
                let vacationTruncated
                if (vacationPending > sumat) {
                    vacationExpired = vacationPending - sumat
                    vacationTruncated = vacationPending - vacationExpired
                } else {
                    vacationExpired = 0
                    vacationTruncated = vacationPending
                }

                console.log(vacationExpired)
                console.log(vacationTruncated)
                vacationExpire.innerHTML += `
                <p><strong title="Fecha de vencimiento de las vacaciones">Vencimiento:</strong> ${user.newDateExpire} </p>
                <p><strong title="Vacaciones del año en curso">Truncas:</strong>${vacationTruncated} días</p>
                <p><strong title="Vacaciones que no se han gozado en el plazo establecido">Vencidas:</strong>${vacationExpired} días</p>`
            }
        })
    })



//funcion para sacar meses de diferencia
const monthDiff = (date1, date2) => {
    const vec1 = date1.split('-');
    var d1 = new Date(vec1[2], vec1[1] - 1, vec1[1]);
    const vec2 = date2.split('-');
    var d2 = new Date(vec2[2], vec2[1] - 1, vec2[1]);
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    if (d2.getDate() >= d1.getDate()) months++
    return months <= 0 ? 0 : months;
}

//multiplicar meses por 2.5 dias de vacaciones
const calcVacationTodayYear = (fecha1, fecha2) => {
    console.log(monthDiff(fecha1, fecha2))
    const resFechas = monthDiff(fecha1, fecha2)
    const pendingVacations = resFechas * 2.5;
    console.log(pendingVacations)
    return pendingVacations;


}



var nameWorker;
var area;
var dni;
var emailWorker;
var urlfirmRegister;
var resDateExpireYear;

const userId = sessionStorage.getItem('idUser');
var docRef = fs.collection("users").doc(userId);


docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        const user = doc.data();
        user.id = doc.id;
        nameWorker = user.name;
        area = user.area;
        dni = user.dni;
        urlfirmRegister = user.urlfirmRegister
        resDateExpireYear = user.newDateExpire
        entryDay = user.entryDay;
        emailWorker = user.email


        if (userId === user.id) {

            console.log(nameWorker, area, dni, urlfirmRegister, resDateExpireYear, entryDay);
            calcVacationTodayYear(currentDate, entryDay)

            const vacationDaysPending = calcVacationTodayYear(entryDay, currentDate)
            console.log(vacationDaysPending)
            //  const cityRef = fs.collection('users').doc(userLogueado.uid);

            docRef.update({

                vacationDaysPending,

            }, {
                merge: true
            });

        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});



document.querySelector('.inicio-Vacation').setAttribute('min', currentDate);
document.querySelector('.fin-Vacation').setAttribute('min', currentDate);;
// formulario para enviar solicitud de vacaciones
registerVacation.addEventListener('submit', (e) => {
    e.preventDefault();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    console.log(useruid)
    // var fecha = new Date();         
    const hours = new Date(document.querySelector('.inicio-Vacation').value);
    console.log(hours)
    const datetime = (`${hours.getFullYear()}${hours.getMonth() + 1}${hours.getDate()}${hours.getHours()}${hours.getMinutes()}${hours.getSeconds()}`);
    console.log(datetime)
    const startOfVacation = formato(document.querySelector('.inicio-Vacation').value);
    let endOfVacation;
    console.log(document.querySelector('.inicio-Vacation').value)
    const bossInmediate = document.querySelector('.name-leader').value;
    const dia = new Date(document.querySelector('.fin-Vacation').value)
    var dias = 3; // Número de días a agregar
    var dias2 = 2;
    const diaSemana = dia.getDay() + 1
    let dayChange;
    let dayChange2;
    if (diaSemana === 5) {
        dia.setDate(dia.getDate() + dias);
        dayChange = formatDate(dia)
        dayChange2 = formatDate2(dia)
        endOfVacation = dayChange
    } else if (diaSemana === 6) {
        dia.setDate(dia.getDate() + dias2);
        dayChange = formatDate(dia)
        dayChange2 = formatDate2(dia)
        endOfVacation = dayChange
    } else {
        endOfVacation = formato(document.querySelector('.fin-Vacation').value);
    }

    console.log(useruid, datetime, startOfVacation, endOfVacation, bossInmediate)

    docRef.get().then((doc) => {
        if (doc.exists) {

            const user = doc.data();
            user.id = doc.id;
            if (user.estado === true) {

                if (startOfVacation, endOfVacation) {
                    var contdias;
                    var fechaini = new Date(document.querySelector('.inicio-Vacation').value);
                    // var  fechafin = new Date(document.querySelector('.fin-Vacation').value);
                    var fechafin;
                    if (diaSemana === 5) {
                        fechafin = new Date(dayChange2);

                    } else {
                        fechafin = new Date(document.querySelector('.fin-Vacation').value);
                    }

                    var diasdif = fechafin.getTime() - fechaini.getTime();
                    var contdias1 = Math.round(diasdif / (1000 * 60 * 60 * 24));
                    contdias = contdias1 + 1;
                    console.log(contdias);
                    let counterVacation = user.counterVacation + contdias;
                    let vacationPending = user.vacationDaysPending - counterVacation
                    console.log(vacationPending)
                    let diaT = user.vacationDaysPending % 30
                    console.log(diaT)
                    const sumat = diaT + 30
                    let vacationExpired
                    let vacationTruncated
                    if (vacationPending > sumat) {
                        vacationExpired = vacationPending - sumat
                        vacationTruncated = vacationPending - vacationExpired
                    } else {
                        vacationExpired = 0
                        vacationTruncated = vacationPending
                    }

                    console.log(vacationExpired)
                    console.log(vacationTruncated)


                    if (userLogueado.uid === user.id) {
                        const cityRef = fs.collection('users').doc(userLogueado.uid);

                        const res = cityRef.update({

                            counterVacation,
                            vacationPending,
                            vacationExpired,
                            vacationTruncated


                        }, {
                            merge: true
                        });

                    }


                    console.log(nameWorker, area, dni, urlfirmRegister);

                    function sendEmail() {

                        console.log(nameWorker, startOfVacation, endOfVacation, leaderName, leaderEmail)

                        const message = `Estimado ${leaderName},
                      El colaborador ${nameWorker} 
                      ha solicitado Vacaciones desde su portal de Intranet - Web Imax, 
                      que inician el día ${startOfVacation} y terminan el día ${endOfVacation}. 
                      Por favor, sirvase a verificar y dar la respectiva aprobación`

                          const email = leaderEmail
                        // const email = 'sam.lourdesmerino@gmail.com'

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

                    sendEmail()

                    saveVacation(useruid,datetime, startOfVacation, endOfVacation, bossInmediate, contdias, nameWorker, area, dni, emailWorker, urlfirmRegister, resDateExpireYear).then(() => {
                        // sessionStorage.removeItem('fileNewTicked');
                        location.reload();
                        console.log('se registró solicitud de vacaciones');
                        registerVacation.reset();

                        alert('Se registró solicitud de vacaciones');
                    })

                }
            } else {
                alert('No tiene permiso del administrador para esta operación')
            }
        }
    })


});


//funcion para guaradr vacacones en firestore  
const saveVacation = (useruid, datetime, startOfVacation, endOfVacation, bossInmediate, contdias, nameWorker, area, dni, emailWorker, urlfirmRegister, resDateExpireYear) => {
    const firestore = fs;
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)

    // return firestore.collection('users').doc(userUid).collection('vacation').add({
    //     useruid,
    //     startOfVacation,
    //     endOfVacation,
    //     bossInmediate
    // });
    return firestore.collection('vacation').add({
        useruid,
        datetime,
        startOfVacation,
        endOfVacation,
        bossInmediate,
        contdias,
        nameWorker,
        emailWorker,
        area,
        dni,
        urlfirmRegister,
        resDateExpireYear,
        confirmacion: false
    });
};



const getVacationId = (id) => fs.collection('vacation').doc(id).get();
const confirVacationLider = document.querySelector('.table-vacation-vb');
confirVacationLider.innerHTML = '';
const boxSendRequest = document.querySelector('.box-send-petition-ok');
const templateDoc = document.querySelector('.templateDoc');
const totalSection = document.querySelector('.container-vacations');
templateDoc.innerHTML = '';


fs.collection('vacation').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().confirmacion}`);
        // console.log(querySnapshot)
        const userLogueado = firebase.auth().currentUser;
        const vacation = doc.data();
        vacation.id = doc.id;


        if (vacation.useruid === userLogueado.uid) {
            boxSendRequest.classList.remove('hide')
            confirVacationLider.innerHTML += `
                <tr>
                <td>${vacation.nameWorker}</td>  
                <td>${vacation.startOfVacation} al ${vacation.endOfVacation}</td>
                <td>${vacation.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${vacation.confirmacion}  name="conformidad" data-id="${vacation.id}"  readonly="readonly" onclick="javascript: return false;" checked>` : 
                                `<input type="checkbox" class="conformidad" value= ${vacation.confirmacion}  name="conformidad" data-id="${vacation.id}" readonly="readonly" onclick="javascript: return false;" > `} </td>
                <td> <a class="download-format" data-id="${vacation.id}">DESCARGAR</a></td>
                </tr>
            `

            const docFormato = document.querySelectorAll('.download-format');
            docFormato.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getVacationId(e.target.dataset.id)
                    console.log(doc)

                    fs.collection('vacation').onSnapshot((querySnapshot) => {
                        console.log(doc.data())

                        const vacation = doc.data();
                        templateDoc.innerHTML += `
                                <div class= "box-boleta-pdf"> 
                                <img class="firma-pdf" src="../assets/logo-imax.png">
                                <h1>Solicitud de vacaciones</h1>
                                <p class="body-doc">Mediante la presente me dirijo a usted, para solicitar
                                con anticipación los días de vacaciones correspondientes a este año, desde ${vacation.startOfVacation} 
                                al ${vacation.endOfVacation}
                                por ser mi derecho </p>

                                <p class="body-doc"> Agradeciendo su atencion y esperando que no exista inconveniente por 
                                su parte, quedo a la espera de su contestación </p>

                                <p class="body-doc"> Le saluda atentamente ${vacation.nameWorker}</p>
                                
                                <img class="firma-pdf" src="${vacation.urlfirmRegister} ">
                               
                                
                                </div> 
                                <button class="btnCreatePdf" onclick="docGenerar()">Descargar </button>
                                
                            `;

                        totalSection.classList.add('hide');



                        //     document.addEventListener("DOMContentLoaded", () => {
                        //         const btnPDF = document.querySelector('.btnCreatePdf');
                        //         btnPDF.addEventListener("click", () => {
                        //             const elementConvert = document.querySelector('.templateDoc');
                        //             html2pdf()
                        //                 .set({
                        //                     margin:1,
                        //                     filename:'document.pdf',

                        //                     html2canvas :{
                        //                         scale: 3,
                        //                         letterRendering:true,
                        //                     },
                        //                     jsPDF:{
                        //                         unit: "in",
                        //                         format: "a4",
                        //                         orientation:'portrait'
                        //                     }

                        //                 })
                        //                 .from(elementConvert)
                        //                 .save()
                        //                 .catch(err => console.log(err))
                        //         })
                        // })
                    })
                })
            })









        }
    })
})

function generatePDF() {
    const element = document.querySelector('.box-boleta-pdf');

    html2pdf()
        .set({
            margin: 1,
            filename: 'documento.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos, pero más peso
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a3",
                orientation: 'portrait' // landscape o portrait
            }
        })
        .from(element)
        .save();
}




const docGenerar = () => {
    firebase
        .firestore()
        .collection("vacation")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const idUser = sessionStorage.getItem("idUser");


                const vacation = doc.data();
                vacation.id = doc.id;
                if (vacation.useruid === idUser) {
                    console.log(vacation.startOfVacation)
                    generate()

                    function loadFile(url, callback) {
                        PizZipUtils.getBinaryContent(url, callback);
                    }

                    function generate() {
                        loadFile("https://cdn.glitch.com/7a93b0b5-9f3d-40e2-b908-9f7aeb4f09e1%2FSolicitud%20de%20Vacaciones.docx?v=1629693450567", function (error, content) {
                            if (error) {
                                throw error
                            };

                            // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                            function replaceErrors(key, value) {
                                if (value instanceof Error) {
                                    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                                        error[key] = value[key];
                                        return error;
                                    }, {});
                                }
                                return value;
                            }

                            function errorHandler(error) {
                                console.log(JSON.stringify({
                                    error: error
                                }, replaceErrors));

                                if (error.properties && error.properties.errors instanceof Array) {
                                    const errorMessages = error.properties.errors.map(function (error) {
                                        return error.properties.explanation;
                                    }).join("\n");
                                    console.log('errorMessages', errorMessages);
                                    // errorMessages is a humanly readable message looking like this :
                                    // 'The tag beginning with "foobar" is unopened'
                                }
                                throw error;
                            }

                            var zip = new PizZip(content);
                            var file;
                            try {
                                file = new window.docxtemplater(zip, {
                                    paragraphLoop: true,
                                    linebreaks: true
                                });
                            } catch (error) {
                                // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
                                errorHandler(error);
                            }

                            file.setData({
                                startOfVacation: vacation.startOfVacation,
                                endOfVacation: vacation.endOfVacation,
                                nameWorker: vacation.nameWorker,
                                // urlfirmRegister: vacation.urlfirmRegister
                            });
                            try {
                                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                                file.render();
                            } catch (error) {
                                // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                                errorHandler(error);
                            }

                            var out = file.getZip().generate({
                                type: "blob",
                                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            });
                            // Output the document using Data-URI
                            saveAs(out, "Mi solicitud.docx");
                        })
                    }


                }
            })
        })
}