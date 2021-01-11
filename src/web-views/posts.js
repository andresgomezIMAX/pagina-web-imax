const postsList = document.querySelector('.posts');

const setupPosts = data => {
    if (data.length) {
        let html = '';
        data.forEach(doc=> {
            const post = doc.data();
            const li = `
            <li>
            <h5>${post.title}</h5>
            <p>${post.description}</p>
            </li>`;

            html += li;
        });

        postsList.innerHTML= html;
    } else {
        postsList.innerHTML= `<p>No existen post en este momento</p>`;
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      fs.collection('posts')
      .get()
      .then((snapshot) => {
          console.log(snapshot.docs);
          setupPosts(snapshot.docs)
      })
    } else {
      console.log('auth: sign out');
      setupPosts([])
    }
  });