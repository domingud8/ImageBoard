import { commentList } from "./comments.js";

export const modalComponent = {
    components: {
        "comment-list": commentList,
    },
    props: ["id"],
    methods: {
        onCloseButtonClick() {
            document.body.style.position = "";
            this.$emit("close");
        },
    },
    data() {
        return {
            image: {},
            visible: false,
        };
    },
    mounted() {
        fetch("/images/" + this.id)
            .then((response) => response.json())
            .then((image) => {
                document.body.style.position = "fixed";
                this.image = image;
                this.visible = true;
            });
    },
    template: `
    <div class="modal" v-bind:class="{visible: visible}">
      <button class="modal-close" v-on:click="onCloseButtonClick">&times;</button>
      <div class="modal-content">
        <section class="modal-image">
           <img :src="image.url" :alt="image.title">
           <h2> <span class="text-bf">  Title: </span> {{image.title}} </h2>  
           <p> {{image.description}} <br> <br>
           <span class="text-bf"> Submitted by:</span> {{image.username}}  <br>
            <span class="text-bf"> Created on:</span> {{image.created_at}} <br> </p>
        </section>
      <comment-list v-bind:id="id"></comment-list>
      </div>
    </div>`,
};
