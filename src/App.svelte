<!-- Main page file, code rendered on the home page and past submissions section is here
See lib to see the components rendered here  -->
<script>
	import aptsX from "./aptsX.js";

	import { lightMode, mainTitle, url, config } from "./stores.js";
	import Submissions from "./lib/Submissions.svelte";
	import APT from "./lib/APT.svelte";
	import { setColors } from "./lib/utils.js";
	import { onMount } from "svelte";
	let urlPath = window.location.hash;
	let previous = false;

	const toggleLight = () => {
		$lightMode = !$lightMode;
		setColors($lightMode);
	};
	const apt_list = config.apt_sections.map((x) => ({
		...x,
		apts: x.apts.map((y) => ({ ...y, status: "" })),
	}));
	let help = false;
	let tagview = false;
	let sptc = apt_list;
	let f = [];
	onMount(() => {
		$lightMode =
			JSON.parse(window.localStorage.getItem("lightMode")) ??
			!(
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			);

		setColors($lightMode);

		let allapts = apt_list.map((x) => x.apts).reduce((a, b) => a.concat(b));
		let tx = [
			...new Set(
				allapts.map((x) => x.tags).reduce((a, b) => a.concat(b))
			),
		].sort();

		let reqb;
		let chalb;
		let sugb;

		console.log(aptsX);

		for (let i = 0; i < tx.length; i++) {
			const obx = {
				id: i,
				name: tx[i],
				info: "",
				apts: [
					...new Map(
						allapts
							.filter((x) => x.tags.includes(tx[i]))
							.map((v) => [JSON.stringify(v), v])
					).values(),
				],
			};
			if (tx[i] == "Required") reqb = obx;
			else if (tx[i] == "Challenge") chalb = obx;
			else if (tx[i] == "Suggested") sugb = obx;
			else f.push(obx);
		}

		if (sugb) f.unshift(sugb);
		if (chalb) f.unshift(chalb);
		if (reqb) f.unshift(reqb);


	});
	$: if (tagview) sptc = f;
	else sptc = apt_list;
</script>

<svelte:head>
	<title>{$mainTitle}</title>
</svelte:head>

<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153.82 179.19"
	><g id="Layer_2" data-name="Layer 2"
		><g id="Layer_1-2" data-name="Layer 1"
			><polygon
				points="109.3 27.67 124.08 27.67 124.08 13.77 109.3 13.86 109.3 27.67"
			/><path
				d="M138.2,26.87l14.39-.34a92.15,92.15,0,0,1-.75,12.37c-4.6.84-13.64.7-13.64.7Z"
			/><path
				d="M109,110c8.36-.16,17.42-.77,17.42-.77s-4.75,13.19-6.36,13.9c-.67.3-11,1-11,1Z"
			/><path
				d="M138,1.86v12s10,0,15.78-.66l.08-12.5C151,1.1,138,1.86,138,1.86Z"
			/><path
				d="M138.2,53.64V39.49L124,40.37V54.11S135.92,54.37,138.2,53.64Z"
			/><path
				d="M124.09,67.17c-.47,0-.11-13.06-.11-13.06s-19.54.78-28.94.78c-.35,0,0-12.69,0-12.69l14-.12V27.84H94.8V4.7l1.53-.09C90.29,4.85,84.4,5,79,5,51,5,26,3,0,0,0,0,0,56,26,104c19.23,35.58,43.09,67.45,52,74.29v.9l.64-.44L79,179v-.52c2.54-1.95,6.31-5.95,10.83-11.48H80V154H95V139.13s12.18-.69,14-1.13V124l-14.44.72V110.85l-14.88.05V97.83l14.59,0,.29,13.07s7.91-.17,14.43-.83V96s13.72-.57,14.8-.89L124,80.86s9.31-.11,14.15-1.14V66.78S127.51,67.17,124.09,67.17Zm-30,2.57H79.94v14h-15v-14h15V55.94H94.08Zm.38-27.86H80v-14H94.46Zm14.38,40.93s-7,.43-13.88.28V69.84s7.9,0,13.88-.41Z"
			/></g
		></g
	></svg
