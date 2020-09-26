let inputUserElement = document.querySelector('input#user');
let ul = document.querySelector('ul#list');

function createLi(data) {
  let li = document.createElement('li');
  let liContent = document.createTextNode(data);
  li.appendChild(liContent);
  ul.appendChild(li);
}

function searchGitApi() {
  let user = inputUserElement.value;
  let url = `https://api.github.com/users/${user}/repos`;
  let loadingMessage = 'Carregando...';
  ul.innerHTML = '';
  createLi(loadingMessage);

  fetch(url, { method: 'get', timeout: 5000 })
    .then((response) => {
      let statusResponse = response.ok;
      let data = response.json();

      if (statusResponse) {
        return data;
      } else {
        return statusResponse;
      }
    })
    .then((result) => {
      if (!result) {
        renderError('Erro ao encontrar usuário Git. ');
      } else {
        renderList(result);
      }
    });
}

function renderError(err) {
  ul.innerHTML = '';
  createLi(err);
}

function renderList(result) {
  console.log('resultado: ', result);
  ul.innerHTML = '';
  let dataArray = [...result];

  dataArray.map((repo) => {
    createLi(repo.url);
  });
}
