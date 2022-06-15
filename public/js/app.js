import * as Vue from "./vue.js";
//import { modalComponent } from "./components/modal.js";
import { modalComponent } from "./components/modal.js";

const app = Vue.createApp({
    components: {
        modal: modalComponent,
    },
    methods: {
        onModalClose: function () {
            this.currentImageID = null;
            history.pushState({}, "", "/");
        },
        onImageCLick: function (img_id) {
            this.currentImageID = img_id;
        },
        onSubmit: function (event) {
            event.preventDefault();
            const formData = new FormData();
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("title", this.title);
            formData.append("image", event.target.image.files[0]);

            fetch("/upload", { method: "POST", body: formData })
                .then((response) => response.json())
                .then((image) => {
                    this.images = [image.image, ...this.images];
                })
                .catch((error) => console.log("error on fetch upload", error));
        },
        moreImages: function () {
            this.currentPage++;
            fetch("/images?limit=3&page=" + this.currentPage)
                .then((response) => response.json())
                .then((images) => {
                    if (images.length == 0 || images.length < 3) {
                        this.isThereNextPage = false;
                    }
                    return (this.images = [...this.images, ...images]);
                });
        },
    },
    data() {
        return {
            header: "My Image Board",
            title: "",
            description: "",
            username: "",
            images: [],
            currentImageID: null,
            currentPage: 1,
            isThereNextPage: true,
        };
    },
    mounted() {
        window.addEventListener("popstate", () => {
            const id = location.hash.slice(1);
            this.currentImageID = id;
        });

        const id = location.hash.slice(1);
        this.currentImageID = id;

        fetch("/images?limit=3&page=" + this.currentPage)
            .then((response) => response.json())
            .then((images) => {
                return (this.images = images);
            });
    },
});

app.mount("#vueContent");
