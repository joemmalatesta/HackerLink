# HackerLink
an app for hackathon organizers that streamlines the hacker check-in starting from the form submission.

This is my repo for building out components. I'll merge it with my auth repo in due time...

### Stack 
- SvelteKit
- Supabase (Auth/DB)
- Tailwind w/ DaisyUI
- Sentry (App Monitoring)
- Resend (Emails)

### Dependencies 
- [Drag and Drop Svelte package](https://www.npmjs.com/package/svelte-dnd-action)

### Sentry
- I'm realizing this is going to be a cool use case for Sentry. Since I'll be making new sites for each form like TypeForm does, it's going to (I think) be a weird implementation to get Sentry on each form.

### Todo
- Verify auth on each page
- Design pages (learn figma finally?)
- Store current color scheme in cookies like [Skeleton](https://www.skeleton.dev/docs/get-started) does and use it throughout the website.
- Separate layout group for `userFacing)` for those filling out the forms.
- [form components](https://tailwindcss-forms.vercel.app/)
- Change all `throw new Error (error.message)` to `return fail(error.code, error.message)`
- UI Overhaul
- Need to do form validation for profile and event settings. 
- Ensure slug is unique
  - For initial creation, just add random words like vercel until it's unique. 
  - For updating, just return the request with if it's unique or not.




### Issues
- Right now my [event] slug sometimes redirects to favicon.png and messes up the routing. see [issue](https://github.com/sveltejs/kit/issues/3748) - Hasn't really been an issue.
- Close "create new event" modal on click before processing so you don't accidentally add it twice
- Switching after form publishing doesn't work bc we change last url part. (use enhance may help)