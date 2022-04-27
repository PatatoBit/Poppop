<script>
	import { db } from '$lib/stores/firebase';
	import { collection, getDocs, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte/internal';
	let guilds = [];

	onMount(async () => {
		const guildsRef = collection(db, 'pops/total/guilds');
		const unsub = onSnapshot(guildsRef, (guildsSnapshot) => {
			guilds = [];
			guildsSnapshot.forEach((doc) => {
				guilds = [...guilds, [doc.id, doc.data().clicks]];
			});
			guilds.forEach((doc) => {
				console.log(doc[0], doc[1]);
			});
		});
	});
</script>

<div class="border border-black rounded flex flex-col mx-96">
	{#each guilds as guild}
		<div class="flex flex-row my-5">
			<h1 class="text-5xl flex-1 flex-left text-left">{guild[0]}</h1>
			<h1 class="text-5xl flex-1 flex-right text-right">{guild[1]}</h1>
		</div>
	{/each}
</div>
