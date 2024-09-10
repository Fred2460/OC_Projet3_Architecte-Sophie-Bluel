// ***************************** LOGIN USER *****************************
//Récupération du user eventuellement connecté dans le localStorage
let userIdLogin = window.localStorage.getItem("userId"); // récupération du userId stocké
let tokenLogin = window.localStorage.getItem("token"); // récupération du token stocké

let userLogin = false;
if ((tokenLogin === null) || (tokenLogin === "undefined")) { // cas "pas de user connecté"
    userLogin = false;

} else { // cas "user connecté"
    userLogin = true;
    // changement nav lien "Login" en "Logout"
    const logLink = document.getElementById("logLink");
    logLink.textContent = "Logout";
    logLink.href = "#Logout";
    document.getElementById("affichageFiltre").classList.add("filtre-off");     // masquage de la barre des filtres

    // ajout icône et bouton "modifier"
    const sectionPortfolio = document.querySelector("#portfolio h2");
    const iconeModifier = document.createElement("i");
    iconeModifier.href = "#modifyProject";
    iconeModifier.classList.add("fa-regular");
    iconeModifier.classList.add("fa-pen-to-square");
    const boutonModifier = document.createElement("a");
    boutonModifier.innerText = "modifier";
    boutonModifier.href = "#modifyProject";
    boutonModifier.id = "modifier";
    sectionPortfolio.appendChild(iconeModifier);
    sectionPortfolio.appendChild(boutonModifier);
};


// ************** RECUPERATION CATEGORIES par l'API *****************
async function recuperationCategories() {
    try {
        // Récupération des catégories depuis l'API
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) {
            throw new Error(`Une erreur s'est produite (${response.status}). Veuillez réessayer plus tard.`);
        }
        const categories = response.json();
        return categories;
    } 
    catch (error) {
        alert(error);
    };
};

let categories = await recuperationCategories();
// Ajout du bouton "Tous" dans tableau categories si inexistant
if (categories.includes("Tous") == false) {
    const boutonTous = {
        id: 0,
        name: "Tous"
    }
    categories.push(boutonTous);
};
console.log("categories (après ajout Tous)=", categories); // Vérif

// *************************** AFFICHAGE FILTRES ****************************
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


// ************** RECUPERATION PROJETS par l'API *****************
async function recuperationProjets() {
    try {
        // Récupération des projets depuis l'API
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error(`Une erreur s'est produite (${response.status}). Veuillez réessayer plus tard.`);
        }
        const projets = response.json();
        return projets;
    }
    catch (error) {
        alert(error);
    };
};

let projets = await recuperationProjets();
console.log("projets=", projets); // Vérif


// ************** AFFICHAGE GALERIE DES PROJETS *****************
function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        // Récupération de l'élément du DOM qui accueillera la galerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const idProjet = document.createElement("figure");
        idProjet.id = "portfolioFigure_" + projets[i].id;
        idProjet.dataset.idCategorie = projet.category.id;
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        imageProjet.alt = projet.title;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;

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


// ******************************** GESTION DES APPUIS BOUTONS FILTRE *******************************
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
            const idProjet = document.getElementById("portfolioFigure_" + (i + decalIncrement));
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
        
        document.getElementById("portfolio").scrollIntoView({behavior: "smooth"}); // repositionnement (en mode smooth) de l'affichage avec le titre des projets en haut de page 
    });
};


// ********************************* LOGOUT ************************************
// changement nav lien "Logout" en "Login"
const logLink = document.getElementById("logLink");
logLink.addEventListener("click", function () {
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
        document.getElementById("modifyProject").className = "modal"; // affichage de la modale
        // génération des miniatures des projets
        document.querySelector("#projetsList").innerHTML = "";
        genererMiniProjets(projets);
    })
};


// masquer la modale (appui sur Escape)
window.addEventListener("keydown", function (e){
    if (e.key === "Escape" || e.key === "Esc") {
        document.getElementById("modifyProject").className = "modal-masque"; // masquage de la modale
        document.getElementById("galeriePhoto").className = "modal-wrapper"; // réinitialiser l'affichage de la div galeriePhoto
        masquerModaleAjoutphoto(); // Masquer la modale 2 (Ajout photo)
    };
});


