import dbConnect from '../../data/dbConnect'
import { headers } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'


const handleRequest = async (callback: any) => {
        try {
            await dbConnect()
            const headersList = headers()

            const contentType = headersList.get('Content-Type')
            
            if (contentType !== 'application/json') {
                NextResponse.json({error: 'no application/json header found'}, {status: 400})
                
                return
            }
            
            return await callback()
        } catch(error: any){
            return NextResponse.json({message: error.message}, {status: 500})
        }
}

export default handleRequest