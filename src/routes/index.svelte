<script>
	import { onMount } from 'svelte/internal';

	import { clicks } from '$lib/stores/store';
	import { Increment } from '$lib/stores/db';
	import { db } from '$lib/stores/firebase';

	import { doc, getDoc } from 'firebase/firestore';

	import Leaderboard from '$lib/components/Leaderboard.svelte';
	import Closed from '../../static/pop/closed.jpg';
	import Open from '../../static/pop/open.jpg';

	// Localstorage
	let clicked = false;
	let slowedClicks = 0;
	let guildData;
	let guildConfirmed;
	let globalClicks;

	onMount(() => {
		// database save
		setInterval(async () => {
			let globalRef = doc(db, 'pops', 'total');
			const globalSnap = await getDoc(globalRef);

			globalClicks = globalSnap.data().clicks;
			Increment(guildConfirmed, slowedClicks); // guild parameter
			slowedClicks = 0;
		}, 2500);
	});

	// local storage
	function Clicked() {
		clicked = true;
		clicks.update((n) => n + 1);
		slowedClicks++;
		setTimeout(() => {
			clicked = false;
		}, 25);
	}
</script>

<svelte:head>
	<title>Poppop</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Sarabun:wght@600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full h-screen">
	<h1 class="text-7xl mb-5 ">Poppop</h1>

	<h3 class="text-5xl">{$clicks}</h3>

	<div class="flex">
		<label class="relative block">
			<span>กลุ่ม</span>
			<span class="absolute inset-y-0 left-0 flex items-center pl-2">
				<svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
			</span>
			<input
				class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
				placeholder="พีชคณิต ลิง มนุษย์ รร.ไก่...."
				type="text"
				name="search"
				bind:value={guildData}
			/>
		</label>
	</div>
	<button class="text-green-400" on:click={() => (guildConfirmed = guildData)}>Apply</button>

	<div on:click={Clicked}>
		{#if clicked}
			<img width="500" height="500" src={Open} alt="Open Mouth" />
		{:else}
			<img width="500" height="500" src={Closed} alt="Closed Mouth" />
		{/if}
	</div>

	{#if isNaN(globalClicks)}
		<h3 class="text-7xl text-red-500">Loading...</h3>
	{:else}
		<h3 class="text-7xl">🌎 {globalClicks}</h3>
		<!-- else content here -->
	{/if}
</div>

<Leaderboard />