>
{#if $url == ""}
	<!-- content here -->

	<main>
		<header>
			<h1>{$mainTitle}</h1>
			<div class="btns">
				<button on:click={toggleLight}>
					{#if $lightMode}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="ico moon"
							><path
								d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
							/></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="ico sun"
							><circle cx="12" cy="12" r="5" /><line
								x1="12"
								y1="1"
								x2="12"
								y2="3"
							/><line x1="12" y1="21" x2="12" y2="23" /><line
								x1="4.22"
								y1="4.22"
								x2="5.64"
								y2="5.64"
							/><line
								x1="18.36"
								y1="18.36"
								x2="19.78"
								y2="19.78"
							/><line x1="1" y1="12" x2="3" y2="12" /><line
								x1="21"
								y1="12"
								x2="23"
								y2="12"
							/><line
								x1="4.22"
								y1="19.78"
								x2="5.64"
								y2="18.36"
							/><line
								x1="18.36"
								y1="5.64"
								x2="19.78"
								y2="4.22"
							/></svg
						>
					{/if}
				</button>
				<button on:click={() => (help = !help)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="ico help"
						><circle cx="12" cy="12" r="10" /><path
							d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
						/><line x1="12" y1="17" x2="12.01" y2="17" /></svg
					>
				</button>
				{#if help}
					<div class="helper">
						{config.setup.helpsection}
					</div>
				{/if}
			</div>
		</header>

		{#if previous}
			<p>Previous Submissions</p>
		{:else}
			<p>This is the webpage for grading and submitting your APTs.</p>
		{/if}
		<div class="btnsx">
			<button on:click={() => (previous = !previous)} class="sub-link">
				{#if previous}
					<svg
						width="24"
						height="24"
						xmlns="http://www.w3.org/2000/svg"
						fill-rule="evenodd"
						class="arrow"
						clip-rule="evenodd"
						><path
							d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
						/></svg
					>
					APTs
				{:else}
					Past Submissions
				{/if}
			</button>
			{#if !previous}
				<button on:click={() => (tagview = !tagview)} class="sub-link">
					{#if tagview}
						Group By Section
					{:else}
						Group By Tag
					{/if}
				</button>
			{/if}
		</div>

		{#if previous}
			<Submissions />
		{:else}
			<!-- else content here -->

			{#each sptc as apt}
				<!-- content here -->
				<section>
					<div class="title">
						<h2>{apt.name}</h2>
						<p>{apt.info}</p>
					</div>
					<div class="apt-container">
						{#each apt.apts as aptp}
							<a href={`#/APT/${aptp.name}`}>
								<div class="apt-item">
									<div
										class={`apt-status ${
											aptp.status == "correct"
												? "correct"
												: aptp.status == "wrong"
												? "wrong"
												: ""
										}`}
									/>
									<h3>{aptp.name}</h3>
									{#if aptp.tags.length > 0}
										<div class="tags">
											{#each aptp.tags.includes("Required") ? [...aptp.tags.filter((x) => x != "Required"), "Required"] : aptp.tags as tag}
												<span>
													{#if tag == "Required"}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="icox"
															><polygon
																points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
															/></svg
														>
													{:else}
														{tag}
													{/if}
												</span>
											{/each}
										</div>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/each}
			<footer>
				Made by <a href="https://aparimeya.xyz">Aparimeya Taneja</a>
			</footer>
		{/if}
	</main>
{:else if $url.split("/")[1] == "APT"}
	<APT data={aptsX.filter(x=> x.name == $url.split("/")[2])[0]}  />
{:else}
	Y
{/if}

<style>
	.logo {
		fill: var(--section-f);
		position: fixed;
		opacity: 0.75;
		height: 120vh;
		top: 0px;
		left: 0px;
		transform: translate(-30%, 0%);
		z-index: -1;
	}
	.helper {
		background-color: var(--accent);
		color: var(--text-inv);
		position: absolute;
		top: calc(100% + 15px);
		right: 0px;
		padding: 20px;
		border-radius: 15px;
	}
	.icox {
		stroke: none;
		fill: var(--accent);
		transform: scale(0.8);
	}
	.arrow {
		transform: rotate(180deg) translateX(260%);
		fill: var(--back);
		stroke: var(--back);
		position: absolute;
		left: 50%;
		transition-duration: 200ms;
		transition-timing-function: ease-out;
	}
	.sub-link:hover .arrow {
		transform: rotate(180deg) translateX(280%);
		fill: var(--text-inv);
		stroke: var(--text-inv);
	}
	footer {
		margin-top: 50px;
		width: 100%;
		text-align: center;
		opacity: 0.33;
		letter-spacing: 2px;
		color: var(--accent);
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 8vw;
		padding-top: 25px;
		padding-bottom: 30px;
		overflow-y: auto;
		height: 100vh;
		width: 100vw;
	}
	main > p {
		margin-top: 20px;
	}
	section {
		padding: 40px;
		padding-top: 30px;
		background: var(--section);

		box-shadow: rgba(98, 103, 109, 0.2) 0px 8px 24px;
		color: var(--text);
		border-radius: 25px;
		margin-top: 20px;
	}
	section .title {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: baseline;
	}
	.title p {
		font-size: 1.1rem;
	}
	.apt-item {
		background: var(--accent);
		color: var(--back);
		padding-left: 55px;
		padding-right: 25px;
		border-radius: 20px;
		margin-right: 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 60px;
		line-height: 60px;
		justify-content: center;
		margin-top: 20px;
		box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
		transition-duration: 230ms;
		position: relative;
		align-items: center;
	}
	.apt-item:hover {
		box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px;
		transform: scale(1.035);
	}
	.apt-container {
		display: flex;
		margin-top: 20px;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.apt-item .tags {
		margin-left: 10px;
		font-weight: 100;
	}
	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		opacity: 0.95;
	}
	.tags span {
		margin-left: 15px;
		margin-right: -5px;

		font-size: 0.8rem;
		font-weight: 100;
		background-color: var(--back);
		color: var(--accent);
		height: 34px;
		line-height: 30px;
		padding-left: 15px;
		padding-right: 15px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}
	.apt-status {
		width: 20px;
		height: 20px;
		border-radius: 50%;

		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 20px;
		background: var(--section);
		top: 50%;
		transform: translateY(-50%);
	}
	.correct {
		background: var(--correct);
	}
	.wrong {
		background: var(--wrong);
	}
	.sub-link {
		font-weight: 800;
		letter-spacing: 2px;
		background-color: var(--accent);
		color: var(--back);
		margin-top: 20px;
		padding: 10px;
		min-width: 200px;
		border-radius: 40px;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		width: fit-content;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.sub-link:hover {
		color: var(--text-inv);
	}
	a {
		text-decoration: none;
		color: var(--text);
	}
	header {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
	}
	.btns,
	.btnsx {
		transform: translateY(4px);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		position: relative;
	}
	.btnsx {
		margin-bottom: 10px;
	}
	.btnsx button {
		margin-right: 20px;
	}
	.btns button {
		min-width: unset;
		padding-left: 20px;
		padding-right: 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		margin-left: 15px;
	}

	.ico {
		stroke: var(--back);
		fill: none;
		transition-duration: 200ms;
		transition-timing-function: ease-out;
	}
	.btns button:hover .ico {
		stroke: var(--text-inv);
	}
</style>
