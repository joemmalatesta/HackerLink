/**
 * Auth validation happens in hooks.server.ts, so there's
 * no need to check anything here. Plus, we aren't returning
 * server data to the /app page; so, this file only exists
 * to trigger a server call for client-side routing, to check authentication.
 *
 * If you have a one-off situation for authentication,
 * or you'd rather be more explicit, check for a session and redirect.
 *
 *
 */
import { redirect } from "@sveltejs/kit";
import type { Event, Question } from "$lib/types";

export const load = async ({ locals: { getSession, supabase } }: { locals: { getSession: any; supabase: SupabaseClient } }) => {
	const session: Session = await getSession();
	if (!session) redirect(307, "/auth");
	const { data, error } = await supabase
		.from("events")
		.select("eventName, description, primaryColor, secondaryColor, textColor, id")
		.eq("ownerId", session.user.id);

	if (!data) throw new Error(`${error.message}`);
	let events: Event[] = data;
	return {
		events,
	};

	// Set cookies to current colors for event selected
	// SUPABASE GET FORM
	// SET COOKIES WITH RETURNED SHIT
};

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
export const actions = {
	// Either create new or update event
	createNewEvent: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		const eventName = formData.get("eventName") as string;
		const description = formData.get("description");
		const primaryColor = formData.get("primaryColor");
		const secondaryColor = formData.get("secondaryColor");
		const textColor = formData.get("textColor");
		if (!eventName) return { error: "no eventName" };
		// Deal with slug being possibly duplicated.
		let slug = slugify(eventName)
		let duplicateSlug: boolean = false


		console.log(`adding new event ${eventName} to ${email} account`);
		// Make new event
		const { data, error } = await supabase
			.from("events")
			.insert([
				{
					owner: email,
					ownerId: userId,
					primaryColor,
					secondaryColor,
					textColor,
					description,
					eventName,
					draftFormQuestions: defaultFormData,
					slug: slugify(eventName),
				},
			])
			.select();
		duplicateSlug = error && error.message.includes("duplicate key") || false
		while (duplicateSlug) {	
			// Append random number until slug is unique
			slug = `${slug}${Math.floor(Math.random() * 10)}`
			console.log(slug)
			const { data, error } = await supabase
			.from("events")
			.insert([
				{
					owner: email,
					ownerId: userId,
					primaryColor,
					secondaryColor,
					textColor,
					description,
					eventName,
					draftFormQuestions: defaultFormData,
					slug,
				},
			])
			.select();
			duplicateSlug = error && error.message.includes("duplicate key") || false
		}
		return {
			success: "Successfully Created Event 🎉",
		};
	},

	updateEvent: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const email = (await supabase.auth.getUser()).data.user?.email;
		const eventName = formData.get("event_name");
		const eventDescription = formData.get("description");
	},

	// Instead of redirecting to a superfluous page, just have the event component call this to set the cookie and handle redirect.
	selectEvent: async ({ cookies, request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		// Fetch form given the username and formID
		if (!session) {
			console.log("no session getting events?");
			redirect(303, "/auth");
		}
		const formData = await request.formData();
		const eventId: string = formData.get("eventId") as string;
		cookies.set("eventId", eventId!, { path: "/" });
		console.log("selected event " + eventId + "cookies set...");
		const { data, error } = await supabase.from("events").select("slug").eq("id", eventId).eq("ownerId", session.user.id);
		if (!data) throw new Error(error.message);
		redirect(303, `/events/${data[0].slug}/form`);
	},
} satisfies Actions;

// Action for creating event that the modal will call
// ?/createEvent

let defaultFormData: Question[] = [
	{
		id: 1,
		type: "shortAnswer",
		required: true,
		title: "Where's the last place you traveled?",
	},
	{
		id: 2,
		type: "paragraph",
		required: true,
		title: "Why did you travel there?",
	},
	{
		id: 3,
		type: "multipleChoice",
		title: "How was the weather?",
		required: true,
		options: ["Sunny", "Rainy", "Snowy", "Overcast"],
	},
];

function slugify(str: string) {
	str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
	str = str.toLowerCase(); // convert string to lowercase
	str = str
		.replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
		.replace(/\s+/g, "-") // replace spaces with hyphens
		.replace(/-+/g, "-"); // remove consecutive hyphens
	return str;
}



