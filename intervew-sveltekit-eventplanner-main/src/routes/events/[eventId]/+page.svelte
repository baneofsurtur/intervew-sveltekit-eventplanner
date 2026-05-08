<script lang="ts">
	import type { PageData } from "./$types";
    import { enhance } from '$app/forms';
    import { Button } from 'svelte-ux';

    let submitting = $state(false);
    let {data}: {data: PageData} = $props();
</script>


{#await data.event}
    Loading event...
{:then event} 
<div class="flex flex-col gap-1">
    {#if event}
        <div class="flex flex-col">
            <h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
        </div>
        <div class="flex gap-2">
            <Button variant="outline" href="../events/{event.id}/update">Edit Event</Button>
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
            <Button variant="fill" color="danger" type="submit" loading={submitting} disabled={submitting}>{submitting ? 'Deleting...' : 'Delete'}</Button>
        </form>
        </div>
    {/if}
    {#if !event}
        <p>Event not found.</p>
    {/if}
</div>
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}

<style>
    
</style>