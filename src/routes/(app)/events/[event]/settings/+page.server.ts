import type { EventSettings } from "$lib/types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, locals: { getSession, supabase } }) => {
	const session: Session | null = await getSession();
	if (!session) redirect(307, "/auth");
	const eventId = cookies.get("eventId");
	const { data, error } = await supabase
		.from("events")
		.select("slug, eventName, primaryColor, secondaryColor, textColor, description")
		// Get by event ID
		.eq("id", eventId)
		.eq("ownerId", session.user.id);

	if (!data) throw new Error(`${error.message}`);
	//  Consider making event settings type
	const eventSettings: EventSettings = data[0];
	return {
		eventSettings,
	};
};

export const actions: Actions = {
	update: async ({ cookies, request, locals: { supabase, getSession } }) => {
		const formData = await request.formData()
		let slug = formData.get('slug') as string
		let eventName = formData.get('eventName')
		let description = formData.get('description')
		let primaryColor = formData.get('primaryColor')
		let secondaryColor = formData.get('secondaryColor')
		let textColor = formData.get('textColor')

		console.log("editing slug to be " + slug)
		// Do some validation shit here. Make sure slug is a valid slug
		if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) == false) {
			console.log("invalid slug "+ slug)
			return {
				error: "invalid slug"
			}
		}

		const session = await getSession()

		const {data: slugData, error: getSlugError} = await supabase.from('events').select('slug')
		console.log(slugData)
		const {data,error} = await supabase.from('events').update([{
		 	slug, eventName, description, primaryColor, secondaryColor, textColor
		}]).eq('ownerId', session?.user.id)
		console.log(error?.message)
		if (error?.message.includes('duplicate key')) return { error: 'duplicate slug'}
		if (error) throw new Error(error.message)
		return {
	success: 'Updated Event Settings'
}
		
		

	},
} satisfies Actions;

