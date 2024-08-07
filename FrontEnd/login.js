// ************** RECUPERATION DES DONNEES DE CONNEXION **************
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const mdpInput = document.getElementById("mdp");

console.log("Elements du DOM sélectionnés (loginForm, email, mdp)=", loginForm, emailInput, mdpInput); // Vérif

// ************** CONNEXION *****************

// Ecoute appuie bouton "Se connecter"
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le comportement pas défaut

    // récupération des valeurs du formulaire
    const email = emailInput.value;
    const mdp = mdpInput.value;
    console.log("valeurs récupérées (email, mdp)=", email, mdp); // Vérif


//Récupération des projets eventuellement stockés dans le localStorage
//let users = window.localStorage.getItem('users');

//if (users === null) {
    // Connexion du user depuis l'API
    const reponse = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        body: {
        //    "email": email, // remplacé par valeur test en dur
        //    "password": mdp // remplacé par valeur test en dur
            "email": "sophie.bluel@test.tld",
            "password": "S0phie"
        },
    });
    users = await reponse.json();
    // Transformation des projets en JSON
    const valeurUsers = JSON.stringify(users);
    console.log("users=", users); // Vérif
    console.log("valeurUsers=", valeurUsers); // Vérif

    // Stockage des informations dans le localStorage
    //window.localStorage.setItem("users", valeurUsers);
//} else {
//    users = JSON.parse(users);
//};
});


