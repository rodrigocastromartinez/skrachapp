import { NextRequest, NextResponse } from 'next/server'
import { handleRequest } from '../../../../../handlers'
import saveUrl from '../../../../../../logic/saveUrl'
import { extractUserId } from '../../../../../handlers'

interface RequestBody {
    url: string,
}

export async function POST(req: NextRequest, { params }: { params: any}) {
    return handleRequest( async () => {
        const body = await req.text()
        
        const { url }: RequestBody = JSON.parse(body)

        const userId = extractUserId(req)

        const { projectId, trackId } = params

        await saveUrl(userId, projectId, trackId, url)
        
        return NextResponse.json({message: 'url saved'}, {status: 200})
    })
}