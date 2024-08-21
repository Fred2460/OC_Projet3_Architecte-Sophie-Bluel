// ************** USER *****************
//Récupération du user eventuellement connecté dans le localStorage
let userIdLogin = window.localStorage.getItem("userId"); // récupération du userId stocké
let tokenLogin = window.localStorage.getItem("token"); // récupération du token stocké

let userLogin = false;
if ((tokenLogin === null) || (tokenLogin === "undefined")) { // cas "pas de user connecté"
    console.log("userIdLogin ou tokenLogin inexistant:", userIdLogin, tokenLogin);  // Vérif
    userLogin = false;

} else { // cas "user connecté"
    console.log("userIdLogin ou tokenLogin existants:", userIdLogin, tokenLogin); // Vérif
    userLogin = true;
    // changement nav lien "Login" en "Logout"
    const logLink = document.getElementById("logLink");
    logLink.textContent = "Logout";
    logLink.href = "#Logout";
    // barre des filtres masquée
    const affichageFiltre = document.getElementById("affichageFiltre");
    affichageFiltre.classList.add("filtre-off");
    // ajout icône et bouton "modifier"
    const sectionPortfolio = document.querySelector("#portfolio h2");
    //console.log("section portfolio=", sectionPortfolio); // Vérif
    const iconeModifier = document.createElement("i");
    iconeModifier.href = "#modifyProject";
    iconeModifier.classList.add("fa-regular");
    iconeModifier.classList.add("fa-pen-to-square");
    const boutonModifier = document.createElement("a");
    boutonModifier.innerText = "modifier";
    boutonModifier.href = "#modifyProject";
    boutonModifier.id = "modifier";
    //console.log("boutonModifier=", boutonModifier); // Vérif
    sectionPortfolio.appendChild(iconeModifier);
    sectionPortfolio.appendChild(boutonModifier);

};

// ************** PROJETS *****************
//Récupération des projets eventuellement stockés dans le localStorage
let projets = window.localStorage.getItem("projets");

if (projets === null) {
    // Récupération des projets depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    projets = await reponse.json();
    // Transformation des projets en JSON
    const valeurProjets = JSON.stringify(projets);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("projets", valeurProjets);
} else {
    projets = JSON.parse(projets);
};

function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        // Récupération de l'élément du DOM qui accueillera la galerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const idProjet = document.createElement("figure");
        //idProjet.dataset.id = projets[i].id; 
        idProjet.id = projets[i].id;
        idProjet.dataset.idCategorie = projet.category.id;
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;
        const useridProjet = document.createElement("p");
        useridProjet.innerText = projet.userId;
        const categoryidProjet = document.createElement("p");
        categoryidProjet.innerText = projet.category.id;
        const categorynameProjet = document.createElement("p");
        categorynameProjet.innerText = projet.category.name;

        // Rattachement de la balise projet à la division Gallery
        divGallery.appendChild(idProjet);
        idProjet.appendChild(imageProjet);
        idProjet.appendChild(titreProjet);

        // ajout d'une balise image pour affichage projet
        idProjet.classList.add("image");

    };
};

document.querySelector(".gallery").innerHTML = "";
genererProjets(projets);


// ************** CATEGORIES *****************
//Récupération des catégories éventuellement stockées dans le localStorage
let categories = window.localStorage.getItem("categories");

if (categories === null) {
    // Récupération des catégories depuis l'API
    const reponse = await fetch("http://localhost:5678/api/categories")
    categories = await reponse.json();
    // Transformation des catégories en JSON
    const valeurCategories = JSON.stringify(categories);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("categories", valeurCategories);
} else {
    categories = JSON.parse(categories);
};


// ************** FILTRE *****************
// Ajout du bouton "Tous" dans tableau categories si inexistant
if (categories.includes("Tous") == false) {
    const boutonTous = {
        id: 0,
        name: "Tous"
    }
    categories.push(boutonTous);
}

function genererFiltre(categories, boutonOn) {
    // Tri des boutons Filtres selon l'id de la catégorie
    categories.sort((a, b) => a.id - b.id);

    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];

        // Récupération de l'élément du DOM qui accueillera les filtres
        const divFiltre = document.querySelector(".filtre");
        // Création des balises des boutons filtre des catégories
        const nomCategorie = document.createElement("button");
        nomCategorie.innerText = categorie.name;
        nomCategorie.dataset.id = categorie.id;
        //nomCategorie.id = categorie.id;
        nomCategorie.id = categorie.name;
        // Ajout balise href pour affiche titre des projets en haut de page
        nomCategorie.setAttribute("href", "#portfolio");

        // Rattachement de la balise projet à la division Filtre et activation fond de couleur du bouton actif
        if (nomCategorie.id === boutonOn) {
            divFiltre.appendChild(nomCategorie);
            nomCategorie.classList.add("btn-filtre","btn-on");
        } else {
            divFiltre.appendChild(nomCategorie);
            nomCategorie.classList.add("btn-filtre");
        }
    };
};

let boutonOn = "Tous";
document.querySelector(".filtre").innerHTML = "";
genererFiltre(categories, boutonOn);


// ************** GESTION DES APPUIS BOUTONS FILTRE *****************

let boutonFiltrer = document.querySelectorAll(".btn-filtre"); //Récupération de tous les boutons
let Bouton = document.querySelector(".btn-filtre.btn-on"); //Récupération du bouton activé

