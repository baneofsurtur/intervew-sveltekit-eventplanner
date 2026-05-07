<script lang="ts">
    import { enhance } from '$app/forms';
	import type { PageData, ActionData } from "./$types";
	import EventForm from '$lib/components/EventForm.svelte';

    let {data, form}: {data: PageData; form: ActionData} = $props();
</script>
{#await data.event}
    Loading event...
{:then event}
{#if event}
    <EventForm event={event} errors={form?.errors} />
{:else}
    <p>Event not found</p>
{/if}
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}