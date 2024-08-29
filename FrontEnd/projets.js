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
//console.log("projets au début=", projets); // Vérif

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
console.log("projets après vérif début=", projets); // Vérif

let idprojetMax = 1;

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

        // recherche de l'Id projet maximal pour l'ajout de nouveaux projets
        if (idProjet.id > idprojetMax) {
            idprojetMax = idProjet.id;
        }

    };
};

document.querySelector(".gallery").innerHTML = "";
genererProjets(projets);


// ************** RECUPERATION CATEGORIES *****************
//Récupération des catégories éventuellement stockées dans le localStorage
let categories = window.localStorage.getItem("categories");
//console.log("categories avant récup localStorage=", categories); // Vérif
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
console.log("categories après récup localStorage=", categories); // Vérif


// *************************** AFFICHAGE FILTRES ****************************
// Ajout du bouton "Tous" dans tableau categories si inexistant
if (categories.includes("Tous") == false) {
    const boutonTous = {
        id: 0,
        name: "Tous"
    }
    categories.push(boutonTous);
}
console.log("categories après récup localStorage et test Tous", categories); // Vérif

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

        // ajout de l'option de la catégorie dans l'élément html select pour l'ajout de nouveaux projets
        const elementSelectcategorie = document.querySelector(".selectCategorie");
        const optionCategorie = document.createElement("option");
        if (i != 0) {
            optionCategorie.value = categorie.id;
            optionCategorie.innerText = categorie.name;
            elementSelectcategorie.appendChild(optionCategorie);
        };
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

        let decalIncrement = 1; // décalage entre id des projets et incrément i de la boucle for (cas des projets supprimés)

        for (let i = 0; i < projets.length; i++) {
            const projet = projets[i];
            // Récupération de l'élément du DOM qui accueillera la galerie
            const divGallery = document.querySelector(".gallery");
            const idProjet = document.getElementById(i + decalIncrement);
            if (idProjet != null) { // cas des projets supprimés
                const idCategoryprojet = projet.category.id; //id de la catégorie du projet
                
                if ((idCategorybouton == 0 || idCategorybouton == idCategoryprojet)) { // Bouton "Tous" sélectionné ou catégorie du projet sélectionnée
                    idProjet.className = "image"; // changement classe en "image" pour affichage projet
                } else { // Bouton "Tous" non sélectionné et catégorie du projet non sélectionnée
                    idProjet.className = "masque"; // changement classe en "image masque" pour masquer le projet
                }
            } else {
                decalIncrement++; // augmentation de décalage entre id des projets et incrément i de la boucle for
                i--; // neutralisation de l'incrément de la boucle for (cas d'un projet supprimé)
            }
        };
        // repositionnement (en mode smooth) de l'affichage avec le titre des projets en haut de page 
        const targetPortfolio = document.getElementById("portfolio");
        targetPortfolio.scrollIntoView({behavior: "smooth"}); 
    });
};

// ********************************* LOGOUT ************************************
// changement nav lien "Logout" en "Login"
const logLink = document.getElementById("logLink");
logLink.addEventListener("click", function () {
    //console.log("logLink =", logLink);
    if (logLink.textContent === "Logout") {
        logLink.textContent = "Login";
        logLink.href = "index.html";
        window.localStorage.removeItem("userId"); // réinitialisation du userId stocké
        window.localStorage.removeItem("token"); // réinitialisation du token stocké
    }
});

// ********************************* MODALE MODIFIER PROJETS *****************************
// afficher la modale 
const demandeModif = document.getElementById("modifier");
if (demandeModif != null) {
    demandeModif.addEventListener("click", function () {
        const modifProjets = document.getElementById("modifyProject");
        //console.log("modifProjets=", modifProjets); // Vérif
        modifProjets.className = "modal"; // affichage de la modale

        document.querySelector("#projetsList").innerHTML = "";
        genererMiniProjets(projets); // génération des miniatures des projets

    })
};

// masquer la modale (appui sur Escape)
window.addEventListener("keydown", function (e){
    if (e.key === "Escape" || e.key === "Esc") {
        const modifProjets = document.getElementById("modifyProject");
        modifProjets.className = "modal-masque"; // masquage de la modale
    }
});

// masquer la modale (appui bouton Fermer_1)
const demandeFermer_1 = document.getElementById("fermer_1");
demandeFermer_1.addEventListener("click", function () {
    const modifProjets = document.getElementById("modifyProject");
    modifProjets.className = "modal-masque"; // masquage de la modale
});

// masquer la modale (appui bouton Fermer_2)
const demandeFermer_2 = document.getElementById("fermer_2");
demandeFermer_2.addEventListener("click", function () {
    const modifProjets = document.getElementById("modifyProject");
    modifProjets.className = "modal-masque"; // masquage de la modale
    // Afficher la div galeriePhoto et masquer la div ajoutPhoto
    const galeriePhoto = document.getElementById("galeriePhoto");
    galeriePhoto.className = "modal-wrapper"; // affichage de la div galeriePhoto
    const ajoutPhoto = document.getElementById("ajoutPhoto");
    ajoutPhoto.className = "modal-wrapper-masque"; // masquage de la div ajoutPhoto
    // Afficher la div galeriePhoto et masquer la div ajoutPhoto
    const Insertion = document.getElementById("Insertion");
    Insertion.className = "avantInsertion"; // affichage des éléments de la div cadreAjoutPhoto
    // Masquer la photo sélectionnée
    const Preview = document.getElementById("preview");
    Preview.className = "masquePreview";
});

