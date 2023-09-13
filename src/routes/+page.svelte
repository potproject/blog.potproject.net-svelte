<script lang="ts">
	import Page from './page/[page]/+page.svelte';
	export let data;
</script>

<Page {data} />
