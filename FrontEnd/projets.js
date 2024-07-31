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
}

function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        // Récupération de l'élément du DOM qui accueillera la gallerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const idProjet = document.createElement("figure");
        idProjet.dataset.id = projets[i].id
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
    }
}

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
}

// ************** FILTRE *****************
// Ajout du bouton "Tous" dans tableau categories si inexistant
console.log("categories initiales avant =", categories); // Vérif
if (categories.includes("Tous") == false) {
    const boutonTous = {
        id: 0,
        name: "Tous"
    }
    categories.push(boutonTous);
}
console.log("categories initiales après =", categories); // Vérif

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

        // Rattachement de la balise projet à la division Filtre
        if (nomCategorie == boutonOn) {
            divFiltre.appendChild(nomCategorie);
            nomCategorie.classList.add("btn-filtre btn-on");
        } else {
            divFiltre.appendChild(nomCategorie);
            nomCategorie.classList.add("btn-filtre");
        }
    }
}

console.log("catégories avant affichage =", categories); // vérif
const boutonOn = "Tous";
document.querySelector(".filtre").innerHTML = "";
genererFiltre(categories, boutonOn);
console.log("catégories après affichage =", categories); // vérif

// ************** GESTION DES APPUIS BOUTONS FILTRE *****************

const boutonFiltrer = document.querySelectorAll(".btn-filtre");

const Bouton = "";
for (let Bouton of boutonFiltrer) {
    Bouton.addEventListener("click", function () {
        const nomBouton = Bouton.firstChild.nodeValue;
        console.log("Vérif nomBouton =", nomBouton);

        if (nomBouton != "Tous") {
            const projetsFiltres = projets.filter(function (projet) {
                return projet.category.name == nomBouton;
            });
            console.log("projetsFiltres dans la boucle après tri =", projetsFiltres);
            
            // afficher la liste des catégories selon sélection filtre
            document.querySelector(".filtre").innerHTML = "";
            console.log("Génération filtre. categories = ", categories, "nomBouton", nomBouton); // Vérif
            genererFiltre(categories, nomBouton);
            
            // afficher la liste des projets selon sélection filtre
            document.querySelector(".gallery").innerHTML = "";
            console.log("Génération gallery. projetsFiltres = ", projetsFiltres); // Vérif
            genererProjets(projetsFiltres);
            
        } else {
            const projetsFiltres = projets
            console.log("projetsFiltres dans la boucle après tri =", projetsFiltres);

            // afficher la liste des catégories avec Tous activé
            document.querySelector(".filtre").innerHTML = "";
            genererFiltre(categories, "Tous");

            // afficher la liste de tous les projets
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(projetsFiltres);
        }
    });
}


    //if Idbouton = 1 ("objet")...
    // voir avec filter peut-être, ajouter une classe pour modifer le display dans le css

    //document.querySelector(".gallery").innerHTML = ""; //remplacer par display none en css
    //genererProjets(projetsFiltres);


// fetch sur API Categories avec dataset.id
