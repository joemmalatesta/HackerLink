import type { Answer, Question } from "$lib/types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { json, redirect } from "@sveltejs/kit";

export const POST = async ({
	request,
	locals: { supabase },
}: {
	request: any;
	locals: { supabase: SupabaseClient };
}) => {
	//pull eventId from param
	const body = await request.json();
	const slug = body.slug;
    const answers = JSON.parse(body.answers) as Answer[]
	console.log(slug, answers)
	// Get questions 
	const {formId, questions} = await getFormInfo(supabase, slug)
	// Make sure questions and answers length and titles match
	if (questions.length != answers.length) throw new Error("Questions and Answers do not align")
	
	questions.forEach((question) => {
		// doing -1 seems bad practice. Can I get id from question and compare id?>
		console.log(question.title, answers[question.id-1].title)
		// Just go answer it. maybe you fucked up..
		if (question.required && answers[question.id-1].answer) return {error: `Required question ${question.id} was not answered`}
		// You did some silly tampering with the questions... or the form ID has changed
		if (question.title != answers[question.id-1].title) throw new Error("Questions and Answers do not align")
	});

	// If it passed, it's safe to say we are saving the right data.
	await submitResponse(supabase, formId, answers)

	console.log("saved responses for " + slug);
	return json({
		success: "saved responses",
	});
};



async function getFormInfo(supabase: SupabaseClient, slug: string) {
    const {data, error} = await supabase.from('events').select("currentFormId, formQuestions").eq("slug", slug)

	if (error) throw new Error(error.message)
	return {formId: data[0].currentFormId, questions: data[0].formQuestions as Question[]}
}

async function submitResponse(supabase: SupabaseClient, formId: string, answers: Answer[]){
	console.log('formId' + formId)
	const {data, error} = await supabase.from('responses').insert({
		response: answers, formId
	})
	if (error) throw new Error(error.message)
	console.log('successfully saved responses to '+ formId)
}