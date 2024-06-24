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
	// Get questions 
	const {formId, questions} = await getFormInfo(supabase, slug)
	// Make sure questions and answers length and titles match
	if (questions.length != answers.length) throw new Error("Questions and Answers do not align")
	
	// Checks to make sure we are submitting answers to equal questions.
	questions.forEach((question) => {
		// TODO: doing -1 seems bad practice. Can I get id from question and compare id?
		// Make sure all required are answered.
		if (question.required && answers[question.id-1].answer) return {error: `Required question ${question.id} was not answered`}
		// If question names aren't same you're probably doing something sneaky.
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
	const {data, error} = await supabase.from('responses').insert({
		response: answers, formId
	})
	if (error) throw new Error(error.message)
}