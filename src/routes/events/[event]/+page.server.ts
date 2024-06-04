import { redirect } from "@sveltejs/kit";
import { selectedEvent } from "../../../Store";

export const load = async ({ locals: { getSession }, fetch, params }) => {
	const session = await getSession();
	// Fetch form given the username and formID
	if (!session) {
		console.log("no session getting forms?");
		redirect(303, "/auth");
	}

	console.log(`updating selected event to ${params.event}`);
	selectedEvent.update((event) => params.event);

	// selectedEvent.subscribe((value) => {
	//     console.log(value)
	// })

	console.log(session.user.id);
	return {
		event: params.event,
	};
};


