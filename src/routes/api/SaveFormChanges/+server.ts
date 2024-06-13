
import type { Question } from '$lib/types';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ request ,locals: { getSession, supabase } }: {request: any, locals: {getSession: any, supabase: SupabaseClient}}) => {
    //pull eventId from param
    const body = await request.json();
    const eventId = body.eventId;
    const updatedQuestions = JSON.parse(body.updatedQuestions)
    console.log(updatedQuestions)

    console.log(updatedQuestions)
    const session: Session = await getSession()
	 if (!session) redirect(307, '/auth')
	   const { data, error } = await supabase
				   .from("events")
				   .update([{draftFormQuestions: updatedQuestions}])
					// Get by event ID
					.eq('id', eventId)
				   .eq("ownerId", session.user.id)
	   
	   if (error) throw new Error(`${error.message}`)	
        console.log('saved form changes to '+ eventId)
	return json({
success: "Saved Form Changes"
})
	}