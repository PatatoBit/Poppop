<script>
	import { onMount } from 'svelte/internal';

	import Closed from '../../static/pop/closed.jpg';
	import Open from '../../static/pop/open.jpg';

	import { clicks } from '$lib/stores/store';
	import { Increment } from '$lib/stores/db';

	import { db } from '../lib/stores/firebase';
	import { doc, onSnapshot } from 'firebase/firestore';

	let clicked = false;
	let globalClicks;

	onMount(() => {
		setInterval(() => {
			const unsub = onSnapshot(doc(db, 'pops', 'total'), (doc) => {
				globalClicks = doc.data().clicks;
			});
		});
	});

	function Clicked() {
		clicked = true;
		console.log(clicks);
		clicks.update((n) => n + 1);
		Increment();
		globalClicks = doc(db, 'pops', 'total');
		setTimeout(() => {
			clicked = false;
		}, 50);
	}
</script>

<svelte:head>
	<title>Poppop</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full h-screen">
	<h1 class="text-6xl mb-5">Poppop</h1>

	<!-- Input -->
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
		/>
	</label>
	<h3 class="text-7xl">{$clicks}</h3>

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
		<h3 class="text-7xl">{globalClicks}</h3>
		<!-- else content here -->
	{/if}
</div>
