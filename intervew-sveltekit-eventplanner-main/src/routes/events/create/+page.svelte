<script lang="ts">
    import { enhance } from '$app/forms';
    import { fly, slide } from 'svelte/transition';
	import type { PageData } from "./$types";

    let {data, form}: {data: PageData; form: HTMLFormElement} = $props();
</script>


{#if !form?.errors && form?.message}
  <p class="success">{form.message}</p>
{/if}

<form method="POST" action="?/createEvent" use:enhance novalidate>
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
        <button type="submit">Create Event</button>
    {/if}
    {#if data.event?.id}
        <input type="hidden" name="id" value={data.event.id}>
        <button type="submit" formaction="?/updateEvent">Update Event</button>
    {/if}
</form>