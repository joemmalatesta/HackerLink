import type { Question } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, fail, json, redirect, type Action, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { supabase }, params }) => {
	let slug = params.formSlug;
	console.log(slug);
	const { data, error: err } = await supabase.from("events").select("formQuestions").eq("slug", slug);
	// 404 if no data found.
	if (!data) error(404, {
		message: 'form not found'
	})
	const questions = data[0].formQuestions;
	return { questions };
};


export const actions = {
	// Either create new or update event
	submitResponse: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData()
		}} satisfies Actions