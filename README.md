# HackerSight
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
- Svelte Toast :D 

### Sentry


### Todo
- Verify auth on each page
- Design pages (learn figma finally?)
- Store current color scheme in cookies like [Skeleton](https://www.skeleton.dev/docs/get-started) does and use it throughout the website.
- Change all `throw new Error (error.message)` to `return fail(error.code, error.message)`
- UI Overhaul
- Make it responsive (im cooked)
- Add deletion / edit for form questions in (app) without breaking shit
- Redirect Link in settings tab


### Issues
- Right now my [event] slug sometimes redirects to favicon.png and messes up the routing. see [issue](https://github.com/sveltejs/kit/issues/3748) - Hasn't really been an issue.
- Weird side effect, `options` not changing when selecting same type back to back.. `(app)/form/page.svelte`
- Keyboard navigation for `(public)` forms is kind of broken right now.


## Design
- Black and white... That's all.
- Inter