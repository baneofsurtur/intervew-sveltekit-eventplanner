<script lang="ts">
	import type { PageData } from "./$types";
    import { enhance } from '$app/forms';

    let submitting = $state(false);
    let activeEventId = $state<number | null>(null);
    let {data}: {data: PageData} = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="flex flex-row">
<h1 class="text-xl">Events</h1> <a class="btn" href="/events/create" role="button">Add Event</a>
</div>
{#await data.events}
    Loading events...
{:then events} 
<div class="flex flex-col">
    {#each events as event}
        <div class="flex justify-between">
            <div class="flex flex-col"> 
                <h2 class="text-lg font-bold"><a href="/events/{event.id}">{event.id}: {event.title}</a></h2>
                <p>{event.description}</p>
                <p>{event.date}</p>
            </div>
            <div class="flex">
                <a class="btn" href="/events/{event.id}/update" role="button">Update</a>
                <form method="POST" novalidate use:enhance={() => {
                    // This code runs right when the form is submitted
                    submitting = true;
                    activeEventId = event.id;

                    // Return a callback that runs after the server responds
                    return async ({ update }) => {
                        await update(); // apply the server's response to `form`
                        submitting = false;
                        activeEventId = null;
                        };
                }}>
                    <input type="hidden" name="eventId" value={event.id} />
                    <button type="submit" disabled={submitting}>{submitting && event.id === activeEventId ? 'Deleting...' : 'Delete'}</button>
                </form>
            </div>
        </div>
    {/each}
</div>
{:catch error}
    <p>Error loading events: {error.message}</p>
{/await}




<style>
.container {
  display: flex;
  flex-direction:column;
  background-color: DodgerBlue;
}

.container div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}
</style>