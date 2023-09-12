import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import { extractUserId } from '../../handlers/extractUserId'
import { deleteProject, updateTitle } from '../../../logic'

interface RequestBody {
    title: string
}

export async function PATCH(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const { projectId } = params

        const body = await req.text()
        
        const { title }: RequestBody = JSON.parse(body)

        await updateTitle(userId, projectId, title)

        return NextResponse.json({message: 'title updated'}, {status: 200})
    })
}

export async function DELETE(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const { projectId } = params

        await deleteProject(userId, projectId)

        return NextResponse.json({message: 'project deleted'}, {status: 200})
    })
}