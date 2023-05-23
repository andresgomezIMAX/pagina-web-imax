let editStatus = false;
let id = '';

const onGetUsers = (callback) => fs.collection('users').orderBy("name", "asc").onSnapshot(callback);
//Para nombres por defecto
const boxNameWorkerCts = document.querySelector('.nameWorkersCts');
boxNameWorkerCts.innerHTML = '',
  onGetUsers((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().name}`);
      const userLogueado = firebase.auth().currentUser;
      const useruid = userLogueado.uid;
      const user = doc.data()
      user.id = doc.id;

      if (user.estado === true) {
        boxNameWorkerCts.innerHTML += `
                <option value="${doc.id}">${doc.data().name}</option>`
      }




    })
  })



// ADMINISTRADOR GENERAR CTS
let file;
const currentUser = () => firebase.auth().currentUser;
const addCts = document.querySelector('.addImgCts')
if (addCts) {
  addCts.addEventListener('change', (e) => {
    console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
    // Get file
    file = e.target.files[0];
    if (file) {
      const storageRef = firebase.storage().ref(`ctsFile/${currentUser().email}/${file.name}`);
      const task = storageRef.put(file);
      console.log(task)
      let urlCts = '';

      task.on('state_changed', (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const progress = document.querySelector('.progressline');
        progress.parentNode.classList.add('show');
        progress.innerText = `${percent.toFixed(0)}%`;
        progress.style.width = `${percent}%`;
      }, () => {}, () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          console.log('File available at', url);
          urlCts = url;
          sessionStorage.setItem('fileNewCts', urlCts);
        })
        setTimeout(() => {
          const progress = document.querySelector('.progressline');
          progress.parentNode.classList.remove('show');
        }, 2500);
      });

    }
  })
}




// ADMINISTRADOR GENERAR CTS
const generarCts = document.querySelector('.generate-ticket');
const btnGenerarCts = document.querySelector('.btn-generar-cts');
generarCts.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('hola');
  // const userLogueado = firebase.auth().currentUser;
  // console.log(userLogueado)
  // const useruid = userLogueado.uid;
  const boxIdCts = document.querySelector('.nameWorkersCts');
  boxIdCts.style.backgroundColor = "";
  const idWorkerCts = document.querySelector('.nameWorkersCts').value;
  const nameWorkerCts = boxIdCts.options[boxIdCts.selectedIndex].text;
  const yearCts = document.querySelector('.year').value;
  document.querySelector('.year').style.backgroundColor = "";
  const monthCts = document.querySelector('.month-Cts').value;
  document.querySelector('.month-Cts').style.backgroundColor = "";
  const pageCts = document.querySelector('.page-cts').value;
  document.querySelector('.page-cts').style.backgroundColor = "";
  const urlCts = sessionStorage.getItem('fileNewCts');
  console.log(idWorkerCts, nameWorkerCts, yearCts, monthCts, pageCts, urlCts);
  if (urlCts) {
    if (!editStatus) {
      saveCts(idWorkerCts, nameWorkerCts, yearCts, monthCts, pageCts, urlCts).then(() => {
        sessionStorage.removeItem('fileNewCts');
        console.log('se registró constancia CTS');
        generarCts.reset();
        alert('se registró constancia CTS');

      });
    }

  } else {
    updateCts(id, {
      idWorkerCts: idWorkerCts,
      nameWorkerCts: nameWorkerCts,
      yearCts: yearCts,
      monthCts: monthCts,
      pageCts: pageCts,

    })

    alert('se actualizó constancia CTS');
    generarCts.reset();

  }

  editStatus = false;
  id = '';
  btnGenerarCts.innerHTML = 'Generar'


});

const saveCts = (idWorkerCts, nameWorkerCts, yearCts, monthCts, pageCts, urlCts) => {
  const firestore = fs;
  return firestore.collection('cts').add({
    idWorkerCts,
    nameWorkerCts,
    yearCts,
    monthCts,
    pageCts,
    urlCts,
    confirmacion: false
  });
};

// para mostrar los datos en la tabla'cts'
const onGetCts = (callback) => fs.collection('cts').orderBy('monthCts', 'asc').onSnapshot(callback);
const getCtsEdit = (id) => fs.collection('cts').doc(id).get();
const getUsers = () => fs.collection('users').get();
const deleteCtsId = id => fs.collection('cts').doc(id).delete();
const updateCts = (id, contentCts) => fs.collection('cts').doc(id).update(contentCts);

const ctsContainer = document.querySelector('.table-cts')
console.log(ctsContainer)
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetCts((querySnapshot) => {
    ctsContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const cts = doc.data();
      console.log(cts)
      cts.id = doc.id;
      const user = firebase.auth().currentUser;
      ctsContainer.innerHTML += `
                              <tr class ="nameWorkerCts monthCts">
                                <td> ${cts.nameWorkerCts}</td>  
                                <td> ${cts.monthCts}</td>
                                <td> ${cts.yearCts}</td>
                                <td><a href=${cts.urlCts} target="_blank" download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
                                
                                <td>${cts.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad" data-id="${cts.id}"  readonly="readonly" onclick="javascript: return false;" checked>` : 
                                `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad" data-id="${cts.id}" readonly="readonly" onclick="javascript: return false;" > `} </td>
                                <td><i data-id="${cts.id}" class="btnEdit fas fa-edit"></i> <i class="deleteCts fas fa-trash-alt" data-id="${cts.id}"></i></td>
                              </tr>
                             `;


      const deleteCts = document.querySelectorAll('.deleteCts');
      deleteCts.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const r = confirm('¿Quieres eliminar esta Constancia CTS?')
          if (r == true) {
            await deleteCtsId(e.target.dataset.id)
          }

        })
      });


      const btnsEdit = document.querySelectorAll('.btnEdit');
      btnsEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await getCtsEdit(e.target.dataset.id)
          console.log(doc.data())
          const cts = doc.data();
          id = doc.id;
          console.log(id)
          editStatus = true;

          const nameWorkerCts = document.querySelector('.nameWorkersCts');
          nameWorkerCts.text = cts.nameWorkerCts;
          nameWorkerCts.value = cts.idWorkerCts;
          nameWorkerCts.style.backgroundColor = "#fc7617";
          const yearCts = document.querySelector('.year');
          yearCts.value = cts.yearCts;
          yearCts.style.backgroundColor = "#fc7617";
          const monthCts = document.querySelector('.month-Cts');
          monthCts.value = cts.monthCts;
          monthCts.style.backgroundColor = "#fc7617";
          const pageCts = document.querySelector('.page-cts');
          pageCts.value = cts.pageCts;
          pageCts.style.backgroundColor = "#fc7617";
          const urlCts = document.querySelector('.addImgCts');

          console.log(nameWorkerCts.value, yearCts.value, monthCts.value, pageCts.value, urlCts.file)

          let res;


          fs.collection('cts').onSnapshot(async (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data().urlCts}`);
              const constCts = doc.data();
              constCts.id = doc.id;
              console.log(constCts.id)
              console.log(id)
              if (constCts.id === id) {
                res = constCts.urlCts;
                console.log(res)
                console.log('jaaaa')
                console.log(res)
                console.log(urlCts.file = res)
                urlCts.file = res;
                console.log(nameWorkerCts.value, yearCts.value, monthCts.value, pageCts.value, urlCts.file)
                editStatus = true;


              }
            })




          })
          btnGenerarCts.innerHTML = 'Actualizar'
        })
      });
    });
  })

})

      const searchName = document.querySelector('.searchNameCts')
  

      const searchMonth = document.querySelector('.searchMonthCts')


      const searchYear = document.querySelector('.searchYearCts')




      function doSearch(text) {
        var tableReg = document.querySelector('.tabla-cts');

        for (var i = 1; i < tableReg.rows.length; i++) {
          var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');

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
      
        var tabla_tr = document.querySelector(".table-cts").getElementsByTagName('tr');

        for (var i = 0; i < tabla_tr.length; i++) {
          var tr = tabla_tr[i];
          var textotd = (tr.childNodes[2].nextSibling.innerText).toLowerCase();
          tr.style.display = (textotd.indexOf(valorabuscar) >= 0) ? "" : "none";
        }
      }

      function buscar2(inputbuscar) {
        var valorabuscar = (inputbuscar).trim();

        var tabla_tr = document.querySelector(".table-cts").getElementsByTagName('tr');

        for (var i = 0; i < tabla_tr.length; i++) {
          var tr = tabla_tr[i];
          var textotd = (tr.childNodes[4].nextSibling.innerText)
          tr.style.display = (textotd.indexOf(valorabuscar) >= 0) ? "" : "none";
        }
      }

      searchMonth.addEventListener("change", (event) => {
        const text = event.target.value.toLowerCase();
        buscar(text)
      
      })


      searchYear.addEventListener("change", (event) => {
        const text = event.target.value
        buscar2(text)

      })
