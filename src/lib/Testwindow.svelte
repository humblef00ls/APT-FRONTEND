<script>
	export let id;
	export let pass;
	export let expected;
	export let got;
	export let input;

</script>





<div class="test" >
	<h3 >Test Case {id}
		{#if pass}
		 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--correct)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
	
{:else}

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wrong)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>

{/if}
	</h3>
	<div class="diff">
		<pre>Expected: {expected}</pre>
        <pre>Got: {got}</pre>
	
	</div>

    <pre>Input: {input}</pre>
</div>


<style>

.test {
    border-radius: 0px 25px  25px 0px;
    display: flex;
    padding: 20px;
    border: 4px solid var(--section-f);
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    opacity: .9;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: var(--section);
}
.diff{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

}
.diff pre{
    width: 100%;
    margin: 5px;
  
}

h3 {
    font-weight: bold;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 1.5rem;
    justify-content: space-between;
}
.test svg{
    margin-left:10px;
    transform: scale(.9);
}
</style>
