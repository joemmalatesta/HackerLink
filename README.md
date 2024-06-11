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
- Go over user story (actually think about what this is)
- Class diagram :( 
- Verify auth on each page
- Design pages (learn figma finally?)
- Store current color scheme in cookies like [Skeleton](https://www.skeleton.dev/docs/get-started) does and use it throughout the website.
- Maybe make a separate layout group (event) once one is selected.


### Issues
- Right now my [event] slug sometimes redirects to favicon.png and messes up the routing. see [issue](https://github.com/sveltejs/kit/issues/3748)
- I have no idea how to setup this DB...
- [form components](https://tailwindcss-forms.vercel.app/)
- If the form ends with the word "form" it fucks up the routing..
