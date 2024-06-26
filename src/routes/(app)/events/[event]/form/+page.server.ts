import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, json, redirect, type ServerLoad } from "@sveltejs/kit";
import type { Question } from "$lib/types";


export const load: ServerLoad = async ({ locals: { getSession, supabase }, cookies }) => {
	const session = await getSession();
	if (!session) redirect(307, "/auth");
	const eventId = cookies.get("eventId");
	const { data, error } = await supabase
		.from("events")
		.select("draftFormQuestions, eventName")
		// Get by event ID
		.eq("id", eventId)
		.eq("ownerId", session.user.id);
	if (!data) throw new Error(`${error.message}`);
	const questions: Question[] = data[0].draftFormQuestions;
	const eventName: string = data[0].eventName;

	return {
		questions,
		eventId,
		eventName,
	};
};

export const actions = {
	publish: async ({ cookies, request, locals: { supabase } }) => {
		console.log('XX')
		const eventId = cookies.get("eventId");
		if (!eventId) throw new Error("no event in cookies??");
		let formData = await request.formData();
		let questions: any = formData.get("questions");
		// Something bad happening with use:enhance causing this to throw JSON error sometimes
		questions = JSON.parse(String(questions)) as Question[];
		const userId = (await supabase.auth.getUser()).data.user?.id;
		// Get current form data, compare if there is anything to update even...
		const { data: getQuestions, error: selectError } = await supabase
			.from("events")
			.select("formQuestions, currentFormId")
			// Get by event ID
			.eq("id", eventId)
			.eq("ownerId", userId);
		if (!getQuestions) throw new Error(selectError.message);
		let currentFormQuestions = getQuestions[0].formQuestions;
		let currentFormId = getQuestions[0].currentFormId;
		// If they are the same, no need to go through and publish
		if (JSON.stringify(currentFormQuestions) == JSON.stringify(questions)) return { error: "No changes to publish" };

		// Before changing question data, check first if there are any responses tied to the current ID.
		const { data: responses, error: responsesError } = await supabase.from("responses").select("*").eq("formId", currentFormId);
		if (responsesError) throw new Error(responsesError.message);
		// If there is data in responses, add current ID to old Ids, otherwise just overwrite it.
		console.log(responses.length + " answers found for this form");
		if (responses.length > 0) {
			console.log("responses found for form " + getQuestions[0].currentFormId);
			await appendOldFormId(userId!, eventId, supabase);
		} else {
			console.log("no responses found...");
		}

		// With old form ID added to the history, feel free to overwrite the questions and the formId
		const { data: insertData, error: insertError } = await supabase
			.from("events")
			.update([{ formQuestions: questions, currentFormId: crypto.randomUUID() }])
			// Get by event ID
			.eq("id", eventId)
			.eq("ownerId", userId);
		if (insertError) throw new Error(insertError.message);
		console.log("published form for event " + eventId);
		return {
			success: "Published form successfully",
		};
	},
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
	console.log("appending to old form");
	const { data, error } = await supabase
		.from("events")
		.select("pastFormIds, currentFormId")
		// Get by event ID
		.eq("id", eventId)
		.eq("ownerId", userId);
	if (error) throw new Error(error.message);
	let pastForms = data[0].pastFormIds ?? [];
	let newIdArray = [...pastForms, data[0].currentFormId];
	console.log(newIdArray);
	const { data: updateData, error: updateError } = await supabase
		.from("events")
		.update([{ pastFormIds: newIdArray }])
		// Get by event ID
		.eq("id", eventId)
		.eq("ownerId", userId);
	if (updateError) throw new Error(updateError?.message);
	console.log("Updated form Ids for " + eventId);
	return "success";
}

async function getFormQuestions(supabase: SupabaseClient, eventId: string, session: Session) {
	const { data, error } = await supabase
		.from("events")
		.select("draftFormQuestions")
		// Get by event ID
		.eq("id", eventId)
		.eq("ownerId", session.user.id);

	if (!data) throw new Error(`${error.message}`);
	const questions: Question[] = data[0].draftFormQuestions;
	return questions;
}