/*
// masquer la modale (click en dehors de la modale)
//const modifProjets = document.getElementById("modifyProject");
const modal = document.querySelector(".modal-wrapper");
window.addEventListener("click", function (e){
    if (!modal.contains(e.target)) {
        const modifProjets = document.getElementById("modifyProject");
        modifProjets.className = "modal-masque"; // masquage de la modale
        // Masquer la div galeriePhoto et masquer la div ajoutPhoto
        const galeriePhoto = document.getElementById("galeriePhoto");
        galeriePhoto.className = "modal-wrapper-masque"; // masquage de la div galeriePhoto
        const ajoutPhoto = document.getElementById("ajoutPhoto");
        ajoutPhoto.className = "modal-wrapper-masque"; // masquage de la div ajoutPhoto
        // Afficher la div galeriePhoto et masquer la div ajoutPhoto
        const Insertion = document.getElementById("Insertion");
        Insertion.className = "avantInsertion"; // affichage des éléments de la div cadreAjoutPhoto
        // Masquer la photo sélectionnée
        const Preview = document.getElementById("preview");
        Preview.className = "previewMasque";
        document.getElementById("titre").value = ""; // effacement du champs titre dans formulaire
        // Effacement du sélecteur de la catégorie
        const selectCategorie = document.getElementById("categorie");
        selectCategorie.value = "";
        // Désactiver le bouton Valider (création nouveau projet)
        const boutonValidationprojet = document.getElementById("boutonValidprojet");
        boutonValidationprojet.className = "btn-off_2"; // désactiver le bouton
        // réinitialisation des variables de validation nouveau projet    
        validPhoto = false;
        validTitre = false;
        validCategorie = false;
    };
});
*/


// masquer la modale (appui bouton Fermer_1)
const demandeFermer_1 = document.getElementById("fermer_1");
demandeFermer_1.addEventListener("click", function () {
    document.getElementById("modifyProject").className = "modal-masque"; // masquage de la modale
});


// masquer la modale (appui bouton Fermer_2)
const demandeFermer_2 = document.getElementById("fermer_2");
demandeFermer_2.addEventListener("click", function () {
    document.getElementById("modifyProject").className = "modal-masque"; // masquage de la modale
    document.getElementById("galeriePhoto").className = "modal-wrapper"; // réinitialiser l'affichage de la div galeriePhoto
    masquerModaleAjoutphoto(); // Masquer la modale 2 (Ajout photo)
});


// Ajout d'un écouteur d'évènement pour bouton "Retour"
const boutonRetour = document.getElementById("retour")
boutonRetour.addEventListener("click", function() {
    // Afficher la div galeriePhoto et masquer la div ajoutPhoto
    document.getElementById("galeriePhoto").className = "modal-wrapper"; // affichage de la div galeriePhoto
    masquerModaleAjoutphoto(); // Masquer la modale 2 (Ajout photo)
});


// Fonction Masquer la modale 2 (AJOUT PHOTO)
function masquerModaleAjoutphoto() {
    document.getElementById("ajoutPhoto").className = "modal-wrapper-masque"; // masquage de la div ajoutPhoto
    document.getElementById("Insertion").className = "avantInsertion"; // réinitialisation de l'affichage des éléments de la div cadreAjoutPhoto
    document.getElementById("preview").className = "previewMasque"; // Masquer la photo sélectionnée
    document.getElementById("titre").value = ""; // effacement du champs titre dans formulaire
    document.getElementById("categorie").value = ""; // Effacement du sélecteur de la catégorie
    document.getElementById("boutonValidprojet").className = "btn-off_2"; // désactiver le bouton Valider (création nouveau projet)
    // réinitialisation des variables de validation nouveau projet    
    validPhoto = false;
    validTitre = false;
    validCategorie = false;
};


// ************************ FONCTION GENERATION DES MINIATURES DES PROJETS ***********************
function genererMiniProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        // Récupération de l'élément du DOM qui accueillera la galerie
        const divprojetsList = document.querySelector("#projetsList");
        // Création d’une balise dédiée à un projet
        const idProjet = projet.id;
        const minifigProjet = document.createElement("figure");
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const iconePoubelle = document.createElement("i");
        // Rattachement de la balise projet à la division projetsList
        divprojetsList.appendChild(minifigProjet);
        minifigProjet.appendChild(imageProjet);
        minifigProjet.appendChild(iconePoubelle);
        imageProjet.setAttribute("Id", "miniFig_" + idProjet);
        iconePoubelle.classList.add("fa-solid");
        iconePoubelle.classList.add("fa-trash-can");
        iconePoubelle.setAttribute("Id", idProjet);
    };
    
    //Récupération de tous les boutons poubelle
    const iconsPoubelle = document.querySelectorAll(".fa-solid.fa-trash-can");

    // Ajout d'un écouteur d'événement pour chaque icône poubelle
    iconsPoubelle.forEach(iconId => {
        iconId.addEventListener("click", function(e) {
            console.log("iconId=", iconId);
            // Demande de confirmation de suppression
            if (confirm("Suppression du projet " + e.target.id + " ?") == true) {
                supprimerProjet(e.target.id);
            };
        });
    });

    // Ajout d'un écouteur d'évènement pour bouton "Ajouter une photo"
    const boutonAjoutProjet = document.getElementById("boutonAjoutPhoto")
    boutonAjoutProjet.addEventListener("click", function() {
        // Masquer la div galeriePhoto et afficher la div ajoutPhoto
        document.getElementById("galeriePhoto").className = "modal-wrapper-masque"; // masquage de la div galeriePhoto
        document.getElementById("ajoutPhoto").className = "modal-wrapper"; // affichage de la div ajoutPhoto
    });
};


