import type { Question } from "$lib/types"
import type { SupabaseClient } from "@supabase/supabase-js"
import { json } from "@sveltejs/kit"

export const load = async ({ locals: { supabase } }: {locals: {supabase: SupabaseClient}}) => {
	   const { data, error } = await supabase
				   .from("events")
				   .select("formQuestions")
					// Get by event ID
				    .eq('currentFormId', "f59858a8-a998-4af0-bfb3-c2c4e05ec2d1")
	   if (error) throw new Error(`${error.message}`)	 
		const questions = data[0].formQuestions
	   return {questions}
	}
	   