// Ajout d'un écouteur d'évènement pour bouton "Retour"
const boutonRetour = document.getElementById("retour")
boutonRetour.addEventListener("click", function() {
    // Afficher la div galeriePhoto et masquer la div ajoutPhoto
    const galeriePhoto = document.getElementById("galeriePhoto");
    galeriePhoto.className = "modal-wrapper"; // affichage de la div galeriePhoto
    const ajoutPhoto = document.getElementById("ajoutPhoto");
    ajoutPhoto.className = "modal-wrapper-masque"; // masquage de la div ajoutPhoto
    // Afficher la div galeriePhoto et masquer la div ajoutPhoto
    const Insertion = document.getElementById("Insertion");
    Insertion.className = "avantInsertion"; // affichage des éléments de la div cadreAjoutPhoto
    // Masquer la photo sélectionnée
    const Preview = document.getElementById("preview");
    Preview.className = "masquePreview";
});


// ************************ FONCTION DE GENERATION DES MINIATURES DES PROJETS ***********************
function genererMiniProjets(projets) {
    //console.log("projets=", projets); // Vérif
    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        //console.log("projet=", projet, i); // Vérif
        // Récupération de l'élément du DOM qui accueillera la galerie
        const divprojetsList = document.querySelector("#projetsList");
        // Création d’une balise dédiée à un projet
        const idProjet = projet.id;
        //console.log("idProjet=", idProjet, i); // Vérif
        const figProjet = document.createElement("figure");
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        //const iconePoubelle = document.createElement("i");
        const iconePoubelle = document.createElement("i");
        // Rattachement de la balise projet à la division projetsList
        divprojetsList.appendChild(figProjet);
        figProjet.appendChild(imageProjet);
        figProjet.appendChild(iconePoubelle);
        imageProjet.setAttribute("Id", idProjet);
        iconePoubelle.classList.add("fa-solid");
        iconePoubelle.classList.add("fa-trash-can");
        iconePoubelle.setAttribute("Id", idProjet);

    };
    
    //Récupération de tous les boutons poubelle
    const iconsPoubelle = document.querySelectorAll(".fa-solid.fa-trash-can");
    //console.log("iconsPoubelle =", iconsPoubelle); // Vérif

    // Ajout d'un écouteur d'événement pour chaque icône poubelle
    iconsPoubelle.forEach(icon => {
        icon.addEventListener("click", function() {
            // Récupérer l'attribut Id pour identifier l'icône cliquée
            const iconId = this.getAttribute("Id");
            // Demande de confirmation de suppression
            if (confirm("Suppression du projet " + iconId + " ?") == true) {
                supprimerProjet(iconId);
            };
        });
    });

    // Ajout d'un écouteur d'évènement pour bouton "Ajouter une photo"
    const boutonAjoutProjet = document.getElementById("boutonAjoutPhoto")
    boutonAjoutProjet.addEventListener("click", function() {
        // Masquer la div galeriePhoto et afficher la div ajoutPhoto
        const galeriePhoto = document.getElementById("galeriePhoto");
        galeriePhoto.className = "modal-wrapper-masque"; // masquage de la div galeriePhoto
        const ajoutPhoto = document.getElementById("ajoutPhoto");
        ajoutPhoto.className = "modal-wrapper"; // affichage de la div ajoutPhoto
    });

};


