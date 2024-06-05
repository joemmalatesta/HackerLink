/**
 * Auth validation happens in hooks.server.ts, so there's
 * no need to check anything here. Plus, we aren't returning 
 * server data to the /app page; so, this file only exists 
 * to trigger a server call for client-side routing, to check authentication.
 * 
 * If you have a one-off situation for authentication, 
 * or you'd rather be more explicit, check for a session and redirect.
 * 
 * import { redirect } from '@sveltejs/kit'
 * 
 * export const load = async ({ locals: { getSession } }) => {
 *  const session = await getSession()
 *  if (!session) redirect(307, '/auth')
 * }
 * 
 */

import { Resend } from 'resend';
import { RESEND_KEY } from '$env/static/private';
import type { Actions } from "./$types";
export const actions = {
  createNewForm: async ({request}) => {
    const data = await request.formData();

  },
	sendEmail: async ({request}) => {
        const data = await request.formData();
		const message = data.get('message');
     

const resend = new Resend(RESEND_KEY);

// Via resend docs https://resend.com/docs/send-with-nodejs
(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Org Name <onboarding@resend.dev>',
    to: ['joemmalatesta@gmail.com'],
    subject: 'Hello World',
    html: `${message}`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();

	},
} satisfies Actions;



// Action for creating event that the modal will call
// ?/createEvent