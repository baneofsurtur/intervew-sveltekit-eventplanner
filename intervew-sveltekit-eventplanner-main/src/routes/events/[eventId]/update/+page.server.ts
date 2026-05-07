import { createEvent, deleteEventById, fetchEventById, updateEventById } from "$lib/server/remote-events";
import type { Actions } from "../$types";
import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = fetchEventById(eventId);
    return {
        event: event,
    }
}

type EventErrors = {
	title?: string;
	description?: string;
	date?: string;
};

function validateEvent(event: { title: string; description: string; date: string }): EventErrors {
    const errors: EventErrors = {};
    if (!event.title || event.title.trim() === '') {
        errors.title = 'Title is required';
    }
    if(!event.date) {
        errors.date = 'Date is required';
    }
    if (event.date && new Date(event.date) < new Date()) {
        errors.date = 'Date cannot be in the past';
    }
    return errors;
}

export const actions: Actions = {
    updateEvent: async ({request}) => {
        const formdata = await request.formData();
        const updatedEvent = {
            title: formdata.get('title')?.toString() ?? '',
            description: formdata.get('description')?.toString() ?? '',
            date: formdata.get('date')?.toString() ?? ''
        };
        const errors = validateEvent(updatedEvent);
            if (Object.keys(errors).length > 0) {
                return fail(422, { 
                    errors: errors 
                });
                //return { message: 'Resolve the errors before submitting the Event.', event: event, errors: errors };
            }
        const newEvent = await updateEventById(Number(formdata.get('id')), updatedEvent);
        //redirect(303, `/events/${newEvent?.id}`);
        return { message: 'Event updated successfully' };
    },
    deleteEvent: async ({request}) => {
        const formdata = await request.formData();
        const id = formdata.get('id')?.toString();
        if (!id) {
            error(400, 'Event ID is required');
        }
        await deleteEventById(Number(id));
        //redirect(303, `/events`);
        return { message: 'Event deleted successfully' };
    }
}