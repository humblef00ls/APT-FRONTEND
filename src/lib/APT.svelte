<!-- 
Page for selected question. Editor is the same editor used in VS code, Monaco Editor.
Also uses components from lib. -->
<script>
    export let data;
    import { draggable } from "svelte-drag";
    import Submission from "./Submission.svelte";
    import { submitting , sliderX } from "../stores.js";
    $submitting = false;
    import { onMount } from "svelte";

    import Ex from "./Ex.svelte";
  
    let lefx = 100
    let sliderEl
    onMount(() => {
        lefx =  $sliderX
        // sliderEl.style.left =  `calc(50% - 6px - ${sliderX}px);`
        const lists = document.getElementsByTagName("li");
 
        for (let item of lists) {
            item.className = "constr";
        }


    });
    const handleSubmitAPT = (e) => {
        e.preventDefault();

   
    }

</script>


<Submission />

<svelte:head>
    <title>CompSci 101, Fall 2021 APT {data.name}</title>
</svelte:head>

<main>
    <div
    class="slider-X"
    bind:this={sliderEl}
    
    use:draggable={{
        axis: "x",
        bounds: { left: 350, right: 400 },
        position: { x:lefx },
        onDrag: ({ offsetX, offsetY }) => {
            $sliderX = offsetX
            lefx = offsetX
        },
    }}
/>
   <section class="info" style={`width: calc(50% + ${$sliderX}px);`}>
        <div class="question">
            <h1>{data.name}</h1>
            <p class="descp">
                {#each data.tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </p>
            <p class="prob">
                {@html data.problem
                    .split("\n")
                    .map((x) => (x == "" ? "<br><br>" : x))
                    .join(" ")
                    .replace("<br><br> <br><br>", "<br><br>")
                    .replace(" <br><br> <br><br> <br><br> ", "<br><br>")
                    .replace("<br><br> <br><br>", "<br><br>")
                    .replace("<br><br> </ul> <br>", "</ul> <br>")
                    .replace("<br><br> <br><br>", "<br><br>")
                    .replace("<br><br> <br><br> <br><br>", "<br><br>")
                       }
            </p>
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
    <section class="editor" style={`width: calc(50% - ${$sliderX}px);`}>

        <Ex  {...data} />
    </section>
</main>

<style>
    .slider-X {


        cursor: col-resize;
        height: 100vh;
        width: 12px;
        position: absolute;
        top: 0;
        left: calc(50% - 6px);

        z-index: 23;
    }

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
        position: relative;
    }
    .editor {
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        position: relative;
    }
    .info {
        padding: 40px;
        padding-top: 25px;
        overflow-y: auto;
        height: 100vh;
        overflow-x: auto;
    }

    .descp {
        opacity: 0.65;
        margin-top: 10px;
        margin-bottom: 15px;
        overflow-x: auto;
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
        overflow-x: auto;
    }

    h2 {
        margin-top: 10px;
    }
    h1 {
        margin: 0px;
        font-size: 2.8rem;
        font-weight: bold;
        overflow-x: auto;
    }
</style>
