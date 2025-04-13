document.addEventListener('DOMContentLoaded', function () {

  const API_BASE = 'https://simplon-back.onrender.com/api/v1/blagues';

  // Sélection des éléments DOM
  const homePage = document.getElementById('homePage');
  const listPage = document.getElementById('listPage');
  const addPage = document.getElementById('addPage');
  const detailPage = document.getElementById('detailPage');

  const navHome = document.getElementById('navHome');
  const navList = document.getElementById('navList');
  const navAdd = document.getElementById('navAdd');

  const jokeTitle = document.querySelector('#homePage .joke-question');
  const jokeContenu = document.getElementById('jokeContenu');
  const jokeBtn = document.getElementById('jokeBtn');
  const answerBtn = document.getElementById('answerBtn');
  const loading = document.getElementById('loading');

  const jokesList = document.getElementById('jokesList');
  const addJokeForm = document.getElementById('addJokeForm');
  const formMessage = document.getElementById('formMessage');

  const detailTitle = document.getElementById('detailTitle');
  const detailAnswer = document.getElementById('detailAnswer');
  const backToListBtn = document.getElementById('backToList');

  let currentJoke = null;

  function showPage(pageId) {
    homePage.classList.add('hidden');
    listPage.classList.add('hidden');
    addPage.classList.add('hidden');
    detailPage.classList.add('hidden');

    navHome.classList.remove('active');
    navList.classList.remove('active');
    navAdd.classList.remove('active');

    document.getElementById(pageId).classList.remove('hidden');

    if (pageId === 'homePage') {
      navHome.classList.add('active');
    } else if (pageId === 'listPage') {
      navList.classList.add('active');
      renderJokesList();
    } else if (pageId === 'addPage') {
      navAdd.classList.add('active');
    }
  }

  async function fetchRandomJoke() {
    loading.style.display = 'block';
    jokeContenu.classList.remove('visible');
    answerBtn.textContent = 'Voir la réponse';

    try {
      const res = await fetch(`${API_BASE}/random`);
      const response = await res.json();
      currentJoke = response.data;
     

      jokeTitle.textContent = currentJoke.titre;
      jokeContenu.textContent = currentJoke.contenu;
    } catch (err) {
      jokeTitle.textContent = "Erreur de chargement 😢";
      jokeContenu.textContent = "";
    }

    loading.style.display = 'none';
  }

  async function renderJokesList() {
    jokesList.innerHTML = '';

    try {
      const res = await fetch(`${API_BASE}`);
      const response = await res.json();
      const jokes = response.data;
     console.log(jokes);

      jokes.forEach(joke => {
        const jokeItem = document.createElement('div');
        jokeItem.className = 'joke-item';
        jokeItem.dataset.id = joke.id;

        jokeItem.innerHTML = `
          <h3>${joke.titre}</h3>
          <p>Cliquez pour voir la réponse</p>
        `;

        jokeItem.addEventListener('click', () => showJokeDetail(joke.id));
        jokesList.appendChild(jokeItem);
      });
    } catch (err) {
      jokesList.innerHTML = "<p>Erreur lors du chargement des blagues.</p>";
    }
  }

  async function showJokeDetail(jokeId) {
    try {
     
      const res = await fetch(`${API_BASE}/${jokeId}`);
      const response = await res.json();
      console.log(response);

      detailTitle.textContent = joke.titre;
      detailAnswer.textContent = joke.contenu;
      showPage('detailPage');
    } catch (err) {
      detailTitle.textContent = "Erreur";
      detailContenu.textContent = "";
    }
  }

  async function addJoke(titre,contenu) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titre,contenu })
    });

    if (!res.ok) {
      throw new Error("Erreur lors de l'envoi");
    }

    return await res.json();
  }

  // Events
  navHome.addEventListener('click', function (e) {
    e.preventDefault();
    showPage('homePage');
  });

  navList.addEventListener('click', function (e) {
    e.preventDefault();
    showPage('listPage');
  });

  navAdd.addEventListener('click', function (e) {
    e.preventDefault();
    showPage('addPage');
  });

  jokeBtn.addEventListener('click', fetchRandomJoke);

  answerBtn.addEventListener('click', function () {
    if (currentJoke) {
      jokeContenu.classList.toggle('visible');
      this.textContent = jokeContenu.classList.contains('visible') ? 'Cacher la réponse' : 'Voir la réponse';
    }
  });

  addJokeForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const questionValue = document.getElementById('jokeTitle').value.trim();
    const answerValue = document.getElementById('jokeContenuInput').value.trim();

    if (questionValue && answerValue) {
      try {
        await addJoke(questionValue, answerValue);
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Blague ajoutée avec succès !';
        addJokeForm.reset();

        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = 'form-message';
        }, 3000);
      } catch (err) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Erreur lors de l’envoi de la blague.';
      }
    } else {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Veuillez remplir tous les champs.';
    }
  });

  backToListBtn.addEventListener('click', function () {
    showPage('listPage');
  });

  fetchRandomJoke();
});
