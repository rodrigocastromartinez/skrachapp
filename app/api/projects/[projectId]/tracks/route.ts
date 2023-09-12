import { NextRequest, NextResponse } from 'next/server'
import createTrack from '../../../../logic/createTrack'
import handleRequest from '../../../handlers/handleRequest'
import { extractUserId } from '../../../handlers/extractUserId'

export async function POST(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)
        
        const { projectId } = params
        
        const track = await createTrack(userId, projectId)
        
        return NextResponse.json({message: 'track created', id: track.id}, {status: 200})
    })
}