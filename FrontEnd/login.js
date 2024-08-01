// ************** CONNEXION *****************

//Récupération des projets eventuellement stockés dans le localStorage
let users = window.localStorage.getItem("users");

if (users === null) {
    // Connexion du user depuis l'API
    const reponse = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        body: {
            "email": "sophie.bluel@test.tld",
            "password": "S0phie"
        },
    });
    users = await reponse.json();
    // Transformation des projets en JSON
    const valeurUsers = JSON.stringify(users);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("users", valeurUsers);
} else {
    users = JSON.parse(users);
};
