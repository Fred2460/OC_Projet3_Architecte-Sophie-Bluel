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
        //console.log(projets); // vérif
        // Récupération de l'élément du DOM qui accueillera la gallerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        //console.log(projets[i]);
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

//genererProjets(projetElement);
genererProjets(projets);

// Vérif affichage tableau "projets"
console.log("Point Vérif tableau projets");
console.log(projets);

//gestion des boutons
const boutonFiltres = document.querySelectorAll(".btn-filtre");
let monChoix;
const idBouton = "btn-tous";

for (let bouton of boutonFiltres) {
    
    //buttons.forEach(button => {
    //    button.addEventListener('click', () => {
    //        button.classList.toggle('active');
    //    });
    //});

    bouton.addEventListener("click", function () {
        const idBouton = bouton.id;
        console.log("boucle for, vérif bouton.id :", bouton.id, " et idBouton :", idBouton);
    });
    console.log("bouton.id :", bouton.id, "idBouton :", idBouton);
    if (idBouton == "btn-objets") {
        monChoix = 1;
    } else if (idBouton == "btn-appartements") {
        monChoix = 2;
    } else if (idBouton == "btn-hotels") {
        monChoix = 3;
    } else {
        monChoix = 0;
    }

    if (monChoix == 0) {
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projets);
    } else {
        const projetsFiltres = projets.filter(function (projet) {
            return projet.categoryidProjet == monChoix;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltres);
    }
};

    //if Idbouton = 1 ("objet")...
    // voir avec filter peut-être, ajouter une classe pour modifer le display dans le css

    //document.querySelector(".gallery").innerHTML = ""; //remplacer par display none en css
    //genererProjets(projetsFiltres);


// fetch sur API Categories avec dataset.id
