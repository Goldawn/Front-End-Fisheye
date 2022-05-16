import MediaBrowser from "../utils/mediaBrowser.js";
import { MediaHandler } from "../pages/photographer.js";

export class SortHandler {

    constructor() {
        this.mediaContainer = document.getElementById("media-container")
    }

    static async initSort(photographer) {

        const photographMedia = document.querySelector(".photograph-media");
        this.mediaContainer = document.getElementById("media-container")
        const sortSelect = document.getElementById("select-medias") 
        sortSelect.addEventListener("change", () => {
            photographMedia.removeChild(this.mediaContainer)
            MediaHandler.displayMedia(photographer, sortSelect.value)
            this.mediaContainer = document.getElementById("media-container")
            // clear eventlistener des fleches du MediaBrowser
            MediaBrowser.clearEvents()
            MediaBrowser.initMedia();
        })
    }

}