import { NextRequest, NextResponse } from 'next/server'
import { handleRequest } from '../../../../handlers'
import addMember from '../../../../../logic/addMember'
import deleteMember from '../../../../../logic/deleteMember'
import { extractUserId } from "../../../../handlers/extractUserId"

interface RequestBody {
    email: string,
}

export async function POST(req: NextRequest, { params }: { params: any}) {
    return handleRequest( async () => {
        const body = await req.text()
        
        const { email }: RequestBody = JSON.parse(body)

        const userId = extractUserId(req)

        const { projectId } = params

        const owners = await addMember(userId, projectId, email)
        
        return NextResponse.json({message: 'user added', owners}, {status: 200})
    })
}

export async function DELETE(req: NextRequest, { params }: { params: any}) {
    return handleRequest( async () => {
        const userId = extractUserId(req)

        const { projectId, newUserId } = params

        const owners = await deleteMember(userId, projectId, newUserId)
        
        return NextResponse.json({message: 'user deleted', owners}, {status: 200})
    })
}