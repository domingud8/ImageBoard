export const commentList = {
    props: ["id"],
    data() {
        return {
            comments: [],
            text: "",
            username: "",
            placeholder_1: "Enter your comment",
        };
    },
    methods: {
        onFormSubmit(event) {
            event.preventDefault();
            fetch(`/images/${this.id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    text: this.text,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((comment) => {
                    this.comments = [comment.comment, ...this.comments];
                });
        },
        cleanInput() {
            this.text = null;
            this.username = null;
        },
    },
    mounted() {
        fetch("/images/" + this.id + "/comments")
            .then((response) => response.json())
            .then((comments) => {
                this.comments = comments;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    template: `
      <section class="comments">
        <div class= "list-comments">
        <ul>
         <article v-if="comments.length > 0">
               
                <div v-for="comment in comments">      
                  <li>  <span class="text-bf"> Commented by:  </span> {{comment.username}} <br> <span class="text-bf"> on  </span> {{comment.created_at}} <br> <br> {{comment.text}} </li>
                </div>

        </article>
        <article v-else>
                <div>
                    <p>Sorry, no comments yet.</p>
                </div>
            </article>
        </ul>
        </div>
        <div  class="div-form-comments">
           <form class="form-comments"   v-on:submit="onFormSubmit" v-on:submit="cleanInput"   >
             <div class="inputs">
               <p> Want to comment? Add here! 
               <input id="input-comment-username" type="text" name="username"  v-model="username" placeholder='Enter your username' required> </p>
               <textarea  id="input-comment-text" type="text"  name="text" v-model="text" placeholder="Enter your comment"></textarea>
               <button type="submit"  >Submit</button>
             </div>
          </form>
        </div>
      </section>  
    `,
};
