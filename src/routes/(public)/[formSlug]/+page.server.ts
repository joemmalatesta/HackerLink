import type { Question } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, fail, json, redirect, type Action, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { supabase }, params }) => {
	let slug = params.formSlug;
	console.log(slug);
	const { data, error: err } = await supabase.from("events").select("formQuestions, eventName, redirectUrl").eq("slug", slug);
	// 404 if no data found.
	if (!data) error(404, {
		message: 'form not found'
	})
	const questions = data[0].formQuestions;
	return { questions, eventName: data[0].eventName, redirectUrl: data[0].redirectUrl as string | null };
};