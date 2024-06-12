import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Question } from "$lib/types";

// export const load = async ({ locals: { getSession, supabase } }: {locals: {getSession: any, supabase: SupabaseClient}}) => {
// 	const session: Session = await getSession()
// 	 if (!session) redirect(307, '/auth')
// 	   const { data, error } = await supabase
// 				   .from("events")
// 				   .select("formQuestions")
// 					// Get by event ID
// 					.eq('id', '')
// 				   .eq("ownerId", session.user.id)
	   
// 	   if (!data) throw new Error(`${error.message}`)	 
// 		const questions: Question[] = data[0].formQuestions
// 	   return {
// 		   questions
// 	   }
// 	}
	   


export const actions = {
	// Either create new or update event
	updateQuestions: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		let questions = formData.get('questions')

		// First add current Id to old Id's
		
	},
} satisfies Actions;