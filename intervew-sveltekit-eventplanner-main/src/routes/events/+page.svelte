<script lang="ts">
	import type { PageData } from "./$types";
    import { enhance } from '$app/forms';
    import { Button } from 'svelte-ux';
    import { Card } from 'svelte-ux';
    import { goto } from '$app/navigation';

    let submitting = $state(false);
    let activeEventId = $state<number | null>(null);
    let {data}: {data: PageData} = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="flex flex-row">
<h1 class="text-xl">Events</h1> <Button href="/events/create">Add Event</Button>
</div>
{#await data.events}
    Loading events...
{:then events} 
<div class="flex flex-col gap-4">
    {#each events as event}
    <Card title="{event.id}: {event.title}" subheading="{event.date}" onclick={() => goto(`/events/${event.id}`)}>
        <div slot="contents">{event.description}</div>
        <div slot="actions">
            <Button variant="outline" href="/events/{event.id}/update" role="button">Update</Button>
            <form class="inline-flex" method="POST" novalidate use:enhance={() => {
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
                    <Button variant="fill" color="danger" type="submit" loading={submitting} disabled={submitting}>{submitting && event.id === activeEventId ? 'Deleting...' : 'Delete'}</Button>
                </form>
        </div>
    </Card>
        <!-- <div class="flex justify-between">
            <div class="flex flex-col"> 
                <h2 class="text-lg font-bold"><a href="/events/{event.id}">{event.id}: {event.title}</a></h2>
                <p>{event.description}</p>
                <p>{event.date}</p>
            </div>
            <div class="flex gap-2">
                <Button variant="outline" href="/events/{event.id}/update" role="button">Update</Button>
                <form class="inline-flex" method="POST" novalidate use:enhance={() => {
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
                    <Button variant="fill" color="danger" type="submit" loading={submitting} disabled={submitting}>{submitting && event.id === activeEventId ? 'Deleting...' : 'Delete'}</Button>
                </form>
            </div>
        </div> -->
    {/each}
</div>
{:catch error}
    <p>Error loading events: {error.message}</p>
{/await}




<style>
.button-update {
    background-color: rgb(70, 139, 223);
}

.button-delete {
    background-color: rgb(143, 0, 0);
}

.button-event-list {
    border-radius: 4px;
    border: none;
    color: white;
    padding: 5px 10px;
    @apply inline-flex items-center justify-center
}

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