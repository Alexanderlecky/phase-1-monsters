document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const formContainer = document.getElementById("create-monster");
    const loadMoreButton = document.getElementById("load-more-monsters");
    let page = 1;
  
    // Fetch and display monsters
    function fetchMonsters() {
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => displayMonster(monster));
        });
    }
  
    // Display a single monster
    function displayMonster(monster) {
      const monsterDiv = document.createElement("div");
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterDiv);
    }
  
    // Create a form for adding a new monster
    function createForm() {
      const form = document.createElement("form");
      form.innerHTML = `
        <input type="text" id="name" placeholder="name" />
        <input type="number" id="age" placeholder="age" />
        <input type="text" id="description" placeholder="description" />
        <button>Create Monster</button>
      `;
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const description = document.getElementById("description").value;
        createMonster(name, age, description);
      });
      formContainer.appendChild(form);
    }
  
    // Create a new monster
    function createMonster(name, age, description) {
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, age, description }),
      })
        .then(response => response.json())
        .then(monster => displayMonster(monster));
    }
  
    // Load more monsters
    loadMoreButton.addEventListener("click", () => {
      page++;
      fetchMonsters();
    });
  
    // Initial fetch and form creation
    fetchMonsters();
    createForm();
  });

  