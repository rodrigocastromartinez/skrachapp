import { NextRequest, NextResponse } from "next/server"
import handleRequest from "../../../handlers/handleRequest"
import { extractUserId } from "../../../handlers/extractUserId"
import { updatePassword } from "../../../../logic"

export async function PATCH(req: NextRequest) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const body = await req.text()

        const { password, newPassword, newPasswordRepeated } = JSON.parse(body)

        await updatePassword(userId, password, newPassword, newPasswordRepeated)

        return NextResponse.json({message: 'password updated'}, {status: 200})
    })
}