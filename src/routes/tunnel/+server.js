import { json } from "@sveltejs/kit";

const SENTRY_HOST = "o4507307873730560.ingest.us.sentry.io";
const SENTRY_PROJECT_IDS = ["4507352052269056"];
let publicEnvelope = ""

export const POST = async ({ request }) => {
  try {
    const envelope = await request.text();
    const piece = envelope.split("\n")[0];
    const header = JSON.parse(piece);
    const dsn = new URL(header["dsn"]);
    const project_id = dsn.pathname?.replace("/", "");
    publicEnvelope = envelope


    if (dsn.hostname !== SENTRY_HOST) {
      throw new Error(`Invalid sentry hostname: ${dsn.hostname}`);
    }

    if (!project_id || !SENTRY_PROJECT_IDS.includes(project_id)) {
      throw new Error(`Invalid sentry project id: ${project_id}`);
    }

    const upstream_sentry_url = `https://${SENTRY_HOST}/api/${project_id}/envelope/`;
    const response = await fetch(upstream_sentry_url, { method: "POST", body: envelope });
    console.log("ok")



    

    return json({}, { status: 200 });
  } catch (e) {
    console.error("error tunneling to sentry", e);
    return json({ error: "error tunneling to sentry" }, { status: 500 });
  }
};
