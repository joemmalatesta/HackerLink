import type { EventSettings } from "$lib/types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, locals: { getSession, supabase } }) => {
	const session: Session | null = await getSession();
	if (!session) redirect(307, "/auth");
	const eventId = cookies.get("eventId");
	const { data, error } = await supabase
		.from("events")
		.select("slug, eventName, primaryColor, secondaryColor, textColor")
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
	publish: async ({ cookies, request, locals: { supabase } }) => {
		const formData = await request.formData()
		let slug = formData.get('slug')
		let eventName = formData.get('eventName')
		let primaryColor = formData.get('primaryColor')
		let seondaryColor = formData.get('secondaryColor')
		let textColor = formData.get('textColor')
		supabase.from('events').update([{
			// How do I not insert... Maybe I should just have values set to the shit I got from data.
		}])

	},
} satisfies Actions;

