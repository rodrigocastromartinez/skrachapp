import retrieveUserProjects from "../../../logic/retrieveUserProjects"
import handleRequest from "../../handlers/handleRequest"
import { extractUserId } from "../../handlers/extractUserId"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const projects = await retrieveUserProjects(userId)
    
        return NextResponse.json(projects)
    })
}

