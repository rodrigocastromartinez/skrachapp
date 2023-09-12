import { NextRequest, NextResponse } from 'next/server'

import handleRequest from '../../../handlers/handleRequest'
import { extractUserId } from '../../../handlers/extractUserId'
import saveAudio from '../../../../logic/saveAudio'

export async function POST(req: NextRequest, { params }: { params: any}) {    
    try{
        console.log('HELLO WORLD')

        const userId = extractUserId(req)

        const formData = await req.formData()

        console.log(formData)

        const file = formData.get('audio-file')

        // @ts-ignore
        const buffer = Buffer.from(file,'binary')

        console.log(file)
        
        const { projectId, trackId } = params
        
        console.log(projectId)
        console.log(trackId)
        
        if(file instanceof Blob) {
            const url = await saveAudio(userId, projectId, trackId, buffer)

            return NextResponse.json({message: 'data received', url}, {status: 200})
        }

        return NextResponse.json({message: 'file is not a blob'}, {status: 400})
    } catch (error: any) {
        console.log(error.message)
    }
}