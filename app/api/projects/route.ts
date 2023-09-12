import { NextRequest, NextResponse } from 'next/server'
import { createProject } from '../../logic'
import handleRequest from '../handlers/handleRequest'
import { extractUserId } from '../handlers/extractUserId'

export async function POST(req: NextRequest) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const project = await createProject(userId)

        return NextResponse.json({message: 'project created', id: project.id}, {status: 200})
    })
}