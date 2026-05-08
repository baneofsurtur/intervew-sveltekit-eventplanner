<script lang="ts">
    import { enhance } from '$app/forms';
    import { Button } from 'svelte-ux';

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
    let { event, errors }: {event: Event, errors?: EventError} = $props();
</script>

<form method="POST" novalidate use:enhance={() => {
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
        <Button variant="outline" type="submit" loading={submitting} disabled={submitting}>{submitting ? 'Creating Event...' : 'Create Event'}</Button>
    {/if}
    {#if event?.id}
        <input type="hidden" name="id" value={event.id}>
        <Button variant="outline" type="submit" fill="default" loading={submitting} disabled={submitting}>{submitting ? 'Updating Event...' : 'Update Event'}</Button>
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
</style>