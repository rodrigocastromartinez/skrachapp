import { NextRequest, NextResponse } from 'next/server'
import { handleRequest } from '../../../../../handlers'
import { updateInstrument } from '../../../../../../logic'
import { extractUserId } from '../../../../../handlers'

interface RequestBody {
    instrument: string,
}

export async function PATCH(req: NextRequest, { params }: { params: any}) {
    return handleRequest( async () => {
        const body = await req.text()
        
        const { instrument }: RequestBody = JSON.parse(body)

        const userId = extractUserId(req)

        const { projectId, trackId } = params

        await updateInstrument(userId, projectId, trackId, instrument)
        
        return NextResponse.json({message: 'url saved'}, {status: 200})
    })
}