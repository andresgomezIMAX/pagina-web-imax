  let editStatus = false;
  let id = '';


  const onGetUsers = (callback) => fs.collection('users').orderBy("name", "asc").onSnapshot(callback);
  //Para nombres
  const boxNameWorker = document.querySelector('.nameWorkers');
  console.log(boxNameWorker)
  boxNameWorker.innerHTML = '';
  onGetUsers((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().leader}`);
      const userLogueado = firebase.auth().currentUser;
      const useruid = userLogueado.uid;
      const user = doc.data()
      user.id = doc.id;
      if (user.estado === true) {
        boxNameWorker.innerHTML += `
                <option value="${doc.id}" >${doc.data().name}</option>`
      }

    })
  })


  // GUARDANDO URL DEL PDF DE LA BOLETA
  let file;
  const currentUser = () => firebase.auth().currentUser;
  const urlBoleta = document.querySelector('.addTicked')
  if (urlBoleta) {
    urlBoleta.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      let file = e.target.files[0];
      if (file) {
        const storageRef = firebase.storage().ref(`tickedFile/${currentUser().email}/${file.name}`);
        const task = storageRef.put(file);
        console.log(task)
        let urlBoleta = '';
        // Update progress bar
        // task.on('state_changed', () => {
        //   task.snapshot.ref.getDownloadURL()
        //     .then((url) => {
        //       console.log('File available at', url);
        //       urlBoleta = url;
        //       console.log('holaaaaaaaaaaaa', urlBoleta);
        //       sessionStorage.setItem('fileNewTicked', urlBoleta);
        //     })

        // });

        task.on('state_changed', (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progress = document.querySelector('.progressline');
          progress.parentNode.classList.add('show');
          progress.innerText = `${percent.toFixed(0)}%`;
          progress.style.width = `${percent}%`;
        }, () => {}, () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log('File available at', url);
            urlBoleta = url;
            sessionStorage.setItem('fileNewTicked', urlBoleta);
          })
          setTimeout(() => {
            const progress = document.querySelector('.progressline');
            progress.parentNode.classList.remove('show');
          }, 2500);
        });

      }
    })
  }

  // ADMINISTRADOR GENERAR BOLETA
  const btnGenerarBoleta = document.querySelector('.btn-generar-boleta');
  const generarBoleta = document.querySelector('.generate-ticket');

  generarBoleta.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('hola');
    // const userLogueado = firebase.auth().currentUser;
    // console.log(userLogueado)
    // const useruid = userLogueado.uid;
    const boxIdWorder = document.querySelector('.nameWorkers')
    const idWorker = document.querySelector('.nameWorkers').value;
    boxIdWorder.style.backgroundColor = "";
    const nameWorker = boxIdWorder.options[boxIdWorder.selectedIndex].text;
    const year = document.querySelector('.year').value;
    document.querySelector('.year').style.backgroundColor = "";
    const month = document.querySelector('.month').value;
    document.querySelector('.month').style.backgroundColor = "";
    const totalPage = document.querySelector('.totalPage').value;
    document.querySelector('.totalPage').style.backgroundColor = "";
    const urlBoleta = sessionStorage.getItem('fileNewTicked');
    console.log(idWorker, nameWorker, year, month, totalPage, urlBoleta)
    if (urlBoleta) {
      if (!editStatus) {
        saveBoleta(idWorker, nameWorker, year, month, totalPage, urlBoleta).then(() => {
          sessionStorage.removeItem('fileNewTicked');
          console.log('se registró boleta');
          generarBoleta.reset();
          alert('se registró boleta');

        });
      }

    } else {
      updatePage(id, {
        idWorker: idWorker,
        nameWorker: nameWorker,
        year: year,
        month: month,
        totalPage: totalPage,
        urlBoleta: urlBoleta
      })

      alert('se actualizó boleta');
      generarBoleta.reset();


    }

    editStatus = false;
    id = '';
    btnGenerarBoleta.innerHTML = 'Generar'

  });




  //FUNCIÓN DE FIREBASE PARA CREAR LA COLECCION DE BOLETAS 
  const saveBoleta = (idWorker, nameWorker, year, month, totalPage, urlBoleta) => {
    const firestore = fs;
    return firestore.collection('pages').add({
      idWorker,
      nameWorker,
      year,
      month,
      totalPage,
      urlBoleta,
      confirmacion: false
    });
  };


  //descargar Data

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
    saveAsExcel(excelBuffer, 'listaBoletas')
  }

  function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION)

  }




  //PARA MOSTRAR LAS BOLETAS GUARDADAS EN LA TABLA DE 'PAGES'

  const onGetPages = (callback) => fs.collection('pages').orderBy('month', 'asc').onSnapshot(callback);
  const getPageEdit = (id) => fs.collection('pages').doc(id).get();
  const getUsers = () => fs.collection('users').get();
  const deletePageId = id => fs.collection('pages').doc(id).delete();
  const updatePage = (id, contentPage) => fs.collection('pages').doc(id).update(contentPage);

  const pageContainer = document.querySelector('.table-page')
  window.addEventListener('DOMContentLoaded', async (e) => {
    onGetPages((querySnapshot) => {
      pageContainer.innerHTML = '';
      querySnapshot.forEach(doc => {
        const page = doc.data();
        // console.log(page)
        var dateJson = new Object();
        dateJson = JSON.stringify(page)

        data.push(page)
        // console.log(JSON.stringify(data))

        page.id = doc.id;
        const user = firebase.auth().currentUser;
        pageContainer.innerHTML += `
                              <tr class ="nameWorker-month">
                                <td >${page.nameWorker}</td>  
                                <td>${page.month}</td>
                                <td>${page.year}</td>
                                <td><a href=${page.urlBoleta} target="_blank" download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
                                <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}"  readonly="readonly" onclick="javascript: return false;" checked>` : 
                                `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" readonly="readonly" onclick="javascript: return false;" > `} </td>
                                <td><i data-id="${page.id}" class="btnEdit fas fa-edit"></i> <i class="deletePage fas fa-trash-alt" data-id="${page.id}"></i></td>
                              </tr>`;




        // function searchFilter(input, selector) {
        //   d.addEventListener('keyup', (e) => {
        //     if (e.target.matches(input)) {
        //       d.querySelectorAll(selector).forEach((el) =>
        //         el.textContent.toUpperCase().includes(e.target.value) ?
        //         el.classList.remove("hide") :
        //         el.classList.add("hide"))
        //     }
        //   })
        // }

        // searchFilter('.searchName', '.nameWorker')

        // searchFilter('.searchMonth', '.month')




        const deletePage = document.querySelectorAll('.deletePage');
        deletePage.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const r = confirm('¿Quieres eliminar esta Boleta de Pago?')
            if (r == true) {
              await deletePageId(e.target.dataset.id)
            }
          })
        });

        const btnsEdit = document.querySelectorAll('.btnEdit');
        btnsEdit.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const doc = await getPageEdit(e.target.dataset.id)
            console.log(doc.data())
            const page = doc.data();
            id = doc.id;
            console.log(id)
            editStatus = true;

            const nameWorker = document.querySelector('.nameWorkers');
            nameWorker.text = page.nameWorker
            nameWorker.value = page.idWorker
            nameWorker.style.backgroundColor = "#fc7617";
            const year = document.querySelector('.year');
            year.value = page.year;
            year.style.backgroundColor = "#fc5817";
            const month = document.querySelector('.month');
            month.value = page.month;
            month.style.backgroundColor = "#fc7617";
            const totalPage = document.querySelector('.totalPage');
            totalPage.value = page.totalPage;
            totalPage.style.backgroundColor = "#fc7617";
            const urlBoleta = document.querySelector('.addTicked');

            console.log(nameWorker.value, year.value, month.value, totalPage.value, urlBoleta.file)

            let res;


            fs.collection('pages').onSnapshot(async (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().urlBoleta}`);
                const boleta = doc.data();
                boleta.id = doc.id;
                console.log(boleta.id)
                console.log(id)
                if (boleta.id === id) {
                  res = boleta.urlBoleta;
                  console.log(res)
                  console.log('jaaaa')
                  console.log(res)
                  console.log(urlBoleta.file = res)
                  urlBoleta.file = res;
                  console.log(nameWorker.value, year.value, month.value, totalPage.value, urlBoleta.file)
                  editStatus = true;


                }
              })

            })
            btnGenerarBoleta.innerHTML = 'Actualizar'

          })
          //  
        });


      });
    });
  });

  const searchName = document.querySelector('.searchName')
  // console.log(searchName);

  const searchMonth = document.querySelector('.searchMonth')
  console.log(searchMonth);

  const searchYear = document.querySelector('.searchYear')
  // console.log(searchYear);



  function doSearch(text) {
    var tableReg = document.querySelector('.tabla-boletas');

    for (var i = 1; i < tableReg.rows.length; i++) {
      var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
      // console.log(cellsOfRow)
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
    var tabla_tr = document.querySelector(".table-page").getElementsByTagName('tr');

    for (var i = 0; i < tabla_tr.length; i++) {
      var tr = tabla_tr[i];
      var textotd = (tr.childNodes[2].nextSibling.innerText).toLowerCase();
      tr.style.display = (textotd.indexOf(valorabuscar) >= 0) ? "" : "none";
    }
  }

  function buscar2(inputbuscar) {
    var valorabuscar = (inputbuscar).trim();
    console.log(valorabuscar)
    var tabla_tr = document.querySelector(".table-page").getElementsByTagName('tr');

    for (var i = 0; i < tabla_tr.length; i++) {
      var tr = tabla_tr[i];
      var textotd = (tr.childNodes[4].nextSibling.innerText)
      tr.style.display = (textotd.indexOf(valorabuscar) >= 0) ? "" : "none";
    }
  }



  searchMonth.addEventListener("change", (event) => {
    const text = event.target.value.toLowerCase();
    console.log(text)
    buscar(text)

  })

  searchYear.addEventListener("change", (event) => {
    const text = event.target.value;
    console.log(text)
    buscar2(text)

  })