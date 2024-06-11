import { fail, redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";


export const load: ServerLoad = async ({ locals: { getSession }, fetch, params, cookies}) => {
	const session = await getSession();
	// Fetch form given the username and formID
	if (!session) {
		console.log("no session getting events?");
		redirect(303, "/auth");
	}

	


	console.log(session.user.id);
	return {
		event: params.event,
	};
};

export const actions = {
	
} satisfies Actions;