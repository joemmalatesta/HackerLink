import type { Question } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, fail, json, redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { supabase }, params }) => {
	let slug = params.formSlug;
	console.log(slug);
	const { data, error: err } = await supabase.from("events").select("formQuestions").eq("slug", slug);
	console.log(data)
	// 404 if no data found.
	if (!data) error(404, {
		message: 'form not found'
	})
	const questions = data[0].formQuestions;
	return { questions };
};
