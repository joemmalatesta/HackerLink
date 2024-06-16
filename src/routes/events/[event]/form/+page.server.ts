import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, json, redirect, type ServerLoad } from "@sveltejs/kit";
import type { Question } from "$lib/types";

export const load: ServerLoad = async ({locals: { getSession, supabase }, cookies }) => {
	const session = await getSession()
	 if (!session) redirect(307, '/auth')
	 const eventId = cookies.get('eventId')
	   const { data, error } = await supabase
				   .from("events")
				   .select("draftFormQuestions")
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", session.user.id)
	   if (!data) throw new Error(`${error.message}`)	 
		const questions: Question[] = data[0].draftFormQuestions
		console.log(questions)
	   return {
		   questions, eventId
	   }
	}
	   


export const actions = {
	publish: async ({ cookies, request, locals: { supabase } }) => {
		const eventId = cookies.get('eventId')
		if (!eventId) throw new Error('no event in cookies??')
		let formData = await request.formData();
		let questions: any = formData.get('questions')
		questions = JSON.parse(String(questions)) as Question[]
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


async function getFormQuestions(supabase: SupabaseClient, eventId: string, session: Session) {
	const { data, error } = await supabase
				   .from("events")
				   .select("draftFormQuestions")
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", session.user.id)
	   
	   if (!data) throw new Error(`${error.message}`)	 
		const questions: Question[] = data[0].draftFormQuestions
	return questions
}