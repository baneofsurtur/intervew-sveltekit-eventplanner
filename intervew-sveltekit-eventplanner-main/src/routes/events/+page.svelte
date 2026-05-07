<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1 class="text-xl">Events</h1>
{#await data.events}
    Loading events...
{:then events} 
    {#each events as event}
        <div>
        <span> <h2 class="text-lg font-bold"><a href="/events/{event.id}">{event.id}: {event.title}</a></h2></span>
            <p>{event.description}</p>
            <p>{event.date}</p>
        </div>
    {/each}
{:catch error}
    <p>Error loading events: {error.message}</p>
{/await}


<a class="btn" href="/events/create" role="button">Add Event</a>