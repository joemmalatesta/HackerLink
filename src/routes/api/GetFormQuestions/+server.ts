
import type { Question } from '$lib/types';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ request ,locals: { getSession, supabase } }: {request: any, locals: {getSession: any, supabase: SupabaseClient}}) => {
    //pull eventId from param
    const body = await request.json();
    const eventId = body.eventId;
    const session: Session = await getSession()
	 if (!session) redirect(307, '/auth')
	   const { data, error } = await supabase
				   .from("events")
				   .select("formQuestions")
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", session.user.id)
	   
	   if (!data) throw new Error(`${error.message}`)	 
		const questions: Question[] = data[0].formQuestions
	   return json(questions)
	}