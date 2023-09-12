import mongoose from 'mongoose'
import { User } from '../../data/models'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
    
        const user = await User.findById('64bfe0396ebcf5fc441b3f28').lean()
    
        return NextResponse.json(user)
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    } finally {
        await mongoose.disconnect()
    }
}