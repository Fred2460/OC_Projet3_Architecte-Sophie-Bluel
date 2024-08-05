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
        idProjet.dataset.id = projets[i].id;
        idProjet.dataset.idCategorie = projet.category.id; // A vérifier pourquoi 2 fois définition d'idProjet XXXXXXXXXXXX
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
        idProjet.appendChild(useridProjet); //suppl       
        idProjet.appendChild(categoryidProjet); //suppl 
        idProjet.appendChild(categorynameProjet); //suppl 


        // ajout d'une balise image pour affichage projet
        //idProjet.classList.add("image");

    };
    console.log("projets fin fonction =", projets); // Vérif projets
};

console.log("projets après appel fonction =", projets); // Vérif

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
}


// ************** FILTRE *****************
// Ajout du bouton "Tous" dans tableau categories si inexistant
//console.log("categories initiales avant =", categories); // Vérif
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
        nomCategorie.dataset.id = categorie.id;
        nomCategorie.id = categorie.name;

        // Rattachement de la balise projet à la division Filtre
        //console.log("nomCategorie =", nomCategorie); // Vérif
        if (nomCategorie.id === boutonOn) {
            divFiltre.appendChild(nomCategorie);
            //console.log("nomCategorie après appendChild=", nomCategorie); // Vérif
            nomCategorie.classList.add("btn-filtre","btn-on");
        } else {
            divFiltre.appendChild(nomCategorie);
            //console.log("nomCategorie après appendChild=", nomCategorie); // Vérif
            nomCategorie.classList.add("btn-filtre");
        }
    }
};

const boutonOn = "Tous";
document.querySelector(".filtre").innerHTML = "";
genererFiltre(categories, boutonOn);


// ************** GESTION DES APPUIS BOUTONS FILTRE *****************

const boutonFiltrer = document.querySelectorAll(".btn-filtre");

const Bouton = "Tous";
for (let Bouton of boutonFiltrer) {
    Bouton.addEventListener("click", function () {
        const nomBouton = Bouton.firstChild.nodeValue; // texte de la catégorie du bouton sélectionné
        const idCategory = Bouton.dataset.id; // id de la catégorie du bouton sélectionné
        console.log("Vérif nomBouton =", nomBouton); // Vérif
        console.log("Vérif idCategory bouton sélectionnée =", idCategory); // Vérif
        console.log("projets =", projets);

            // boucler sur tous les projets
            // récupérer l'iDcategory de chaque projet
            // maj de la balise visibilité
            // si "Tous", tous en visible
            // 
            // filtrage des projets selon selon sélection bouton filtre

        for (let i = 0; i < projets.length; i++) {
            const projet = projets[i];
            // Récupération de l'élément du DOM qui accueillera la gallerie
            const divGallery = document.querySelector(".gallery");
            const idProjet = document.createElement("figure");
            idProjet.dataset.id = projets[i].id; // id du projet
            idProjet.dataset.idCategorie = projet.category.id;
            //const idProjet = "data-id=\"" + projets[i].id + "\"";
            //console.log("projet =",projet);
            //console.log("idProjet =", idProjet);
            //console.log("idCategory =", idCategory);
            const idCategoryprojet = projet.category.id; //id de la catégorie du projet
            console.log("idCategoryprojet =", idCategoryprojet);
            //const classVisible = document.querySelector(".visible");
            //const classMasque = document.querySelector(".masque");
            //console.log("Classe visible ?", classVisible);
            //console.log("Classe masque ?", classMasque);
            // Rattachement de la balise projet à la division Gallery
            divGallery.appendChild(idProjet);
            if (idCategory === 0) { // Bouton "Tous" sélectionné
                // ajout d'une balise image pour affichage projet
                idProjet.classList.add("image");
                //if (classMasque != undefined) {
                //    idProjet.classList.add("visible");
                //    idProjet.classList.remove("masque");
                //    idProjet.classList.remove("masque");
                //};
            } else if (idCategoryprojet != idCategory) {
                // ajout balise "image masque" pour masquage projet
                idProjet.classList.add("image", "masque");
                //if (classMasque != undefined) {
                //    idProjet.classList.add("masque");
                //    idProjet.classList.remove("visible");
                //    idProjet.classList.replace("visible", "masque");
                //};
            } else {
                // ajout d'une balise image pour affichage projet
                idProjet.classList.add("image");
                // suppression balise "masque" pour le projet
                //if (classMasque != undefined) {
                //    idProjet.classList.add("visible");
                //    idProjet.classList.remove("masque");
                //    idProjet.classList.replace("masque", "visible");    
                //    const testClassvisible=document.querySelector(".visible");
                //    console.log("Test classe visible =", testClassvisible);
                //    const testClassmasque=document.querySelector(".masque");
                //    console.log("Test classe masque =", testClassmasque);
                //};
            };
        };

//            const projetsFiltres = projets.filter(function (projet) {
//                return projet.category.name == nomBouton;
//            });
            //console.log("projetsFiltres dans la boucle après tri =", projetsFiltres); // Vérif
            
        // afficher la liste des catégories selon sélection bouton filtre
        
        /* test 05/08/2024
        document.querySelector(".filtre").innerHTML = "";
        genererFiltre(categories, nomBouton);
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projets);
        */

    });
            // afficher la liste des projets selon sélection filtre
//            document.querySelector(".gallery").innerHTML = "";
//            genererProjets(projetsFiltres);
/*
        } else {
            const projetsFiltres = projets
            //console.log("projetsFiltres dans la boucle après tri =", projetsFiltres); // Vérif

            // afficher la liste des catégories avec Tous activé
            document.querySelector(".filtre").innerHTML = "";
            genererFiltre(categories, "Tous");

            // afficher la liste de tous les projets
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(projetsFiltres);
        }*/

};

//document.querySelector(".gallery").innerHTML = ""; //remplacer par display none en css

