import { redirect } from "@sveltejs/kit"

export const load = async ({locals: {getSession}, fetch, params}) => {
    console.log(params)
    
    const session = await getSession()
    // Fetch form given the username and formID
    if (!session){
        console.log('no session getting forms?')
        redirect(303, "/auth")
    }

    console.log(session.user.id)
    return {
        form: params.form
    }
}