import { deleteEventById, fetchEventById } from "$lib/server/remote-events";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../[eventId]/$types";
import type { Actions } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    return {
        event: fetchEventById(eventId)
    }
}

export const actions: Actions = {
    default: async ({request}) => {
        const formdata = await request.formData();
        const id = formdata.get('eventId')?.toString();
        if (!id) {
            error(400, 'Event ID is required');
        }
        await deleteEventById(Number(id));
        throw redirect(303, `/events`);
    }
}