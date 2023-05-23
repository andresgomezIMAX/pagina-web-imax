const deleteVacationId = id => fs.collection('vacation').doc(id).delete();
const getVacationId = (id) => fs.collection('vacation').doc(id).get();
const getUserId = (id) => fs.collection('users').doc(id).get();

//funcion para crear DATETIME 
// const cityRef = fs.collection('vacation')
// cityRef.where("nameWorker", '==', "ELGUERA ROJAS ALFREDO HECTOR")
//     .get()
//     .then(snapshots => {
//         if (snapshots.size > 0) {
//             snapshots.forEach(doc => {
//                 console.log(doc.data())
//                 const vacation = doc.data();
//                 let fechaInit = vacation.startOfVacation
//                 vacation.id = doc.id;
//                 var newdate = fechaInit.split("-").reverse().join("-");
//                 console.log(newdate)
//                 const hours = new Date(newdate);
//                 console.log(hours)
//                 const datetime = (`${hours.getFullYear()}${hours.getMonth() + 1}${hours.getDate() + 1}${hours.getHours()}${hours.getMinutes()}${hours.getSeconds()}`);
//                 console.log(datetime)

//                 cityRef.doc(doc.id).update({
//                     datetime
//                 })
//             })
//         }
//     })

// const document = await db.collection("vacation").doc("juanwmedia").get();

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
var data = []

function downoloadAsExcel() {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, {
        booktype: 'xlsx',
        type: 'array'
    });
    console.log(excelBuffer)
    saveAsExcel(excelBuffer, 'ListaVacaciones')
}

function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION)

}



const onGetVacation = (callback) => fs.collection('vacation').orderBy("datetime", "desc").onSnapshot(callback);
var vacationNameWorker;
const vacationContainer = document.querySelector('.table-vacation-lider')
window.addEventListener('DOMContentLoaded', async (e) => {
    onGetVacation((querySnapshot) => {
        vacationContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const vacation = doc.data();
            var dateJson = new Object();
            dateJson = JSON.stringify(vacation)
            // console.log(dateJson)

            data.push(vacation)
            // console.log(JSON.stringify(data))



            vacation.id = doc.id;
            const user = firebase.auth().currentUser;

            vacationContainer.innerHTML += `
                <tr class="nameWorker">
                <td>${vacation.nameWorker}</td>  
                <td class="startVacation">${vacation.startOfVacation}</td>
                <td>${vacation.endOfVacation}</td>
                <td>${vacation.area}</td>
                <td>Cant. de Días Solicitados: ${vacation.contdias} días <br>
                Vencen: ${(vacation.resDateExpireYear) ? vacation.resDateExpireYear : vacation.newDateExpire} </td>
                 <td>${vacation.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${vacation.confirmacion}  name="conformidad" data-id="${vacation.id}"  readonly="readonly" onclick="javascript: return false;" checked>` : 
                                `<input type="checkbox" class="conformidad" value= ${vacation.confirmacion}  name="conformidad" data-id="${vacation.id}" readonly="readonly" onclick="javascript: return false;" > `} </td>
                <td><button data-id="${vacation.id}" class="btnCreatePdf" onclick="docGenerar()">Descargar </button></td>
                <td> <i class="deleteVacation fas fa-trash-alt" data-id="${vacation.id}"> </i> </td>
                </tr>
                 `;

            const btnCreatePdf = document.querySelectorAll('.btnCreatePdf');
            btnCreatePdf.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const r = confirm('¿Quieres descargar esta Solicitud?')
                    if (r == true) {
                        await docGenerar(e.target.dataset.id)
                    }
                })
            });







        });


        

        // const d = document;

        // function searchFilter(input, selector) {
        //     d.addEventListener('keyup', (e) => {
        //         if (e.target.matches(input)) {
        //             d.querySelectorAll(selector).forEach((el) =>
        //                 el.textContent.toLowerCase().includes(e.target.value) ?
        //                 el.classList.remove("hide") :
        //                 el.classList.add("hide"))
        //         }
        //     })
        // }

        // searchFilter('.search', '.nameWorker')

        const deleteVacation = document.querySelectorAll('.deleteVacation');
        deleteVacation.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const r = confirm('¿Quieres eliminar esta Solicitud de Vacaciones?')
                console.log(e.target.dataset.id)
                if (r == true) {
                    const doc = await getVacationId(e.target.dataset.id)
                    const post = doc.data();
                    console.log(post)
                    const idUser = post.useruid
                    const contdias = post.contdias
                    console.log(idUser)
                    console.log(contdias)

                    const udoc = await getUserId(idUser)
                    const user = udoc.data();
                    console.log(user)



                    const counterVacations = user.counterVacation - contdias
                    console.log(counterVacations)
                    const counterVacation = counterVacations
                    const cityRef = fs.collection('users').doc(idUser);
                    const res = cityRef.update({
                        counterVacation
                    }, {
                        merge: true
                    });
                    await deleteVacationId(e.target.dataset.id)
                }

            })
        });



    })


})

const docGenerar = (id) => {
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
                if (vacation.id === id) {
                    console.log(vacationNameWorker)
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

const searchName = document.querySelector('.search')
        console.log(searchName);

        const searchMonth = document.querySelector('.searchMonth')
        console.log(searchMonth);

        const searchYear = document.querySelector('.searchYear')
        console.log(searchYear);

        function doSearch(text) {
            var tableReg = document.querySelector('.tabla-vacation-admin');

            for (var i = 1; i < tableReg.rows.length; i++) {
                var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                console.log(cellsOfRow)
                var found = false;
                for (var j = 0; j < cellsOfRow.length && !found; j++) {
                    var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                    if (text.length == 0 || (compareWith.indexOf(text) > -1)) {
                        found = true;
                    }
                }
                if (found) {
                    tableReg.rows[i].style.display = '';
                } else {
                    tableReg.rows[i].style.display = 'none';
                }
            }
        }

        searchName.addEventListener("keyup", e => {
            var searchText = searchName.value.toLowerCase();
            doSearch(searchText)
        })



        function buscar(inputbuscar) {
            var valorabuscar = (inputbuscar).trim();
            console.log(valorabuscar)
            var tabla_tr = document.querySelector(".table-vacation-lider").getElementsByTagName('tr');
    
            for (var i = 0; i < tabla_tr.length; i++) {
                var tr = tabla_tr[i];
                var textotd = (tr.childNodes[2].nextSibling.innerText);
                console.log(textotd)
                var textoDate = textotd.slice(6, 10)
                console.log(textoDate)

                 tr.style.display = (textoDate.indexOf(valorabuscar) >= 0) ? "" : "none";
            



            }
        }

        function buscar2(inputbuscar) {
            var valorabuscar = (inputbuscar).trim();
            console.log(valorabuscar)
            var tabla_tr = document.querySelector(".table-vacation-lider").getElementsByTagName('tr');

            for (var i = 0; i < tabla_tr.length; i++) {
                var tr = tabla_tr[i];
                var textotd = (tr.childNodes[2].nextSibling.innerText);
                var textoDate = textotd.slice(3, 5)
                tr.style.display = (textoDate.indexOf(valorabuscar) >= 0) ? "" : "none";

            }
        }

        searchMonth.addEventListener("change", (event) => {
            const text = event.target.value;
            buscar2(text)
        })


        searchYear.addEventListener("change", (event) => {
            const text = event.target.value
            buscar(text)
            console.log(text)
        })