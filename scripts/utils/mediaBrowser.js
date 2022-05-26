class MediaBrowser {

    constructor() {
        // let currentImgIndex ;
        this.prevBtn = document.getElementById('prev-btn')
        this.nextBtn = document.getElementById('next-btn')
        this.closeBtn = document.getElementById('close-btn')
        this.centralPanel = document.getElementById('central-panel')
        this.photographerMediaList = document.querySelectorAll('.media');
        this.modal = document.getElementById("media-modal")

        this.keyListener = (event) => {

            switch (event.key) {
                case "ArrowLeft":
                    this.prevBtnHandler(event)
                    break;
                case "ArrowRight":
                    this.nextBtnHandler(event)
                    break;
                case "Escape":
                    this.closeBtnHandler(event)
                    break;
            }
        }

        // Gestion de l'index du media précédant
        this.prevBtnHandler = (event) => {
            event.preventDefault();
            this.currentImgIndex--;
            if (this.currentImgIndex === -1) {
                this.currentImgIndex = this.photographerMediaList.length - 1;
            }
            this.displayShowcase(this.currentImgIndex)
        }

        // Gestion de l'index du media suivant
        this.nextBtnHandler = (event) => {
            event.preventDefault();
            this.currentImgIndex++;
            if (this.currentImgIndex === this.photographerMediaList.length) {
                this.currentImgIndex = 0;
            }
            this.displayShowcase(this.currentImgIndex)
        }

        this.closeBtnHandler = (event) => {
            event.preventDefault();
            this.modal.style.display = "none";
        }

        this.generateMedia = (ext, src) => {
            this.centralPanel.innerHTML = '';
            if (ext === "jpg") {
                const media = document.createElement("img")
                media.setAttribute('src', src)
                return (media)
            }
            else {
                const media = document.createElement("video")
                media.setAttribute('src', src)
                media.setAttribute("controls", "controls")
                return (media)
            }
        }

        // assignation d'un nouveau media à la lightbox
        this.displayShowcase = (index) => {
            let newSrc = this.photographerMediaList[index].attributes.src.value;
            const ext = newSrc.split('.').pop()
            const showcasedMedia = this.generateMedia(ext, newSrc)
            this.centralPanel.appendChild(showcasedMedia)
        }
    }


    initMedia() {
        this.currentImgIndex = 0;
        this.photographerMediaList = document.querySelectorAll('.media');

        this.photographerMediaList.forEach((media, index) => {

            media.addEventListener("click", (event) => {
                event.preventDefault();
                this.currentImgIndex = index;

                const ext = media.attributes.src.value.split('.').pop()
                const src = media.attributes.src.value
                const showcasedMedia = this.generateMedia(ext, src)
                this.centralPanel.appendChild(showcasedMedia)
                this.modal.style.display = "flex";
            })
        });

        // Gestion des clics souris pour l'eventListener
        this.prevBtn.addEventListener("click", this.prevBtnHandler)
        this.nextBtn.addEventListener("click", this.nextBtnHandler)
        this.closeBtn.addEventListener("click", this.closeBtnHandler)

        // Gestion de la saisie clavier pour l'eventListener
        document.addEventListener('keydown', this.keyListener);

    }

    clearEvents() {
        this.prevBtn.removeEventListener("click", this.prevBtnHandler)
        this.nextBtn.removeEventListener("click", this.nextBtnHandler)
        this.closeBtn.removeEventListener("click", this.closeBtnHandler)
        document.removeEventListener('keydown', this.keyListener);
    }

}

export default new MediaBrowser()