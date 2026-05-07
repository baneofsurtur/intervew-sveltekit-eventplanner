<script lang="ts">
    import { enhance } from '$app/forms';
    import { fly, slide } from 'svelte/transition';
	import type { PageData } from "./$types";

    let submitting = $state(false);
    let {data, form}: {data: PageData; form: HTMLFormElement} = $props();
</script>


{#if !form?.errors && form?.message}
  <p class="success">{form.message}</p>
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
    <input type="text" id="title" name="title" value="{form?.event?.title}" required>
    {#if form?.errors?.title}
      <small class="error">{form.errors.title}</small>
    {/if}
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description" value="{form?.event?.description}"></textarea>
    {#if form?.errors?.description}
      <small class="error">{form.errors.description}</small>
    {/if}
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" value="{form?.event?.date}" required>
    {#if form?.errors?.date}
      <small class="error">{form.errors.date}</small>
    {/if}
    
    {#if !data.event?.id}
        <button type="submit" disabled={submitting}>{submitting ? 'Creating Event...' : 'Create Event'}</button>
    {/if}
    {#if data.event?.id}
        <input type="hidden" name="id" value={data.event.id}>
        <button type="submit" formaction="?/updateEvent">Update Event</button>
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
  button:disabled {
    background-color: gray;
    border: 1px solid gray;
  }
</style>