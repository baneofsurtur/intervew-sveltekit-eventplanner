import { createEvent } from "$lib/server/remote-events";
import type { Actions } from "../$types";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
    return {
        event: {
            title: '',
            description: '',
            date: ''
        }
    }
};

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
    default: async ({request}) => {
        const formdata = await request.formData();
        const event = {
            title: formdata.get('title')?.toString() ?? '',
            description: formdata.get('description')?.toString() ?? '',
            date: formdata.get('date')?.toString() ?? ''
        };

        const errors = validateEvent(event);
        if (Object.keys(errors).length > 0) {
            return fail(422, { 
                errors: errors 
            });
        }
        
        const newEvent = await createEvent(event);
        throw redirect(303, `/events`);
    }
}