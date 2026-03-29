import { getServerSession } from "next-auth";


export async function GET() {
    const session = await getServerSession();
    if(session) {
        return Response.json({
            contents: [
                "Test", "Acc", "Prd"
            ]
        })
    }

   return new Response("Unauthorized", { status: 401 });
}
