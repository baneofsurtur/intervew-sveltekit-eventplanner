<script lang="ts">
	import type { PageData } from "./$types";
    import { enhance } from '$app/forms';

    let submitting = $state(false);
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
        <form method="POST" novalidate use:enhance={() => {
            // This code runs right when the form is submitted
            submitting = true;

            // Return a callback that runs after the server responds
            return async ({ update }) => {
                await update(); // apply the server's response to `form`
                submitting = false;
                };
        }}>
            <input type="hidden" name="eventId" value={event.id} />
            <button type="submit" disabled={submitting}>{submitting ? 'Deleting...' : 'Delete'}</button>
        </form>
    {/if}
    {#if !event}
        <p>Event not found.</p>
    {/if}
</div>
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}