// ********************* FONCTION SUPPRESSION D'UN PROJET *****************
let errorMessageDelete = document.getElementById("errorMessageDelete");
async function supprimerProjet(idProjet) {
    //console.log("tokenLogin avant fetch=", tokenLogin); // Vérif
    //console.log("Bearer token avant fetch=", "Bearer " + tokenLogin); // Vérif
    //console.log("idProjet à supprimer avant fetch=", idProjet); // Vérif
    //console.log("target.idProjet à supprimer avant fetch=", target.idProjet); // Vérif
    //console.log("Arrêt"); // Point d'arrêt deboggeur
    try {
        const response = await fetch("http://localhost:5678/api/works/" + idProjet, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + tokenLogin
            }
        })
        if (!response.ok) {
            if (response.status === 401) {
                errorMessageDelete.textContent = "Accès non autorisé";
            } else {
                errorMessageDelete.textContent = "Erreur";
            }
            document.addEventListener('keydown', function(event) { // Attendre une touche clavier
                errorMessageDelete.textContent = "";
            });
            document.addEventListener('click', function(event) { // Attendre un clic de souris
                // Un clic est détecté, affiche le texte
                errorMessageDelete.textContent = "";
            });
        } else {
            /*
            document.getElementById("miniFig_" + idProjet).remove(); // suppression de l'élément img de la galerie miniatures
            document.getElementById(idProjet).remove(); // suppression de l'élément i de la galerie miniatures
            document.getElementById("portfolioFigure_" + idProjet).remove(); // suppression de l'élément figure de la galerie portfolio
            */
            const indexProjet = projets.findIndex(projet => projet.id == idProjet); // détermination de l'index du projet à supprimer
            projets.splice(indexProjet, 1); // suppression du projet sélectionné

            // génération des images des projets
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(projets);
            document.getElementById("modifyProject").className = "modal"; // affichage de la modale
             // génération des miniatures des projets
            document.querySelector("#projetsList").innerHTML = "";
            genererMiniProjets(projets);
            
        }

    } catch(error) {
        errorMessage.textContent = "Erreur d'accès au site, contactez votre administrateur.";
        alert(error);
    }
};


// *************************** ECOUTEUR AJOUT PHOTO POUR NOUVEAU PROJET *******************************
let file;
let validPhoto;
// Insertion fichier image projet
let imageInput;
const ajoutfichierPhoto = document.getElementById("ajoutfichierPhoto");
ajoutfichierPhoto.addEventListener("change", (e) => {
    const file = ajoutfichierPhoto.files[0];
    if (file && (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") && (Math.round(file.size / 1024) <= 4000)) {
        validPhoto = true;

        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            let img = document.getElementById('preview');
            img.src = e.target.result;
            imageInput = file;
            validPhoto = true;
            img.className = "previewAffiche"; // affichage de l'image sélectionnée
            document.getElementById("Insertion").className = "apresInsertion"; // masquage des éléments de la div Insertion dans cadreajoutPhoto
            vérifierboutonValider(); // vérification du statut du bouton de validation projet selon les 3 champs nécessaires
        };
        fileReader.readAsDataURL(file);

    };
});


// *************************** AJOUT TITRE POUR NOUVEAU PROJET *******************************
let titleInput;
let validTitre;
// ajout d'un écouteur d'évènement du choix du titre
const boutontitreInput = document.getElementById("titre");
boutontitreInput.addEventListener("click", function() {
    // Vérification titre renseigné et valide
    titleInput = document.getElementById("titre").value;
    if (titleInput.length > 0) {
        validTitre = true;
        vérifierboutonValider(); // vérification du statut du bouton de validation projet selon les 3 champs nécessaires
    } else {
        validTitre = false;
    };
});


