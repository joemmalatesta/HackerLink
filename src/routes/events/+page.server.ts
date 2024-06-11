/**
 * Auth validation happens in hooks.server.ts, so there's
 * no need to check anything here. Plus, we aren't returning 
 * server data to the /app page; so, this file only exists 
 * to trigger a server call for client-side routing, to check authentication.
 * 
 * If you have a one-off situation for authentication, 
 * or you'd rather be more explicit, check for a session and redirect.
 * 
 * 
*/
import { redirect } from '@sveltejs/kit'
import type { Event } from '$lib/types'


export const load = async ({ locals: { getSession, supabase } }: {locals: {getSession: any, supabase: SupabaseClient}}) => {
	 const session: Session = await getSession()
	  if (!session) redirect(307, '/auth')
		const { data, error } = await supabase
					.from("events")
					.select("eventName, description, primaryColor, secondaryColor, textColor, id")
					.eq("ownerId", session.user.id)
		
		if (!data) throw new Error(`${error.message}`)
		let events: Event[] = data
		return {
			events
		}
		
	 // Set cookies to current colors for event selected
	   // SUPABASE GET FORM
	   // SET COOKIES WITH RETURNED SHIT
	 }

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
export const actions = {
	// Either create new or update event
	createNewEvent: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		const eventName = formData.get("eventName");
		const description = formData.get("description");
        const primaryColor = formData.get('primaryColor')
        const secondaryColor = formData.get('secondaryColor')
        const textColor = formData.get('textColor')
		console.log(`adding new event ${eventName} to ${email} account`)
		// Make new event
		const { data, error } = await supabase
			.from("events")
			.insert([{ owner: email, ownerId: userId, primaryColor, secondaryColor, textColor, description, eventName }])
			.select();
		if (error){
			return fail(500, {
				message: error
			})}
		return {
			message: 'successfully updated profile'
		}
		
	},

	updateEvent: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		const eventName = formData.get("event_name");
		const eventDescription = formData.get("description");

		
	},
} satisfies Actions;

// Action for creating event that the modal will call
// ?/createEvent