// ********************* SUPPRESSION D'UN PROJET *****************
function supprimerProjet(idProjet) {
    //console.log("tokenLogin avant fetch=", tokenLogin); // Vérif
    //console.log("idProjet à supprimer avant fetch=", idProjet); // Vérif
    fetch("http://localhost:5678/api/works/" + idProjet, {
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
    
    //console.log("idProjet à supprimer après fetch=", idProjet); // Vérif
    const projet = projets[idProjet-1];
    //console.log("projet=", projet); // Vérif
    //console.log("Projets avant suppr=", projets); // Vérif
    window.localStorage.removeItem("projets", projet); // suppression du projet dans le stockage local
    
    // regénération des miniatures des projets
    //console.log("Projets après suppr=", projets); // Vérif
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets); // génération des images des projets

    //document.querySelector("#projetsList").innerHTML = "";
    const modifProjets = document.getElementById("modifyProject");
    //console.log("modifProjets=", modifProjets); // Vérif
    modifProjets.className = "modal"; // affichage de la modale
    genererMiniProjets(projets); // génération des miniatures des projets
    
};

// *************************** FONCTION AJOUTER PHOTO POUR NOUVEAU PROJET *******************************
const ajoutfichierPhoto = document.getElementById("ajoutfichierPhoto");
let validPhoto = false;
let file;

/*
let imgInp = document.getElementById("ajoutfichierPhoto");
imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      let img = URL.createObjectURL(file)
      console.log("img=", img);
    };
};
*/

/*
ajoutfichierPhoto.addEventListener("change", function(event) {
    let reader = new FileReader();
    reader.onload = function(){
      let output = document.getElementById('preview');
      output.src = reader.result;
    };
    console.log("event=", event.target.files[0]);
    //reader.readAsDataURL(event.target.files[0]);
    console.log("reader=", reader.readAsDataURL(event.target.files[0]))
});
*/

// ************************ INSERTION FICHIER IMAGE PROJET *********************************
let urlnouveauProjet;
let imageInput;

ajoutfichierPhoto.addEventListener('change', (e) => {
    const file = ajoutfichierPhoto.files;
    if (file[0] && (file[0].type === "image/jpg" || file[0].type === "image/jpeg" || file[0].type === "image/png") && (Math.round(file[0].size / 1024) <= 4000)) {
        //console.log("Fichier sélectionné=", file[0]); // Vérif
        //console.log("Taille fichier sélectionné=", (Math.round(file[0].size / 1024))); // Vérif
        //console.log("Type fichier sélectionné (type)=", file[0].type); // Vérif
        //console.log("Nom fichier sélectionné=", file[0].name); // Vérif
        validPhoto = true;

        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            let img = document.getElementById('preview');
            img.src = e.target.result;
            urlnouveauProjet = img.src;
            validPhoto = true;
            img.className = "previewAffiche"; // affichage de l'image sélectionnée

            // Masquer la div galeriePhoto et afficher la div ajoutPhoto
            const Insertion = document.getElementById("Insertion");
            Insertion.className = "apresInsertion"; // masquage des éléments de la div cadreAjoutPhoto vide
        };
        console.log("file=", file[0]);
        fileReader.readAsDataURL(file[0]);
        imageInput = file[0];
    };
});

// **************** ACTIVATION BOUTON DE VALIDATION ET ENVOI DU NOUVEAU PROJET ****************************

// Catégorie valide renseignée
let validCategorie = false;
// ajout d'un écouteur d'évènement du sélecteur
const selectCategorie = document.getElementById("categorie");
selectCategorie.addEventListener("change", function() {
    let idcategorienouveauProjet = selectCategorie.options[selectCategorie.selectedIndex].value;
    if (idcategorienouveauProjet > 0) {
        validCategorie = true;
    } else {
        validCategorie = false;
    }
    // Titre valide renseigné
    let validTitre = false;
    let titrenouveauProjet = document.getElementById("titre").value;
    console.log("Titre=", titrenouveauProjet); // Vérif

    if (titrenouveauProjet.length > 0) {
        validTitre = true;
    } else {
        validTitre = false;
    };

    if (validPhoto && validTitre && validCategorie) {
        const boutonValidationprojet = document.getElementById("boutonValidprojet");
        boutonValidationprojet.className = "btn-on_2"; // activer le bouton
        console.log("photo, titre et catégorie validés"); // Vérif

        boutonValidationprojet.addEventListener("click", function() {
            console.log("Envoi - titre =", titrenouveauProjet); // Vérif
            idcategorienouveauProjet = parseInt(idcategorienouveauProjet);
            console.log("Envoi - idCatégorie =", idcategorienouveauProjet); // Vérif
            console.log("Requête=", JSON.stringify({ "image": urlnouveauProjet, "title": titrenouveauProjet, "categoryId": idcategorienouveauProjet}));
            console.log("arrêt"); // Point d'arrêt deboggeur
            
            // Création de l'objet FormData
            //const imageInput = file[0];
            const titleInput = titrenouveauProjet;
            const categoryInput = idcategorienouveauProjet;
            console.log("imageInput =", imageInput);
            console.log("titleInput =", titleInput);
            console.log("categoryInput =", categoryInput);

            const formData = new FormData();
            formData.append("image", imageInput);
            formData.append("title", titleInput);
            formData.append("category", categoryInput);
            console.log("formData=", formData); // Vérif
            console.log("arrêt"); // Point d'arrêt deboggeur

            /*
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                body: {
                    "image": urlnouveauProjet,
                    "title": titrenouveauProjet,
                    "categoryId": idcategorienouveauProjet,
                }
            })
            */

            fetch("http://localhost:5678/api/works", {
                method: "POST",
                body: formData,
            })

            .then(response => response.json())
            
            .then(data => {
                console.log("Projet envoyé avec succès ", data);
            })
            
            .catch(error => {
                console.log("Erreur lors de l'envoi du projet ", error);
            })
            
        });

    } else {
        const boutonValidationprojet = document.getElementById("boutonValidprojet");
        boutonValidationprojet.className = "btn-off_2"; // désactiver le bouton

    };

});

// ************* A la fin de l'ajout projet, remettre validPhoto, validTitre et validCategorie à false ********************
