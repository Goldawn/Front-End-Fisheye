import MediaBrowser from "../utils/mediaBrowser.js";
import { MediaHandler } from "../pages/photographer.js";
import { LikesHandler } from "../utils/likes.js"

export class SortHandler {

    static async initSort(photographer) {

        const photographMedia = document.querySelector(".photograph-media");
        const photographBanner = document.getElementById('photograph-banner');
        this.mediaContainer = document.getElementById("media-container")
        this.bannerContainer = document.getElementById("banner-container")
        const sortSelect = document.getElementById("select-medias") 
        sortSelect.addEventListener("change", () => {
            photographMedia.removeChild(this.mediaContainer)
            MediaHandler.displayMedia(photographer, sortSelect.value)
            photographBanner.removeChild(this.bannerContainer);
            MediaHandler.displayBanner(photographer)
            this.mediaContainer = document.getElementById("media-container")
            this.bannerContainer = document.getElementById("banner-container")
            // clear eventlistener des fleches du MediaBrowser
            MediaBrowser.clearEvents()
            MediaBrowser.initMedia();
            LikesHandler.initLikes(photographer);
        })
    }

}