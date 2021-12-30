<script>
    import { onMount, onDestroy } from "svelte";
    import * as monaco from "monaco-editor";
    import { editorValues, submitting, APTXInfo, url } from "../stores.js";
    let editor;

    let init = false;

    $: filename =
        $url.split("/APTX/")[1] + (lang == "python" ? ".py" : ".java");
    export let lang;
    export let formName;

    onMount(mountEditor);
    function mountEditor() {
        editor = monaco.editor.create(document.getElementById("coder"), {
            value: $editorValues[filename],
            language: lang,
            automaticLayout: true,
            minimap: {
                enabled: false,
            },
            fontSize: 14,
            lineNumbers: "on",
            acceptSuggestionOnCommitCharacter: true,
            theme: "vs-dark",
        });
        editor.layout();
        editor.getModel().onDidChangeContent((event) => {
            saveCode();
        });
        init = true;
    }
    function saveCode() {
        if (!init) return;
        const storeVal = {};
        storeVal[filename] = editor.getValue();
        $editorValues = { ...$editorValues, ...storeVal };
    }
    onDestroy(destroyEditor);
    function destroyEditor() {
        if (editor) {
            editor.dispose();
            const model = editor.getModel();
            if (model) model.dispose();
        }
    }

    async function handleSubmit() {
        try {
            var file = new File([editor.getValue()], filename, {
                type: "text/plain",
            });
            let formData = new FormData();
            formData.append("upfile", file);
            formData.append("problem", formName);
            formData.append("course", "compsci101");
            formData.append("language", "python");
            // const elem = window.document.createElement("a");
            // elem.href = window.URL.createObjectURL(file);
            // elem.download = filename;
            // document.body.appendChild(elem);
            // elem.click();
            // document.body.removeChild(elem);
            const response = await fetch(
                "https://apt.cs.duke.edu/aptsec/pythonupload3.php",
                {
                    method: "POST",
                    body: formData,
                }
            );
            console.log(await response.json());
        } catch (e) {
            console.log(e);
        }
        $submitting = true;
    }

    function setEditor() {
        const model = editor.getModel();

        if (model) model.setValue($editorValues[filename]);
    }

    $: if ($url && editor) setEditor();
</script>

<form method="POST" enctype="multipart/form-data" action="">
    <input type="file" name="upfile" />
    <!-- needs to be manufactured by you -->

    <input type="hidden" name="problem" value={formName} />
    <!-- set per problem -->

    <input type="hidden" name="course" value="compsci101" />
    <!-- constant for semester -->

    <input type="hidden" name="language" value="python" />
    <!-- constant for semester -->

    <input type="submit" />
</form>

{#if !init}
    <div class="loader">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-loader"
            ><line x1="12" y1="2" x2="12" y2="6" /><line
                x1="12"
                y1="18"
                x2="12"
                y2="22"
            /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line
                x1="16.24"
                y1="16.24"
                x2="19.07"
                y2="19.07"
            /><line x1="2" y1="12" x2="6" y2="12" /><line
                x1="18"
                y1="12"
                x2="22"
                y2="12"
            /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line
                x1="16.24"
                y1="7.76"
                x2="19.07"
                y2="4.93"
            /></svg
        >
    </div>
{:else}
    <div class="buttons">
        <span>
            <button class="save" on:click={handleSubmit}> SUBMIT</button>
            <!-- 
            <button class="cancel" on:click={saveCode}> Save </button> -->
        </span>
        <span>
            <a href="/">
                <button class="homex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></button>
            </a>
            {#if $APTXInfo.index > 0}
                <a href={"#/APTX/" + $APTXInfo.apts[$APTXInfo.index - 1]}>
                    <button class="prev">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 41 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM41 10.5L2 10.5V13.5L41 13.5V10.5Z"
                            />
                        </svg>
                    </button>
                </a>
            {/if}

            {#if $APTXInfo.index < $APTXInfo.total - 1}
                <a href={"#/APTX/" + $APTXInfo.apts[$APTXInfo.index + 1]}>
                    <button class="next">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 41 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM41 10.5L2 10.5V13.5L41 13.5V10.5Z"
                            />
                        </svg></button
                    ></a
                >
            {/if}
        </span>
    </div>
{/if}
<div class="h-screen" style="height:calc(100vh - 75px)" id="coder" />

<style>
    a {
        text-decoration: none;
    }
    .loader {
        height: 100vh;
        width: 60vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 0px;
        top: 0px;
    }
    svg {
        stroke: var(--text-inv);
        fill: var(--text-inv);
    }
    .next svg{
        transform: rotate(180deg);
    }
    .homex svg{
        fill: none;
    }
    .loader svg {
        width: 75px;
        height: 75px;
        stroke: var(--accent);
        opacity: 0.5;
        animation-name: spin;
        animation-duration: 3000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        height: 75px;
        background: #1e1e1e;
        padding-left: 25px;
        padding-right: 25px;
        overflow-x: auto;
    }

    .buttons span {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    button {
        margin-left: 10px;

        font-size: 0.9rem;
        padding: 0px 25px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
