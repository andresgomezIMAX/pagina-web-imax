// para mostrar los datos en la tabla'documents'
const onGetDocuments = (callback) => fs.collection('documents').onSnapshot(callback);
const getUsers = () => fs.collection('users').get();

const documentContainer = document.querySelector('.table-page')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetDocuments((querySnapshot) => {
    documentContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const page = doc.data();
      console.log(page)
      page.id = doc.id;
      const userLogueado = firebase.auth().currentUser;
      console.log(userLogueado)
      if (page.idWorker === userLogueado.uid) {
        documentContainer.innerHTML += `
        <tr class ="month">
        <td>${page.nameDoc}</td>
        <td>${page.month} - ${page.year}</td>
        <td>${page.totalPage}</td>
        <td><a href=${page.urlBoleta} target="_blank" download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
        <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" disabled="disabled"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad"  data-id="${page.id}" > `} </td>
        </tr>

        `
        const searchMonth = document.querySelector('.search')
        console.log(searchMonth);

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

        searchMonth.addEventListener("keyup", e => {
          var searchText = searchMonth.value.toLowerCase();
          doSearch(searchText)
        })
      };

    });



    const checkboxs = document.querySelectorAll('.conformidad');
    checkboxs.forEach(check => {
      check.addEventListener('click', function (e) {
        if (this.checked) {
          console.log('click pe')
          querySnapshot.forEach(doc => {
            const confir = doc.id
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {

              console.log('joalaaa')
              alert('¿Desea dar conformidad a su Boleta de pago?')
              window.localStorage.setItem(doc.id, check.checked)
              const cityRef = fs.collection('documents').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });

            }

          })

          check.setAttribute("disabled", "disabled")

        } else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              const cityRef = fs.collection('documents').doc(doc.id);
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