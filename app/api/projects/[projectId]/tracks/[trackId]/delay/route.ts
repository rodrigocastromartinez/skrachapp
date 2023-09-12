import { NextRequest, NextResponse } from 'next/server'
import { handleRequest } from '../../../../../handlers'
import saveDelay from '../../../../../../logic/saveDelay'
import { extractUserId } from '../../../../../handlers'

interface RequestBody {
    delay: string,
}

export async function POST(req: NextRequest, { params }: { params: any}) {
    return handleRequest( async () => {
        const body = await req.text()
        
        const { delay }: RequestBody = JSON.parse(body)

        const userId = extractUserId(req)

        const { projectId, trackId } = params

        await saveDelay(userId, projectId, trackId, parseInt(delay))
        
        return NextResponse.json({message: 'url saved'}, {status: 200})
    })
}