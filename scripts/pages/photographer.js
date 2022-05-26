import MediaBrowser from "../utils/mediaBrowser.js";
import { LikesHandler } from "../utils/likes.js"
import { SortHandler } from "../utils/sort.js"

let photographerMediaData = [];


const getParams = () => {
    const params = (new URL(document.location)).searchParams;
    const photographerId = params.get('id')
    return photographerId;
}

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

async function displayData(photographer) {

    const photographHeader = document.querySelector(".photograph-header");

        const photographerModel = photographerMediaFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        const bannerDOM = photographerModel.getBannerDOM();
        userCardDOM.forEach( element => {
            photographHeader.appendChild(element);
        })
};

export class MediaHandler {

    static async displayMedia(photographer, sortOpt) { 
        const photographMedia = document.querySelector(".photograph-media");
        const photographerModel = photographerMediaFactory(photographer);
        const mediaDOM = photographerModel.getMediaDOM(sortOpt);
        photographMedia.appendChild(mediaDOM);
    };

    static async displayBanner(photographer) {

        const photographBanner = document.getElementById('photograph-banner');

        const photographerModel = photographerMediaFactory(photographer);
        const bannerDOM = photographerModel.getBannerDOM();
        photographBanner.appendChild(bannerDOM)
    }
}

async function handleMediaData(photographer) {
    photographer[1].forEach(media => {
        photographerMediaData.push(media)
    })
}

async function init() {
    const photographerId = getParams();
    const photographer = await getPhotographerDatas(photographerId)
    await handleMediaData(photographer)
    await displayData(photographer)
    await MediaHandler.displayMedia(photographer)
    await MediaHandler.displayBanner(photographer)
    MediaBrowser.initMedia();
    LikesHandler.initLikes(photographer);
    await SortHandler.initSort(photographer);
}

init();