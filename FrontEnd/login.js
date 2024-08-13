/*
// ************** CONFIGURATION DES ENTETES CORS *********************
const server = require("http").createServer((req, res) => {
    // Autoriser les requêtes provenant de tous les domaines
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Autoriser les méthodes suivantes :
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    // Autoriser les en-têtes suivants :
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  
    // Continuer de traiter la requête...
  });
  
  server.listen(5678, () => {
    console.log('API en écoute sur le port 5678');
  });
*/

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5500/login.html'); // Remplacez par l'origine autorisée
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
*/

// ************** RECUPERATION DES DONNEES DE CONNEXION **************
let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let errorMessage = document.getElementById("errorMessage");

console.log("Elements du DOM sélectionnés (loginForm, email, mdp)=", loginForm, emailInput, passwordInput); // Vérif

// ************** FONCTION CONNEXION *****************

async function genererLogin(email, password) {
    /* simulation réponse requête ok pour dev autres actions
    let req = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        mode: "cors",
        headers: {
            "contentType": "application/json"
        },
        body: {
            "email": email,
            "password": password
            //    "email": "sophie.bluel@test.tld",
            //    "password": "S0phie"
        }
    })

    .then (response => {
        console.log("Réponse du serveur");
        if (response.ok) {
            return response.json()
            
            .then (data => {
                console.log("Succés :", data);
                window.localStorage.setItem("usersId", data.userId); // stockage du userId récupéré
                window.localStorage.setItem("token", data.token); // stockage du token récupéré

                window.location.replace("index.html#tportfolio"); // redirection vers la page d'accueil à la balise des projets
            });
            
        } else if (response.status === 401) {
            console.log("Erreur 401: accès non autorisé");
            errorMessage.textContent = "Erreur d'email ou de mot de passe";
            // throw new Error("Réponse du réseau NOK");
        } else if (response.status === 404) {
            console.log("Erreur 404: utilisateur non trouvé");
            errorMessage.textContent = "Erreur d'accès au site, contactez votre administrateur.";
        }
    })
    
    .catch(error => {
        console.error("Il y a eu une erreur avec votre fetch :", error);
        errorMessage.textContent = "Erreur d'accès au site, contactez votre administrateur.";
    });
    */
   
    // simulation requête ok (suite)
    window.location.replace("index.html#portfolio"); // redirection vers la page d'accueil à la balise des projets

};

// ************** LANCEMENT CONNEXION *****************

// Ecoute appuie bouton "Se connecter"
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le comportement pas défaut de rechargement de la page

    // récupération des valeurs du formulaire
    let email = emailInput.value;
    let password = passwordInput.value;
    console.log("valeurs envoyées (email, password)=", email, password); // Vérif

    let response = genererLogin(email, password);
    console.log("Réponse du serveur=", response); // Vérif
});

/*
console.log("Réponse du serveur=", response); // Vérif
const useridLogin = response.userId;
const usertokenLogin = response.token;
console.log("useridLogin=", useridLogin); // Vérif
console.log("usertokenLogin=", usertokenLogin); // Vérif
*/

    //users = await reponse.json();
    // Transformation des projets en JSON
    //const valeurUsers = JSON.stringify(users);
    //console.log("users=", users); // Vérif
    //console.log("valeurUsers=", valeurUsers); // Vérif
    //const useridLogin = valeurUsers.userId;
    //const usertokenLogin = valeurUsers.token;
    
    // Stockage des informations dans le localStorage
    //window.localStorage.setItem("users", valeurUsers);
//} else {
//    users = JSON.parse(users);
//};
