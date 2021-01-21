export const templatePost = (objPost) => {
    const user = firebase.auth().currentUser;
    const divElement = document.createElement('div');
    divElement.className = 'userPost';
    divElement.innerHTML = `
    <div class="postHeader">
      <div class="user-info">
      ${objPost.photo ? `<img class = "user" src="${objPost.photo}"> ` : '<img class = "user" src="assets/user.png">'}
        <div class= "dateUser">
          <p id="nameUser"> Publicado por: ${objPost.user} | Prof. Educ. Inicial </p>
          <select name="options" class="selectPrivacy ${(user.uid === objPost.useruid) || 'hide'}">
            <option value="0" ${(objPost.privacy === '1') || 'selected'} class="styleSelect">Público</option>
            <option value="1" ${(objPost.privacy === '0') || 'selected'} class="styleSelect">Privado</option>
          </select>
          <time datetime="date">${objPost.date} </time>
        </div>
      </div>
      ${(user.uid === objPost.useruid) ? `
      <div class="option-edit-post">
        <span>...</span>
          <ul class="optionPost"> 
            <li class="btnEdit">Editar</li>
            <li class="btnRemove">Eliminar</li>
          </ul>
      </div>  ` : ''}      
    </div>
    <div class= "editPostOption">
    <div class="contentPost">
      <p contenteditable="false" id="editPost" >${objPost.content}</p>
      ${objPost.url ? `<img id="photoPost" src="${objPost.url}">` : ''}
    </div>
    <button class="hide" hidden id="btnSave">💾</button>
    <button class="hide" hidden id="btnCancel">✖️</button>
    <div class="reactions">
      <div class="countLikes">
        <label class="counterLike" >${objPost.likes.length}</label>
        <button type= "button" class ="btnLike ${(objPost.likes.indexOf(user.uid) === -1)}"><img src="assets/like-solid-24.png">Me gusta</button>
      </div>
      <button type= "button" class ="btnComment"><img src="assets/add comment.png">Comentar</button>
    </div>
    <div class="name-Commentary">
    <textarea class="text-CommentPost" rows="1" cols="40"></textarea>
    <input type="image" class= "send-Comment" src="assets/send.png"> 
    </div>`;
    return divElement;
  };
  