<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>


{#await data.event}
    Loading event...
{:then event} 
<div>
    {#if event}
        <h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
        <p>{event.description}</p>
        <p>{event.date}</p>
        <a class="btn" href="../events/{event.id}/update" role="button">Edit Event</a>
    {/if}
</div>
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}