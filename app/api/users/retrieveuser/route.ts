import { NextRequest, NextResponse } from "next/server"
import handleRequest from "../../handlers/handleRequest"
import retrieveUser from "../../../logic/retrieveUser"
import { extractUserId } from "../../handlers/extractUserId"

export async function GET(req: NextRequest, res: NextResponse) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const user = await retrieveUser(userId)

        return NextResponse.json(user)
    })
}