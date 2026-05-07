<script lang="ts">
    import { enhance } from '$app/forms';
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>
{#await data.event}
    Loading event...
{:then event} 
<form method="POST" action="?/createEvent">
    <!-- form for creating new event -->
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="{event?.title}" required>
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description" value="{event?.description}"></textarea>
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" value="{event?.date}" required>
    
    {#if !event?.id}
        <button type="submit">Create Event</button>
    {/if}
    {#if event?.id}
        <input type="hidden" name="id" value={event.id}>
        <button type="submit" formaction="?/updateEvent">Update Event</button>
        <button type="submit" formaction="?/deleteEvent">Delete Event</button>
    {/if}
</form>
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}