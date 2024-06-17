import type { ServerLoad } from "@sveltejs/kit"

export const load: ServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession()

  return { session }
}