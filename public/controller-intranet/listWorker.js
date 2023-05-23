
// PARA MOSTRAR DATOS EN LA TABLA DE COLABORADORES
const onGetUsers = (callback) => firebase.firestore().collection('users').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const deleteUserReg = id => firebase.firestore().collection('users').doc(id).delete();

 const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
var data = []
function downoloadAsExcel(){
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = {
        Sheets:{
            'data': worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook,{booktype:'xlsx',type:'array'});
    console.log(excelBuffer)
    saveAsExcel(excelBuffer,'ListaColaboradores')
}

function saveAsExcel(buffer,filename){
    const data = new Blob([buffer],{type:EXCEL_TYPE});
    saveAs(data,filename+'_export_'+new Date().getTime()+EXCEL_EXTENSION)

}


const userContainer = document.querySelector('.table-users')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetUsers((querySnapshot) => {
    userContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const user = doc.data();
      // console.log(user)

      delete user.password
      var dateJson = new Object();
            dateJson = JSON.stringify(user)
            // console.log(dateJson)

            data.push(user)
            // console.log(JSON.stringify(data))


      user.id = doc.id;
      const users = firebase.auth().currentUser;


      var docRef = firebase.firestore().collection("users").doc(user.leader);

      docRef.get().then((doc) => {
        if (doc.exists) {
          const leader = doc.data();
          leader.id = doc.id;
          if (leader.id === user.leader) {
            // console.log(user.leader)
            const nameLeader = leader.name;
            // console.log(nameLeader)
            userContainer.innerHTML += `
                        <tr class="row-users" contenteditable="false" data-id="${user.id}" id="row-data">
                          <td data-id="${user.id}" class="nameUser"> ${user.name}</td>  
                          <td data-id="${user.id}" class="dniUser">${user.dni}</td>
                          <td data-id="${user.id}" class="phoneUser">${user.phone}</td>
                          <td data-id="${user.id}" class="emailUser">${user.email}</td>  
                          <td data-id="${user.id}" class="areaUser">${user.area}</td>  
                          <td data-id="${user.id}" class="leaderUser">${nameLeader}</td>
                          <td data-id="${user.id}" class="fechaUser">${user.entryDay}</td>  
                         
                          <td><a href=${user.urlfirmRegister} download="Boleta.pdf"><button><i class="fas fa-download"></i>Descargar</button></a></td>
                          <td data-id="${user.id}" class="checkUser">${user.checkAdmin}</td>
                          <td data-id="${user.id}" class="checkLider">${user.checkLider}</td>
                      
                          <td><i class="btn-delUser fas fa-trash-alt" data-id="${user.id}" data-name="${user.name}"></i></td> 
                           <td>${user.estado === true ? `<input type="checkbox" class="estado" value= ${user.estado}  name="estado" data-id="${user.id}"  checked >` : 
                          `<input type="checkbox" class="estado" value= ${user.estado}  name="estado"  data-id="${user.id}" > `} </td>
                        </tr>  
                      `;


        const searchActive = document.querySelector('.estadoActivo')
        // console.log(searchActive);

        
        function buscar(inputbuscar) {
          var valorabuscar = (inputbuscar).toString().trim();
          console.log(valorabuscar)
          var tabla_tr = document.querySelectorAll("#row-data");
          // console.log(document.querySelector("#row-data"));

          for (var i = 0; i < tabla_tr.length; i++) {
            var tr = tabla_tr[i];
            // console.log(tabla_tr[i])
            
            var textotr = (tr.childNodes[22].nextSibling.childNodes[0].value);
            tr.className = (textotr.indexOf(inputbuscar) >= 0) ? "row-users" : "hide";
          }
        }

         searchActive.addEventListener("change", (event) => {
      
                const text = 'true'
                buscar(text)
           
          // const text = searchActive.checked
          // console.log(text.toString())
          // buscar(searchActive.checked)
          // console.log(text)
        })





            //  <td><i data-id="${user.id}" class="btn-editUser fas fa-edit"></i> <button data-id="${user.id}" class="btnSaveFile" id="btnSaveFile">💾</button> <i class="btn-delUser fas fa-trash-alt" data-id="${user.id}" data-name="${user.name}"></i></td>
            const deleteUser = document.querySelectorAll('.btn-delUser');
            deleteUser.forEach(btn => {
              btn.addEventListener('click', async (e) => {
                const txt = e.target.dataset.name;
                const r = confirm('¿Quieres eliminar a ' + txt + '?');
                if (r == true) {
                  deleteUserReg(e.target.dataset.id);
                } else {
                  console.log('nose eliminó')
                }




              })
            });

            const checkboxs = document.querySelectorAll('.estado');
    checkboxs.forEach(check => {
      check.addEventListener('change', function (e) {
        if (!this.checked) {
          console.log('click pe')
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              confirm('¿Desea cambiar el estado del Colaborador?')
              const cityRef = fs.collection('users').doc(doc.id);
              const res = cityRef.update({
                estado: false
              }, {
                merge: true
              });
              console.log('se cambio')
            }

          })
        
        } 
        else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              // confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              // window.localStorage.removeItem(doc.id, false)
              // window.localStorage.setItem(doc.id, false)
              const cityRef = fs.collection('users').doc(doc.id);
              const res = cityRef.update({
                 estado: true
              }, {
                merge: true
              });
            }
          })
        }
      })
    })








            const btnEditRow = document.querySelectorAll('.btn-editUser');

            const btnUpdateRow = document.querySelectorAll('.btnSaveFile');
            const editableRow = document.querySelectorAll('.row-users');

            btnEditRow.forEach(edit => {
              edit.addEventListener('click', (e) => {
                console.log('clickeando editar');
                console.log(e.target.dataset.id);
                console.log(doc.data());
                fs.collection('users').get().then((querySnapshot) => {
                  querySnapshot.forEach(doc => {
                    console.log(doc.id)
                    if (e.target.dataset.id === doc.id) {
                      console.log(e.target.dataset.id);
                      console.log(doc.id);
                      editableRow.contentEditable = 'true';
                      editableRow.forEach(row => {
                        console.log('holay')
                        row.addEventListener('click', (e) => {
                          console.log('holassss')
                          console.log(e.target.dataset.id);
                          console.log(doc.id);
                          if (e.target.dataset.id === doc.id) {
                            row.contentEditable = 'true';
                            row.style.background = 'blue';
                            row.style.color = 'red';
                            // row.focus()='true';
                          }
                        })
                      })
                    }
                  })
                })

              });
            })

            btnUpdateRow.forEach(update => {
              update.addEventListener('click', (e) => {
                console.log(update);
                const docId = e.target.dataset.id;
                editableRow.forEach(row => {
                  console.log('holay')
                  row.addEventListener('click', (e) => {
                    if (e.target.dataset.id === docId) {
                      console.log('aaaaaaaaaa')
                      const name = row.querySelector('.nameUser').innerHTML;
                      const checkAdmin = row.querySelector('.checkUser').innerHTML;
                      const dni = row.querySelector('.dniUser').innerHTML;
                      const phone = row.querySelector('.phoneUser').innerHTML;
                      const email = row.querySelector('.emailUser').innerHTML;
                      const area = row.querySelector('.areaUser').innerHTML;
                      const leader = row.querySelector('.leaderUser').innerHTML;
                      const entryDay = row.querySelector('.fechaUser').innerHTML;
                      const salarioAdmin = row.querySelector('.salarioAdminUser').innerHTML;
                      const checkLider = row.querySelector('.checkLider').innerHTML;
                      console.log(name, checkAdmin, dni, phone, email, area, leader, entryDay, salarioAdmin, checkLider)
                      const cityRef = firebase.firestore().collection('users').doc(docId);
                      const res = cityRef.update({
                        name,
                        checkAdmin,
                        dni,
                        phone,
                        email,
                        area,
                        leader,
                        entryDay,
                        salarioAdmin,
                        checkLider

                      }, {
                        merge: true
                      });
                      alert('Se han actualizado los datos')
                    }

                  })
                })

              })
            })
          }
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });







    });
  })
  getUsers()
})