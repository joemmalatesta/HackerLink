import type { Response, Answer } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { getSession, supabase }, cookies }) => {
	const session = await getSession();
	if (!session) redirect(307, "/auth");
	const eventId = cookies.get("eventId");
	const { data, error } = await supabase
		.from("events")
		.select("currentFormId, pastFormIds")
		// Get by event ID
		.eq("id", eventId)
		.eq("ownerId", session.user.id);
	if (!data) throw new Error(error.message);
	const formId: string = data[0].currentFormId;
	const pastFormIds: string[] = data[0].pastFormIds ?? [];
	const allFormIds = [formId, ...pastFormIds];
	const responses = await getResponses(supabase, allFormIds);
	console.log(allFormIds)
	return {
		responses, allFormIds
	};
};

async function getResponses(supabase: SupabaseClient, allFormIds: string[]) {
	const { data, error } = await supabase.from("responses").select("*").in("formId", allFormIds);
	if (error) throw new Error(error.message)
	return data as Response[]
}

