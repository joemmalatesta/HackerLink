import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { Action } from "./$types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export const load = async ({ locals: { getSession } }: { locals: { getSession: any } }) => {
	const session = await getSession();
	// Make sure theres a mf logged in...
	if (!session) redirect(307, "/auth");
	return { session };
};

export const actions = {
	saveProfile: async ({ request, locals: { supabase } }) => {
		// Either update or make a new profile
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		const organization = formData.get("organization");
		const name = formData.get("name");
    

		const { data: user, error } = await supabase.from("profiles").select(userId);

    console.log(user)
		if (user) {
			// Make new user
      console.log('creating new user')
			const { data, error } = await supabase
				.from("profiles")
				.insert({ id: userId, email, name, organization }).eq('id', userId)
				

        console.log(data, error)
		} else {
			// Update user
      const { data, error } = await supabase
  .from('profiles')
  .upsert({ organization, name })
  .eq('id', userId)
  .select()

  console.log('updated user ' + data)
		}

		console.log(user);

		return {
			message: "cool",
		};
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
