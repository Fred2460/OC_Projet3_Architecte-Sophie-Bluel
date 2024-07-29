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
document.querySelector(".gallery").innerHTML = "";
genererProjets(projets);

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

function genererFiltre(categories) {
    
    // Ajout du bouton "Tous" dans tableau categories si inexistant
    if (categories.includes("Tous") == false) {
        const boutonTous = {
            id: 0,
            name: "Tous"
        }
        categories.push(boutonTous);
    }

    // Tri des boutons Filtres selon l'id de la catégorie
    categories.sort((a, b) => a.id - b.id);

//    console.log("catégories après test Tous après tri =", categories); // vérif

    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];

        // Récupération de l'élément du DOM qui accueillera les filtres
        const divFiltre = document.querySelector(".filtre");
        // Création des balises des boutons filtre des catégories
        const nomCategorie = document.createElement("button");
        nomCategorie.innerText = categorie.name;

        // Rattachement de la balise projet à la division Filtre
        divFiltre.appendChild(nomCategorie);
        nomCategorie.classList.add("btn-filtre");
        
        // Activation du bouton "Tous" par défaut
        //if (categorie.name == "Tous") {
        //    nomCategorie.classList.add("btn-on")
        //}
    }
}

console.log("catégories avant affichage =", categories); // vérif

document.querySelector(".filtre").innerHTML = "";
genererFiltre(categories);

//gestion des boutons Filtre
//const idBouton = "Tous";








//const boutonFiltrer = document.querySelector(".btn-filtre");
const boutonFiltrer = document.querySelectorAll(".btn-filtre");
const Bouton = "";
for (let Bouton of boutonFiltrer) {
    Bouton.addEventListener("click", function () {
        //console.log("boutonFiltrer =", boutonFiltrer);
        //console.log("Bouton =", Bouton);
        
        const baliseBoutonTous = document.getElementById("Tous");
        const baliseBoutonObjets = document.getElementById("Objets");
        const baliseBoutonAppartements = document.getElementById("Appartements");
        const baliseBoutonHotels = document.getElementById("Hotels & restaurants");
        console.log("baliseBoutonTous avant boucle =", baliseBoutonTous) // Vérif
        console.log("baliseBoutonObjets avant boucle =", baliseBoutonObjets) // Vérif

        const baliseBoutonOn = document.getElementsByClassName(".btn-filtre btn-on");
        console.log("Bouton on =", baliseBoutonOn);
        const nomBouton = Bouton.firstChild.nodeValue;
        console.log("Vérif nomBouton =", nomBouton);

        if (nomBouton != "Tous") {
                const projetsFiltres = projets.filter(function (projet) {
                    return projet.category.name == nomBouton;
                });
                console.log("Projets =", projets) // Vérif
                console.log("Projets filtrés =", projetsFiltres) // Vérif
                if (nomBouton == "Objets") {
                    baliseBoutonTous.classList.remove("btn-on")
                    baliseBoutonObjets.classList.add("btn-on")
                    baliseBoutonAppartements.classList.remove("btn-on")
                    baliseBoutonHotels.classList.remove("btn-on")
                } else if (nomBouton == "Appartements") {
                    baliseBoutonTous.classList.remove("btn-on")
                    baliseBoutonObjets.classList.remove("btn-on")
                    baliseBoutonAppartements.classList.add("btn-on")
                    baliseBoutonHotels.classList.remove("btn-on")
                } else if (nomBouton == "Hotels & restaurants") {
                    baliseBoutonTous.classList.remove("btn-on")
                    baliseBoutonObjets.classList.remove("btn-on")
                    baliseBoutonAppartements.classList.remove("btn-on")
                    baliseBoutonHotels.classList.add("btn-on")
                }
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(projetsFiltres);
        } else {
            baliseBoutonTous.classList.add("btn-on")
            baliseBoutonObjets.classList.remove("btn-on")
            baliseBoutonAppartements.classList.remove("btn-on")
            baliseBoutonHotels.classList.remove("btn-on")
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(projets);
        }

    });
}    

/*
    const projetsFiltres = projets.filter(function (projet) {
        return projet.category.name == idBouton;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererPieces(projetsFiltres);
});
*/


/*
for (let bouton of boutonFiltres) {
    bouton.addEventListener("click", function () {
        const idBouton = bouton.id;
        console.log("Vérif dans boucle for, bouton.id :", bouton.id, " et idBouton :", idBouton);
        //console.log("Vérif nomBouton", )
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
        console.log("idBouton après boucle =", idBouton)
        console.log("boutonFiltres après boucle =", boutonFiltres)
        console.log("baliseBoutonTous après boucle =", baliseBoutonTous)
        console.log("baliseBoutonObjets après boucle =", baliseBoutonObjets)
    });




};*/

    //if Idbouton = 1 ("objet")...
    // voir avec filter peut-être, ajouter une classe pour modifer le display dans le css

    //document.querySelector(".gallery").innerHTML = ""; //remplacer par display none en css
    //genererProjets(projetsFiltres);


// fetch sur API Categories avec dataset.id
