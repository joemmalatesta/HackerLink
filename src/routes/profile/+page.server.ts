import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { Action } from "./$types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	// Make sure theres a mf logged in...
	if (!session) redirect(307, "/auth");
	try {
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
		return { session, organization: profile.organization, name: profile.name };
	} catch (error) {
		return fail(500, {
			error: "No profile found...",
		});
	}
};

export const actions = {
	saveProfile: async ({ request, locals: { supabase } }) => {
		// Either update or make a new profile
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		const organization = formData.get("organization");
		const name = formData.get("name");

		try {
			// Get profile if user has one. if not, this returns null. (Should always return one though.)
			const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

			if (!profile) {
				// Make new user
				console.log("creating new user");
				const { data, error } = await supabase.from("profiles").insert({ id: userId, email, name, organization }).eq("id", userId);
			} else {
				// Update user
				console.log("updating " + profile.email);
				const { data, error } = await supabase
					.from("profiles")
					.update({ organization: organization === "" ? profile.organization : organization, name: name === "" ? profile.name : name })
					.eq("id", userId)
					.select();
			}

			console.log(profile);

			return {
				message: "profile saved",
			};
		} catch (e) {
			return fail(500, {
				error: e || "Something went wrong.",
			});
		}
	},
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		redirect(303, "/");
	},
} satisfies Actions;

// Some bull about changing nickname with just session. Leaving it here for reference

// update: async ({ request, locals: { supabase } }) => {
//   const formData = await request.formData()
//   const nickname = formData.get('nickname') as string

//   if (!nickname) {
//     return fail(400, {
//       error: 'Please enter a nickname.',
//       data: { nickname: '' }
//     })
//   }

//   const { error } = await supabase.auth.updateUser({
//     data: { nickname }
//   })

//   if (error)
//     return fail(error.status ?? 400, {
//       error: error.message,
//       data: { nickname }
//     })

//   /* Refresh tokens, so we can display the new nickname. */
//   await supabase.auth.refreshSession()
// },
// delete: async ({ locals: { supabase } }) => {
//   const { error } = await supabase.auth.updateUser({
//     data: { nickname: null }
//   })

//   if (error)
//     return fail(error.status ?? 400, {
//       error: error.message,
//       data: { nickname: '' }
//     })

//   /* Refresh tokens, so we can display the new nickname. */
//   await supabase.auth.refreshSession()
// },
