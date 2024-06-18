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
	update: async ({ cookies, request, locals: { supabase } }) => {
		const formData = await request.formData()
		let slug = formData.get('slug')
		let eventName = formData.get('eventName')
		let description = formData.get('description')
		let primaryColor = formData.get('primaryColor')
		let secondaryColor = formData.get('secondaryColor')
		let textColor = formData.get('textColor')

		// Do some validation shit here. Make sure slug is a valid slug

		const {data,error} = await supabase.from('events').update([{
			slug, eventName, description, primaryColor, secondaryColor, textColor
		}]).eq('ownerId', (await supabase.auth.getSession()).data.session?.user.id)
		if (error) throw new Error(error.message)
		

	},
} satisfies Actions;

