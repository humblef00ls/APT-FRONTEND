<script>
	export let id;
	export let pass;
	export let expected;
	export let got;
	export let input;
	export let i;
	export let inx;
</script>

<span class="blob" on:click={()=>inx=i} class:mxr={inx==i}> 
	Test {id} 
		{#if pass}
		 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--correct)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
	
{:else}

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wrong)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>

{/if}

</span>

<style>
	    .blob{
			padding: 10px 15px;
    border-radius: 10px;
    background: var(--section);

    display: inline-block;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
	margin: 5px;
	transition: 300ms ease-out;
	width: 120px;
    }
	.mxr{
		background: var(--accent);
		color:var(--text-inv)
	}
	.test {
		display: flex;
		padding: 20px;
		border-radius: 25px;
		flex-direction: column;
		flex-wrap: nowrap;
        margin-bottom: 20px;
        opacity: .9;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		background-color: var(--section);
	}
	.diff{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;

	}
	.diff p{
		width: 50%;
	}
	h3 {
		font-weight: bold;
  
    margin-bottom: 5px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
	}
	.blob svg{
		
		transform: scale(.9);
	}
</style>
