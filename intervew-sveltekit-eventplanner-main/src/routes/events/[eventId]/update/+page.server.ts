import { createEvent, deleteEventById, fetchEventById, updateEventById } from "$lib/server/remote-events";
import type { Actions } from "../$types";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = fetchEventById(eventId);
    return {
        event: event,
    }
}

export const actions: Actions = {
    updateEvent: async ({request}) => {
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();
        if (!title || !date) {
            error(400, 'Title and Date are required');
        }
        if (date && new Date(date) < new Date()) {
            error(400, 'Date cannot be in the past');
        }
        const newEvent = await updateEventById(Number(formdata.get('id')), {title, description, date});
        redirect(303, `/events/${newEvent?.id}`);
    },
    deleteEvent: async ({request}) => {
        const formdata = await request.formData();
        const id = formdata.get('id')?.toString();
        if (!id) {
            error(400, 'Event ID is required');
        }
        await deleteEventById(Number(id));
        redirect(303, `/events`);
    }
}