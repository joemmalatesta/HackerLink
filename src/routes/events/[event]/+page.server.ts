import { redirect, type ServerLoad } from "@sveltejs/kit";
import { selectedEvent } from "../../../Store";

export const load: ServerLoad = async ({ locals: { getSession }, fetch, params }) => {
	const session = await getSession();
	// Fetch form given the username and formID
	if (!session) {
		console.log("no session getting forms?");
		redirect(303, "/auth");
	}

	console.log(session.user.id);
	return {
		event: params.event,
	};
};


