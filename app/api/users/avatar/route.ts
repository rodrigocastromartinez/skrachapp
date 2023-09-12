import { NextRequest, NextResponse } from "next/server"
import handleRequest from "../../handlers/handleRequest"
import { extractUserId } from "../../handlers/extractUserId"
import { updateUserAvatar } from "../../../logic"

export async function PATCH(req: NextRequest) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const body = await req.text()

        const { avatar } = JSON.parse(body)

        await updateUserAvatar(userId, avatar)

        return NextResponse.json({message: 'avatar updated'}, {status: 200})
    })
}