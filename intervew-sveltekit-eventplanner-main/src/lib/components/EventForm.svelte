<script lang="ts">
    import { enhance } from '$app/forms';
    import { fly, slide } from 'svelte/transition';

    type Event = {
        id?: number;
		title: string;
		description?: string;
		date: string;
	};

    type EventError = {
        id?: string;
        title?: string;
        description?: string;
        date?: string;
    };

    let submitting = $state(false);
    // console.log("EventForm props");
    //console.log(JSON.stringify($props(), null, 2));
    let { event, message, errors }: {event: Event, message?: string, errors?: EventError} = $props();
    // $effect(() => {
	// 	console.log('EventForm message:', message);
	// });
</script>


{#if message}
  <p class="success">✅ {message}</p>
{/if}

<form method="POST" action="?/createEvent" novalidate use:enhance={() => {
    // This code runs right when the form is submitted
    submitting = true;

    // Return a callback that runs after the server responds
    return async ({ update }) => {
        await update(); // apply the server's response to `form`
        submitting = false;
        };
    }}>
    <!-- form for creating new event -->
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="{event?.title}" required>
    {#if errors?.title}
      <small class="error">{errors.title}</small>
    {/if}
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description" value="{event?.description}"></textarea>
    {#if errors?.description}
      <small class="error">{errors.description}</small>
    {/if}
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" value="{event?.date}" required>
    {#if errors?.date}
      <small class="error">{errors.date}</small>
    {/if}
    
    {#if !event?.id}
        <button type="submit" disabled={submitting}>{submitting ? 'Creating Event...' : 'Create Event'}</button>
    {/if}
    {#if event?.id}
        <input type="hidden" name="id" value={event.id}>
        <button type="submit" formaction="?/updateEvent">{submitting ? 'Updating Event...' : 'Update Event'}</button>
        <button class="delete-button" type="submit" formaction="?/deleteEvent">{submitting ? 'Deleting Event...' : 'Delete Event'}</button>
    {/if}
</form>

<style>
  form {
    display: grid;
    gap: 1rem;
    max-width: 40rem;
  }

  label {
    font-weight: 500;
  }

  input,
  textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
  }

  .error {
    color: #c00;
    font-size: 0.875rem;
  }

  .success {
    color: #0a7;
    margin-bottom: 1rem;
  }

  button {
    color: white;
    border: 1px solid white;
    background-color: blue;
  }
  button.delete-button {
    background-color: red;
    border: 1px solid red;
  }
  button:disabled {
    background-color: gray;
    border: 1px solid gray;
  }
</style>