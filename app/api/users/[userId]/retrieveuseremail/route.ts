import { NextRequest, NextResponse } from "next/server"
import handleRequest from "../../../handlers/handleRequest"
import { extractUserId } from "../../../handlers/extractUserId"
import retrieveUserEmail from "../../../../logic/retrieveUserEmail"

export async function GET(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const { userId } = params
        
        const _userId = extractUserId(req)

        const email = await retrieveUserEmail(_userId, userId)

        return NextResponse.json(email)
    })
}