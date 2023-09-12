import { NextRequest, NextResponse } from 'next/server'
import { handleRequest } from '../../../../../handlers'
import { updateVolume } from '../../../../../../logic'
import { extractUserId } from '../../../../../handlers'

interface RequestBody {
    volume: number,
}

export async function PATCH(req: NextRequest, { params }: { params: any}) {
    return handleRequest( async () => {
        const body = await req.text()
        
        const { volume }: RequestBody = JSON.parse(body)

        const userId = extractUserId(req)

        const { projectId, trackId } = params

        await updateVolume(userId, projectId, trackId, volume)
        
        return NextResponse.json({message: 'url saved'}, {status: 200})
    })
}