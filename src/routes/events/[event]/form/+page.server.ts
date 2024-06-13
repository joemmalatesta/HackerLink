import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, json, redirect } from "@sveltejs/kit";
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
		// Check if current Id has any responses connected with it. If it does, add it to old Id's

		// First add current Id to old Id's
		
	},
	publish: async ({ cookies, request, locals: { supabase } }) => {
		let formData = await request.formData();
		let questions: any = formData.get('questions')
		questions = JSON.parse(String(questions)) as Question[]
		let eventId = formData.get('eventId') as string
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		// Get current form data, compare if there is anything to update even...
		const { data: getQuestions, error: selectError } = await supabase
				   .from("events")
				   .select("formQuestions, currentFormId")
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", userId)
		if (!getQuestions) throw new Error(selectError.message)
		let currentFormQuestions = getQuestions[0].formQuestions
		let currentFormId = getQuestions[0].currentFormId
		// If they are the same, no need to go through and publish
		if (JSON.stringify(currentFormQuestions) == JSON.stringify(questions)) return { error: "No changes to publish"}


		// Before changing question data, check first if there are any responses tied to the current ID.
		const { data: responses, error: responsesError } = await supabase
		.from('responses').select("*").eq("formId", getQuestions[0].currentFormId)
		if (responsesError) throw new Error(responsesError.message)
		// If there is data in responses, add current ID to old Ids, otherwise just overwrite it.
		if (responses.length > 0){
			await appendOldFormId(userId!, eventId, supabase)
		}

		
		// With old form ID added to the history, feel free to overwrite the questions and the formId
		const { data: insertData, error: insertError } = await supabase
				   .from("events")
				   .update([{formQuestions: questions, currentFormId: crypto.randomUUID}])
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", userId)
		if (insertError) throw new Error(insertError.message)
		console.log('published form for event ' + eventId)
		return {
			success: "Published form successfully"
		}

		
		
	   



	}
} satisfies Actions;





function arraysEqual(arr1: Question[], arr2: Question[]) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i].id !== arr2[i].id) return false;
		if (arr1[i].title !== arr2[i].title) return false;
		if (arr1[i].type !== arr2[i].type) return false;
		if (arr1[i].options !== arr2[i].options) return false;
	}
	return true;
}


async function appendOldFormId(userId: string, eventId: string, supabase: SupabaseClient) {
	const { data, error } = await supabase
				   .from("events")
				   .select('pastFormIds, currentFormId')
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", userId)
	if (error) throw new Error(error.message)
	let newIdArray = data[0].pastFormIds.push(data[0].currentFormId)
	console.log(newIdArray)
	const { data: updateData, error: updateError } = await supabase
				   .from("events")
				   .update([{pastFormIds: newIdArray}])
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", userId)
	if (updateError) throw new Error(updateError?.message)
	console.log('Updated form Ids for '+ eventId)
	return 'success'
}