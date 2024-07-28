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

        // Rattachement de la balise projet à la division Gallery
        divGallery.appendChild(idProjet);
        idProjet.appendChild(imageProjet);
        idProjet.appendChild(titreProjet);
        //idProjet.appendChild(useridProjet);
        //idProjet.appendChild(categoryidProjet);
        //idProjet.appendChild(categorynameProjet);

    }
}
document.querySelector(".gallery").innerHTML = "";
genererProjets(projets);
// Vérif affichage tableau "projets"
//console.log("Point Vérif tableau projets");
//console.log(projets);

//gestion des boutons
const boutonFiltres = document.querySelectorAll(".btn-filtre");
//var monChoix = 0;
const idBouton = "Tous";
let baliseBoutonTous = document.getElementById("Tous");
let baliseBoutonObjets = document.getElementById("Objets");
let baliseBoutonAppartements = document.getElementById("Appartements");
let baliseBoutonHotels = document.getElementById("Hotels & restaurants");

//console.log("baliseBoutonTous avant boucle =", baliseBoutonTous)
//console.log("baliseBoutonObjets avant boucle =", baliseBoutonObjets)

for (let bouton of boutonFiltres) {
    bouton.addEventListener("click", function () {
        const idBouton = bouton.id;
//        console.log("Vérif dans boucle for, bouton.id :", bouton.id, " et idBouton :", idBouton);
        if ((idBouton != "Tous")) {
            const projetsFiltres = projets.filter(function (projet) {
                return projet.category.name == idBouton;
            });
            if (idBouton == "Objets") {
                baliseBoutonTous.classList.remove("btn-on")
                baliseBoutonObjets.classList.add("btn-on")
                baliseBoutonAppartements.classList.remove("btn-on")
                baliseBoutonHotels.classList.remove("btn-on")
            } else if (idBouton == "Appartements") {
                baliseBoutonTous.classList.remove("btn-on")
                baliseBoutonObjets.classList.remove("btn-on")
                baliseBoutonAppartements.classList.add("btn-on")
                baliseBoutonHotels.classList.remove("btn-on")
            } else if (idBouton == "Hotels & restaurants") {
                baliseBoutonTous.classList.remove("btn-on")
                baliseBoutonObjets.classList.remove("btn-on")
                baliseBoutonAppartements.classList.remove("btn-on")
                baliseBoutonHotels.classList.add("btn-on")
            }
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(projetsFiltres);
        } else {
        //    monChoix = 0;
            baliseBoutonTous.classList.add("btn-on")
            baliseBoutonObjets.classList.remove("btn-on")
            baliseBoutonAppartements.classList.remove("btn-on")
            baliseBoutonHotels.classList.remove("btn-on")
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(projets);
        }
        //activerBouton(monChoix)
    });
//console.log("idBouton après boucle =", idBouton)
//console.log("boutonFiltres après boucle =", boutonFiltres)
//console.log("baliseBoutonTous après boucle =", baliseBoutonTous)
//console.log("baliseBoutonObjets après boucle =", baliseBoutonObjets)
};

    //if Idbouton = 1 ("objet")...
    // voir avec filter peut-être, ajouter une classe pour modifer le display dans le css

    //document.querySelector(".gallery").innerHTML = ""; //remplacer par display none en css
    //genererProjets(projetsFiltres);


// fetch sur API Categories avec dataset.id
