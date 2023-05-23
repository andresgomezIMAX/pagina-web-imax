// para mostrar los datos en la tabla'pages'
const onGetCts = (callback) => fs.collection('cts').onSnapshot(callback);
const getUsers = () => fs.collection('users').get();
const getCts = () => fs.collection().get();

const ctsContainer = document.querySelector('.table-cts')
window.addEventListener('DOMContentLoaded', async(e) => {
    onGetCts((querySnapshot)=>{
    ctsContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const cts = doc.data();
      console.log(cts)
      cts.id = doc.id;
      const userLogueado = firebase.auth().currentUser;
      console.log(userLogueado.uid)
      if (cts.idWorkerCts === userLogueado.uid) {
        ctsContainer.innerHTML +=  `
        <tr class ="monthCts">
        <td>${cts.monthCts} - ${cts.yearCts}</td>
        <td>${cts.pageCts}</td>
        <td><a href=${cts.urlCts} target="_blank" download="Cts.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
        <td>${cts.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad" data-id="${cts.id}" disabled="disabled"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad"  data-id="${cts.id}" > `} </td>
      </tr>`;

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

     

   

      }
    
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
              alert('¿Desea dar conformidad a su Constancia CTS?')
              const cityRef = fs.collection('cts').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });
             
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
              const cityRef = fs.collection('cts').doc(doc.id);
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