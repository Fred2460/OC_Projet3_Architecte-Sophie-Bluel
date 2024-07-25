console.log("Point 1");

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
//        console.log(projets); // vérif
        // Récupération de l'élément du DOM qui accueillera la gallerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        console.log(projets[i]);
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

        // Rattachement de la balise projet a la division Gallery
        divGallery.appendChild(idProjet);
        idProjet.appendChild(imageProjet);
        idProjet.appendChild(titreProjet);
        idProjet.appendChild(useridProjet);
        idProjet.appendChild(categoryidProjet);
        idProjet.appendChild(categorynameProjet);
    }
}

console.log("Point 2");

//genererProjets(projetElement);
genererProjets(projets);

console.log("Point 3");
console.log(projets);
console.log("Point 4");

//gestion des boutons                XXXXXXXXXXX en cours XXXXXXXXXXXXXXx
const boutonFiltres = document.querySelectorAll(".btn-filtre");

for (let bouton of boutonFiltres) {
    bouton.addEventListener("click", function () {
        //if Idbouton = 1 ("objet")...
        // voir avec filter peut-être, ajouter une classe pour modifer le display dans le css

        document.querySelector(".gallery").innerHTML = ""; //remplacer par display none en css
        genererProjets(projetsFiltres);
    });
}

// fetch sur API Categories avec dataset.id








