document.addEventListener("DOMContentLoaded", function () {
  const API_BASE = "https://simplon-back.onrender.com/api/v1/blagues";

  // Sélection des éléments DOM
  const homePage = document.getElementById("homePage");
  const listPage = document.getElementById("listPage");
  const addPage = document.getElementById("addPage");
  const detailPage = document.getElementById("detailPage");

  const navHome = document.getElementById("navHome");
  const navList = document.getElementById("navList");
  const navAdd = document.getElementById("navAdd");

  const jokeTitle = document.querySelector("#homePage .joke-question");
  const jokeContenu = document.getElementById("jokeContenu");
  const jokeBtn = document.getElementById("jokeBtn");
  const answerBtn = document.getElementById("answerBtn");
  const loading = document.getElementById("loading");

  const jokesList = document.getElementById("jokesList");
  const addJokeForm = document.getElementById("addJokeForm");
  const formMessage = document.getElementById("formMessage");

  const detailTitle = document.getElementById("detailTitle");
  const detailContenu = document.getElementById("detailContenu");
  const backToListBtn = document.getElementById("backToList");

  let currentJoke = null;

  function showPage(pageId) {
    homePage.classList.add("hidden");
    listPage.classList.add("hidden");
    addPage.classList.add("hidden");
    detailPage.classList.add("hidden");

    navHome.classList.remove("active");
    navList.classList.remove("active");
    navAdd.classList.remove("active");

    document.getElementById(pageId).classList.remove("hidden");

    // Mettre à jour la classe active dans la barre de navigation
    if (pageId === "homePage") {
      navHome.classList.add("active");
    } else if (pageId === "listPage") {
      navList.classList.add("active");
      renderJokesList();
    } else if (pageId === "addPage") {
      navAdd.classList.add("active");
    }
  }

  // Événements pour la navigation
  navHome.addEventListener("click", function (e) {
    e.preventDefault();
    showPage("homePage");
  });

  // Événements pour la navigation
  navList.addEventListener("click", function (e) {
    e.preventDefault();
    showPage("listPage");
  });

  // Événements pour la navigation
  navAdd.addEventListener("click", function (e) {
    e.preventDefault();
    showPage("addPage");
  });

  // Fonction pour récupérer une blague aléatoire
  async function fetchRandomJoke() {
    loading.style.display = "block";
    jokeContenu.classList.remove("visible");
    answerBtn.textContent = "Voir la réponse";

    try {
      const res = await fetch(`${API_BASE}/random`);
      const response = await res.json();
      currentJoke = response.data;
      const errorMessage = response.message; 

      if (!currentJoke) {  
        jokeTitle.textContent = `Oups 😢 ${errorMessage}`;
        jokeContenu.textContent = "";
        answerBtn.textContent = "Ajouter une blague !"; 
        answerBtn.onclick = function () {
          showPage("addPage");
        };
        loading.style.display = "none";
        return;
      } 
      jokeTitle.textContent = currentJoke.titre;
      jokeContenu.textContent = currentJoke.contenu;
    } catch (err) {
    jokeTitle.textContent = "Erreur de chargement 😢"; 
      jokeContenu.textContent = "";
    }

    loading.style.display = "none";
  }

  // Fonction pour afficher la liste des blagues
  async function renderJokesList() {
    jokesList.innerHTML = "";

    try {
      const res = await fetch(`${API_BASE}`);
      const response = await res.json();
      const jokes = response.data;
      console.log(jokes);

      jokes.forEach((joke) => {
        const jokeItem = document.createElement("div");
        jokeItem.className = "joke-item";
        jokeItem.dataset.id = joke.id;

        jokeItem.innerHTML = `
          <h3>${joke.titre}</h3>
          <p>Cliquez pour voir la réponse</p>
        `;

        jokeItem.addEventListener("click", () =>{
          showJokeDetail(joke.id);
        });

        jokesList.appendChild(jokeItem);
      });
    } catch (err) {
      jokesList.innerHTML = "<p>Erreur lors du chargement des blagues.</p>";
    }
  }

// Fonction pour afficher les détails d'une blague
async function showJokeDetail(jokeId) {
  try {
    const res = await fetch(`${API_BASE}/${jokeId}`);
    const response = await res.json();
    const joke = response.data; // ✅ Extraction correcte

    detailTitle.textContent = joke.titre;
    detailContenu.textContent = joke.contenu;
    showPage("detailPage");
  } catch (err) {
    detailTitle.textContent = "Erreur";
    detailContenu.textContent = "";
  }
}


  // Événement pour le bouton "Nouvelle blague"
  jokeBtn.addEventListener("click", fetchRandomJoke);

  // Événement pour le bouton "Voir la réponse"
  answerBtn.addEventListener("click", function () {
    if (currentJoke) {
      jokeContenu.classList.toggle("visible");
      this.textContent = jokeContenu.classList.contains("visible")
        ? "Cacher la réponse"
        : "Voir la réponse";
    }
  });

  // Fonction pour ajouter une blague
  async function addJoke(titre, contenu) {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titre, contenu }),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de l'envoi");
    }

    return await res.json();
  }

  // Événement pour le formulaire d'ajout de blague
  addJokeForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const titteValue = document.getElementById("jokeTitle").value.trim();
    const contentValue = document
      .getElementById("jokeContenuInput")
      .value.trim();

    if (titteValue && contentValue) {
      try {
        await addJoke(titteValue, contentValue);
        formMessage.className = "form-message success";
        formMessage.textContent = "Blague ajoutée avec succès !";
        addJokeForm.reset();

        setTimeout(() => {
          formMessage.textContent = "";
          formMessage.className = "form-message";
        }, 3000);
      } catch (err) {
        formMessage.className = "form-message error";
        formMessage.textContent = "Erreur lors de l’envoi de la blague.";
      }
    } else {
      formMessage.className = "form-message error";
      formMessage.textContent = "Veuillez remplir tous les champs.";
    }
  });

  // Événement pour le bouton "Retour à la liste"
  backToListBtn.addEventListener("click", function () {
    showPage("listPage");
  });

  // Appeler la fonction pour afficher une blague aléatoire au chargement de la page
  fetchRandomJoke();
});
