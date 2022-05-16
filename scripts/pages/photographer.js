import MediaBrowser from "../utils/mediaBrowser.js";
import { LikesHandler } from "../utils/likes.js"
import { SortHandler } from "../utils/sort.js"


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
    // const photographMedia = document.querySelector(".photograph-media");
    const photographBanner = document.getElementById('photograph-banner');

        const photographerModel = photographerMediaFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        // const mediaDOM = photographerModel.getMediaDOM();
        const bannerDOM = photographerModel.getBannerDOM();
        userCardDOM.forEach( element => {
            photographHeader.appendChild(element);
        })
        // photographMedia.appendChild(mediaDOM);
        photographBanner.appendChild(bannerDOM)
};

export class MediaHandler {

    static async displayMedia(photographer, sortOpt) {
    
        const photographMedia = document.querySelector(".photograph-media");
        const photographerModel = photographerMediaFactory(photographer);
        const mediaDOM = photographerModel.getMediaDOM(sortOpt);
        photographMedia.appendChild(mediaDOM);
    };

}


async function init() {
    const photographerId = getParams();
    const photographer = await getPhotographerDatas(photographerId)
    await displayData(photographer)
    await MediaHandler.displayMedia(photographer)
    MediaBrowser.initMedia();
    LikesHandler.initLikes();
    await SortHandler.initSort(photographer);
}

init();