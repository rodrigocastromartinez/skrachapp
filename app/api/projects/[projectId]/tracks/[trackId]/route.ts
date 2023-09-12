import { NextRequest, NextResponse } from 'next/server'

import handleRequest from '../../../../handlers/handleRequest'
import { extractUserId } from '../../../../handlers/extractUserId'
import saveAudio from '../../../../../logic/saveAudio'
import deleteTrack from '../../../../../logic/deleteTrack'

export async function POST(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const formData = await req.formData()

        console.log(formData)

        const file = formData.get('file')

        const { projectId, trackId } = params
        
        console.log(projectId)
        console.log(trackId)
        
        if(file instanceof Blob) {
            // @ts-ignore
            const url = await saveAudio(userId, projectId, trackId, file)

            return NextResponse.json({message: 'data received', url}, {status: 200})
        }

        return NextResponse.json({message: 'file is not a blob'}, {status: 400})
    })
}

export async function DELETE(req: NextRequest, { params }: { params: any}) {
    return handleRequest(async () => {
        const userId = extractUserId(req)

        const { projectId, trackId } = params
        
        console.log(projectId)

        console.log(trackId)

        const tracks = await deleteTrack(userId, projectId, trackId)
        
        return NextResponse.json({message: 'track deleted', tracks}, {status: 200})
    })
}