// *************************** SELECTION CATEGORIE POUR NOUVEAU PROJET *******************************
let categoryInput;
let validCategorie;
// ajout d'un écouteur d'évènement du sélecteur de catégorie
const selectCategorie = document.getElementById("categorie");
selectCategorie.addEventListener("change", function() {
    // Vérification catégorie renseignée et valide
    categoryInput = parseInt(selectCategorie.options[selectCategorie.selectedIndex].value);
    if (categoryInput > 0) {
        validCategorie = true;
        titleInput = document.getElementById("titre").value;
        if (titleInput.length > 0) {
            validTitre = true;
        } else {
            validTitre = false;
        };
        vérifierboutonValider(); // vérification du statut du bouton de validation projet selon les 3 champs nécessaires
    } else {
        validCategorie = false;
        document.getElementById("boutonValidprojet").className = "btn-off_2"; // désactiver le bouton Valider (création nouveau projet)
    };
});


// ********************** FONCTION ACTIVATION/DESACTIVATION DU BOUTON DE VALIDATION (nouveau projet) ****************************
let valideProjet;
function vérifierboutonValider() {
    const boutonValidationprojet = document.getElementById("boutonValidprojet");
    if (validPhoto && validTitre && validCategorie) {
        boutonValidationprojet.className = "btn-on_2"; // activer le bouton
        // Ajout d'un écouter appui bouton "Valider"
        boutonValidationprojet.addEventListener("click", enregistrerProjet(imageInput, titleInput, categoryInput));
    } else {
        boutonValidationprojet.className = "btn-off_2"; // désactiver le bouton
    };
};


// ******************************* FONCTION ENREGISTREMENT DU NOUVEAU PROJET *************************************
let errorMessage = document.getElementById("errorMessage");
async function enregistrerProjet(imageInput, titleInput, categoryInput) {
    // Création de l'objet FormData
    const formData = new FormData();
    formData.append("image", imageInput);
    formData.append("title", titleInput);
    formData.append("category", categoryInput);

    try {
        // Envoi du projet via API /works   
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            //mode: "no-cors",
            headers: {
                //"Accept": "application/json",
                //"Content-Type": "multipart/form-data",
                //"Access-Control-Allow-Headers": "*",
                //"Authorization": `Bearer ${tokenLogin}`
                "accept": "application/json",
                "Authorization": "Bearer " + tokenLogin,
            },
            body: formData,
        })

        const responseProjet = await response.json();
        console.log("reponse.json()=", responseProjet); // Vérif
        
        if (!response.ok) {
            throw new Error(`Une erreur s'est produite lors de l'ajout d'un élément (${response.status}). Veuillez réessayer plus tard.`)
        }
        
        // Récupération de l'élément du DOM qui accueillera la galerie
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const idProjet = document.createElement("figure");
        idProjet.id = "portfolioFigure_" + responseProjet.id;
        idProjet.dataset.idCategorie = responseProjet.categoryId;
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = responseProjet.imageUrl;
        imageProjet.alt = responseProjet.title;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = responseProjet.title;
        // Rattachement de la balise projet à la division Gallery
        divGallery.appendChild(idProjet);
        idProjet.appendChild(imageProjet);
        idProjet.appendChild(titreProjet);
        // ajout d'une balise image pour affichage projet
        idProjet.classList.add("image");
        document.getElementById("modifyProject").className = "modal-masque"; // masquage de la modale
        document.getElementById("galeriePhoto").className = "modal-wrapper"; // réinitialisation de la div galeriePhoto
        masquerModaleAjoutphoto(); // Masquer la modale 2 (Ajout photo)
        // Regénération de la gallery des projets
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projets);
        /*
        if (response.ok) { // HTTP-status est 200-299
            let nouveauProjet = await response.json();
            console.log("Données projet récupérées avec succès")
            // Traitement du nouveau projet après réponse de l'API
            // ******************************************** A TESTER ********************************************************
            console.log("nouveauProjet=", nouveauProjet);
            // Transformation du projet en JSON
            projets.push(nouveauProjet); // ajout du nouveau projet dans le tableau JSON
            console.log("projets après vérif début=", projets); // Vérif
            // Transformation des projets en JSON
            const valeurProjets = JSON.stringify(projets);
            // Stockage des informations dans le localStorage
            window.localStorage.setItem("projets", valeurProjets);
        }
        */

    } catch (error) {
            console.log("Erreur lors de l'envoi du projet ", error);
            errorMessage.textContent = "Erreur d'envoi du projet."; // vérifier le code erreur *************************
            // Attendre un appui clavier
            document.addEventListener("keydown", function(event) {
                event.preventDefault();
                errorMessage.textContent = ""; // Une touche est pressée, efface le message
            });
            // Attendre un clic de souris
            document.addEventListener("click", function(event) {
                event.preventDefault();
                errorMessage.textContent = ""; // Un click est détecté, efface le message
            });
            alert(error);
    };

};