for (let Bouton of boutonFiltrer) {
    Bouton.addEventListener("click", function () {
        let boutonPreced = document.querySelector(".btn-filtre.btn-on"); //Récupération du bouton précédemment activé
        boutonPreced.setAttribute("class", "btn-filtre"); // suppression du fond de couleur du bouton précédement activé
        const idCategorybouton = Bouton.dataset.id; // id de la catégorie du bouton sélectionné
        Bouton.setAttribute("class", "btn-filtre btn-on"); // affichage du bouton sélectionné en fond de couleur

        for (let i = 0; i < projets.length; i++) {
            const projet = projets[i];
            // Récupération de l'élément du DOM qui accueillera la galerie
            const divGallery = document.querySelector(".gallery");
            const idProjet = document.getElementById(i+1);
            const idCategoryprojet = projet.category.id; //id de la catégorie du projet

            if ((idCategorybouton == 0 || idCategorybouton == idCategoryprojet)) { // Bouton "Tous" sélectionné ou catégorie du projet sélectionnée
                idProjet.setAttribute("class", "image"); // changement classe en "image" pour affichage projet
            } else { // Bouton "Tous" non sélectionné et catégorie du projet non sélectionnée
                idProjet.setAttribute("class", "image masque"); // changement classe en "image masque" pour masquer le projet
            };
        };
        // repositionnement (en mode smooth) de l'affichage avec le titre des projets en haut de page 
        const targetPortfolio = document.getElementById("portfolio");
        targetPortfolio.scrollIntoView({behavior: "smooth"}); 
    });
};

// ********************* LOGOUT ********************
// changement nav lien "Logout" en "Login"
const logLink = document.getElementById("logLink");
logLink.addEventListener("click", function () {
    console.log("logLink =", logLink);
    if (logLink.textContent === "Logout") {
        logLink.textContent = "Login";
        logLink.href = "index.html";
        window.localStorage.removeItem("userId"); // réinitialisation du userId stocké
        window.localStorage.removeItem("token"); // réinitialisation du token stocké
    }
});

// ********************* MODIFIER PROJETS *****************
// affichage de la modale
const demandeModif = document.getElementById("modifier");
demandeModif.addEventListener("click", function () {
    const modifProjets = document.getElementById("modifyProject");
    console.log("modifProjets=", modifProjets); // Vérif
    modifProjets.className = "modal"; // affichage de la modale
    
    document.querySelector("#projetsList").innerHTML = "";
    // génération des miniatures des projets
    genererMiniProjets(projets);
    
});

// fonction de génération des miniatures des projets
function genererMiniProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        // Récupération de l'élément du DOM qui accueillera la galerie
        const divprojetsList = document.querySelector("#projetsList");
        // Création d’une balise dédiée à un projet
        const idProjet = document.createElement("figure");
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        //const iconePoubelle = document.createElement("i");
        const iconePoubelle = document.createElement("i");
        // Rattachement de la balise projet à la division projetsList
        divprojetsList.appendChild(idProjet);
        idProjet.appendChild(imageProjet);
        idProjet.appendChild(iconePoubelle);
        imageProjet.setAttribute("Id", i+1);
        iconePoubelle.classList.add("fa-solid");
        iconePoubelle.classList.add("fa-trash-can");
        //let idSuppr = `Suppr_${i}`;
        iconePoubelle.setAttribute("Id", i+1);

    }
    //Récupération de tous les boutons poubelle
    const iconsPoubelle = document.querySelectorAll(".fa-solid.fa-trash-can");
    //console.log("iconsPoubelle =", iconsPoubelle); // Vérif

    // Ajouter un écouteur d'événement pour chaque icône poubelle
    iconsPoubelle.forEach(icon => {
        icon.addEventListener("click", function() {
            // Récupérer l'attribut Id pour identifier l'icône cliquée
            const iconId = this.getAttribute("Id");
            // console.log("Icône cliquée :", iconId); // Vérif
            // Demande de confirmation de suppression
            let supprConf;
            if (confirm("Suppression du projet " + iconId + " ?") == true) {
                supprConf = "Oui";
                //console.log("idprojetSuppr =", iconId); // Vérif
                supprimerProjet(iconId);
                document.querySelector("#projetsList").innerHTML = "";
                genererMiniProjets(projets);
            } else {
                supprConf = "Non";
            }
            console.log(supprConf); // Vérif
        })
    });
};

// masquer la modale
const demandeFermer = document.getElementById("fermer");
demandeFermer.addEventListener("click", function () {
    const modifProjets = document.getElementById("modifyProject");
    console.log("modifProjets=", modifProjets); // Vérif
    modifProjets.className = "modal-masque"; // masquage de la modale
});

// ********************* SUPPRESSION D'UN PROJET *****************
function supprimerProjet(idProjet) {
    console.log("tokenLogin avant DELETE=", tokenLogin);
    console.log("idProjet à supprimer=", idProjet);
    fetch("http://localhost:5678/api/works/",{idProjet}, {
        method: "DELETE",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${tokenLogin}`
        }
    })

    .catch(error => {
        //errorMessage.textContent = "Erreur d'accès au site (catch), contactez votre administrateur.";
        console.error(error);
        console.log("Erreur de suppression");
    })
    console.log("Suppression effectuée");
    console.log("Projets avant suppr=", projets);
    window.localStorage.removeItem("projets", idProjet); // suppression du projet dans le stockage local
    // regénération des miniatures des projets
    console.log("Projets après suppr=", projets);


};
