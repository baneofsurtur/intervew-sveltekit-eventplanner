<script lang="ts">
    import { enhance } from '$app/forms';
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>

<form method="POST" action="?/createEvent">
    <!-- form for creating new event -->
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="helloWorld" required>
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description"></textarea>
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" required>
    
    {#if !data.event?.id}
        <button type="submit">Create Event</button>
    {/if}
    {#if data.event?.id}
        <input type="hidden" name="id" value={data.event.id}>
        <button type="submit" formaction="?/updateEvent">Update Event</button>
    {/if}
</form>