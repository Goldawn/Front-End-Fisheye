import MediaBrowser from "../utils/mediaBrowser.js";
import { LikesHandler } from "../utils/likes.js"
import { SortHandler } from "../utils/sort.js"

let photographerMediaData = [];

//  Fonction qui récupère les informations passées en paramètre URL
const getParams = () => {
    const params = (new URL(document.location)).searchParams;
    const photographerId = params.get('id')
    return photographerId;
}

// On récupère et retourne les datas dans la fichier json
async function getPhotographerDatas(id) {
    const result = await fetch('data/photographers.json')
    const data = await result.json()
    const photographersData = data.photographers;
    const photographersMedia = data.media;
    let photographerData = null;
    let photographerMedia = [];
    photographersData.forEach(photographer => {
        if(photographer.id == id ) {
            photographerData = photographer;
        }
    })
    photographersMedia.forEach(media => {
        if(media.photographerId == id) {
            photographerMedia.push(media);
        }
    })
    return [photographerData, photographerMedia];
}

// On affiche le DOM généré du bandeau top d'un photographe
async function displayData(photographer) {

    const photographHeader = document.querySelector(".photograph-header");

        const photographerModel = photographerMediaFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        userCardDOM.forEach( element => {
            photographHeader.appendChild(element);
        })
};

export class MediaHandler {

    // On affiche le DOM généré de la bibliothèque des médias
    static async displayMedia(photographer, sortOpt) { 
        const photographMedia = document.querySelector(".photograph-media");
        const photographerModel = photographerMediaFactory(photographer);
        const mediaDOM = photographerModel.getMediaDOM(sortOpt);
        photographMedia.appendChild(mediaDOM);
    };

    // On affiche le DOM généré de la bannière de la somme des likes
    static async displayBanner(photographer) {

        const photographBanner = document.getElementById('photograph-banner');

        const photographerModel = photographerMediaFactory(photographer);
        const bannerDOM = photographerModel.getBannerDOM();
        photographBanner.appendChild(bannerDOM)
    }
}

// Suite d'instructions à l'initialisation de la page
async function init() {
    const photographerId = getParams();
    const photographer = await getPhotographerDatas(photographerId)
    await displayData(photographer)
    await MediaHandler.displayMedia(photographer)
    await MediaHandler.displayBanner(photographer)
    MediaBrowser.initMedia();
    LikesHandler.initLikes(photographer);
    await SortHandler.initSort(photographer);
}

init();