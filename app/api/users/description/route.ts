import { NextRequest, NextResponse } from "next/server"
import handleRequest from "../../handlers/handleRequest"
import { extractUserId } from "../../handlers/extractUserId"
import { updateDescription } from "../../../logic"

export async function PATCH(req: NextRequest) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const body = await req.text()

        const { description } = JSON.parse(body)

        await updateDescription(userId, description)

        return NextResponse.json({message: 'description updated'}, {status: 200})
    })
}