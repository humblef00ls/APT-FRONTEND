<!-- 
Page for selected question. Editor is the same editor used in VS code, Monaco Editor.
Also uses components from lib. -->
<script>
    export let data;
    // export const data = {
    //     name: "isSpecial",
    //     description: "Additional info and notes",
    //     tags: ["Lecture 12", "Required"],
    //     problem:
    //         "Some people have dietary restrictions because of health issues, some because of religious issues, and some for ethical, moral, or other reasons. You must write the function lovely that determines how many of the individual ingredients in some food/recipe are edible. The String inedible is a white-space delimited list of inedible food-stuffs. Any ingredient that's not listed in inedible is, therefore, edible.",
    //     constraints: [
    //         "All characters in inedible and ingredients are upper or lower case 'A'-'Z', 'a'-z'",
    //         "The number of 'words' (character sequences separated by whitespace) in inedible is fewer than 50, similarly for ingredients",
    //         "Each word is separated from another word by exactly one space in both inedible and ingredients .",
    //         "All words in ingredients are distinct.",
    //     ],
    //     examples: [
    //         'ingredients = "honey sugar"\ninedible = "rice milk potato"\n\nreturns: 2\n\nEach of the two items in ingredients is edible since neither is inedible.',
    //         'ingredients = "pork shrimp marshmallow"\ninedible = "asparagus shrimp lobster crayfish bacon"\n\nreturns: 2 \n\n shrimp isn\'t edible, but pork and marshmallow are',
    //         'ingredients = "a e i o u"\ninedible = "b c d f g h j k l m n p q r s t v w x y z"\n\nreturns: 5\n\n All the vowels are edible since only the consonants are inedible',
    //         'ingredients = "stuff"\ninedible = "this that the other stuff nonsense"\n\nreturns: 0',
    //     ],
    //     initial: [
    //         "def lovely(ingredients,inedible):",
    //         '\t"""',
    //         "\treturn int, number of items in",
    //         "\tingredients, a string that are edible",
    //         "\tusing informaion from  inedible, a string",
    //         '\t"""',
    //         "\t# you write code here",
    //     ],
    // };
    // import Editor from './Editor.svelte';

    import Submission from "./Submission.svelte";
    import { submitting } from "../stores.js";
    $submitting = false;
        import { onMount } from "svelte";

    import Ex from "./Ex.svelte";
    console.log(data)

    onMount(() => {
       const lists =  document.getElementsByTagName("li")
       console.log(lists)
       for (let item of lists) {
           item.className = "constr"

       }

    });
</script>

<Submission />

<svelte:head>

    <title>CompSci 101, Fall 2021 APT {data.name}</title>

</svelte:head>

<main>
    <section class="info">
        <div class="question">
            <h1>{data.name}</h1>
            <p class="descp">
                {#each data.tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </p>
            <p class="prob">{@html data.problem.split('\n').map(x=> x == '' ? '<br><br>' : x).join(' ').replace('<br><br> <br><br>', '<br><br>')}</p>
        </div>
        <div class="question">
            <h2>Constraints</h2>
            {@html data.constraints}
            <!-- <ul>
                {#each data.constraints as constraint}
                    <li class="constr">{constraint}</li>
                {/each}
            </ul> -->
        </div>
        <div class="question">
            <h2>Examples</h2>
            {@html data.examples}
            <!-- <ol>
                {#each data.examples as example}
                    <li class="constr"><pre>{example}</pre></li>
                {/each}
            </ol> -->
        </div>
    </section>
    <section class="editor">
        <Ex initial={data.initial} filename={data.filename}  lang = {data.lang}/>
    </section>
</main>

<style>
    .tag {
        background: var(--back);
        border-radius: 5px;
        color: var(--text);
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        margin-right: 10px;
        padding: 7px 10px;
        opacity: 0.4;
    }
    main {
        display: flex;
        height: 100vh;
        width: 100vw;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .editor {
        width: 55%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .info {
        padding: 40px;
        padding-top: 25px;
        overflow-y: auto;
        height: 100vh;
        width: 45%;
    }

    .descp {
        opacity: 0.65;
        margin-top: 10px;
        margin-bottom: 15px;
    }
    .question {
        padding: 25px;

        padding-left: 40px;
        padding-right: 40px;
        background: var(--section);
        box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
        border-radius: 30px;
        margin-top: 20px;
        margin-bottom: 30px;
    }

    h2 {
        margin-top: 10px;
    }
    h1 {
        margin: 0px;
    }
</style>
