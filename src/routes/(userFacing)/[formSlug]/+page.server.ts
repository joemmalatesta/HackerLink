import type { Question } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { json, redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { supabase }, params }) => {
	let slug = params.formSlug;
	console.log(slug);
	const { data, error } = await supabase.from("events").select("formQuestions").eq("slug", slug);
	console.log(data)
	// 404 if no data found.
	if (error) console.log(error?.message)
	if (error) redirect(303, '/404');
	const questions = data[0].formQuestions;
	return { questions };
};
