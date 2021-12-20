<!-- Past submissions section, ideally will be changed to a table. -->

<script>
 const submissions = [
    {
        id: "1",
        problem: "DivToZero",
        score: .52,
        timestamp: "11-24-2021 01:14:00"
    },
    {
        id: "2",
        problem: "Yahtzee",
        score: .27,
        timestamp: "11-22-2021 01:12:00"
    },
    {
        id: "3",
        problem: "OneHeapNim",
        score: 1,
        timestamp: "11-21-2021 01:11:00"
    },

]
</script>
<svelte:head>
<title>CompSci 101, Fall 2021 APT submissions</title>
</svelte:head>


    <section>
        <div class="submission capx">
            <p>Problem</p>
            <p>Tests Passed</p>
            <p>Timestamp</p>
        </div>

    {#each submissions as submission}
    <div class="submission">
        <p class="prob">{submission.problem}</p>
        <p class={`${submission.score >= 1 ? 'correct-t' : 'wrong-t'}`}><span class={`score ${submission.score >= 1 ? 'gl' : 'rl'}`}>{submission.score*100}%</span></p>
        <p>{submission.timestamp}</p>
    </div>
    {/each}
</section>




<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 8vw;
		padding-top: 25px;
        overflow-y: auto;
        height: 100vh;
        width: 100vw;
	}
    section{
        padding: 40px;
        border-radius: 20px;
        background-color: var(--section);
        margin-top: 20px;
    }
    .submission{
       
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;

    }
    .submission p{
        width: 33%;
        text-align: center;
        font-size: 1.2rem;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .capx{
        font-weight: bold;
        background: var(--accent);
        color: var(--text-inv);
        border-radius: 25px 25px 0 0;
    }
    .submission:nth-child(2n){
        background: var(--section-f);
    }
    .submission:last-child{
        border-radius: 0 0 25px 25px;
    }
    .correct-t {

color: var(--correct);
}
.wrong-t {

color: var(--wrong);
}
.score{
    padding: 10px;
    border-radius: 5px;

    font-size: 1rem;
    letter-spacing: 2px;
}
.gl{
    background: var(--correct-l);
}
.rl{
    background: var(--wrong-l);
}
</style>
