// ************** PROJETS *****************
//Récupération des projets eventuellement stockés dans le localStorage
let projets = window.localStorage.getItem('projets');

if (projets === null) {
    // Récupération des projets depuis l'API
    const reponse = await fetch('http://localhost:5678/api/works');
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
        // Récupération de l'élément du DOM qui accueillera la gallerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const idProjet = document.createElement("figure");
        //idProjet.dataset.id = projets[i].id;  // A vérifier l'utilité de dataset XXXXXXXXXXXXXXXXXXXXXXX 
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
let categories = window.localStorage.getItem('categories');

if (categories === null) {
    // Récupération des catégories depuis l'API
    const reponse = await fetch('http://localhost:5678/api/categories')
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
        nomCategorie.dataset.id = categorie.id; // A vérifier l'utilité de dataset XXXXXXXXXXXXXXXXXXXXXXX
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
    }
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
            // Récupération de l'élément du DOM qui accueillera la gallerie
            const divGallery = document.querySelector(".gallery");
            const idProjet = document.getElementById(i+1);
            const idCategoryprojet = projet.category.id; //id de la catégorie du projet

            if ((idCategorybouton == 0 || idCategorybouton == idCategoryprojet)) { // Bouton "Tous" sélectionné ou catégorie du projet sélectionnée
                idProjet.setAttribute("class", "image"); // changement classe en "image" pour affichage projet
            } else { // Bouton "Tous" non sélectionné et catégorie du projet non sélectionnée
                idProjet.setAttribute("class", "image masque"); // changement classe en "image masque" pour masquer le projet
            };
        };
    });
};
