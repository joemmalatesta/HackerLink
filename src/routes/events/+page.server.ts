/**
 * Auth validation happens in hooks.server.ts, so there's
 * no need to check anything here. Plus, we aren't returning 
 * server data to the /app page; so, this file only exists 
 * to trigger a server call for client-side routing, to check authentication.
 * 
 * If you have a one-off situation for authentication, 
 * or you'd rather be more explicit, check for a session and redirect.
 * 
 * import { redirect } from '@sveltejs/kit'
 * 
 * export const load = async ({ locals: { getSession } }) => {
 *  const session = await getSession()
 *  if (!session) redirect(307, '/auth')
 * // Set cookies to current colors for event selected
	// SUPABASE GET FORM
	// SET COOKIES WITH RETURNED SHIT
 * }
 * 
 */






  
// import { Resend } from 'resend';
// import { RESEND_KEY } from '$env/static/private';
// import type { Actions } from "./$types";
// import { fail } from '@sveltejs/kit';
// export const actions = {
//   // Either create new or update event
// 	saveEvent: async ({ request, locals: { supabase } }) => {
// 		let formData = await request.formData();
// 		const userId = (await supabase.auth.getUser()).data.user?.id;
// 		const email = (await supabase.auth.getUser()).data.user?.email;
// 		const eventName = formData.get("event_name");
// 		const eventDescription = formData.get("description");


// 		try {
// 			// Get profile if user has one. if not, this returns null. (Should always return one though.)
// 			const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

// 			if (!profile) {
// 				// Make new event
// 				console.log("creating new user");
// 				const { data, error } = await supabase.from("profiles").insert({ id: userId, email, name, organization }).eq("id", userId);
// 			} else {
// 				// Update user
// 				console.log("updating " + profile.email);
// 				const { data, error } = await supabase
// 					.from("profiles")
// 					.update({ organization: organization === "" ? profile.organization : organization, name: name === "" ? profile.name : name })
// 					.eq("id", userId)
// 					.select();
// 			}

// 			console.log(profile);

// 			return {
// 				message: "profile saved",
// 			};
// 		} catch (e) {
// 			return fail(500, {
// 				error: e || "Something went wrong.",
// 			});
// 		}
// 	},
// 	sendEmail: async ({request}) => {
//         const data = await request.formData();
// 		const message = data.get('message');
    

// 	},
// } satisfies Actions;



// Action for creating event that the modal will call
// ?/createEvent