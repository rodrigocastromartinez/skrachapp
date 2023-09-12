import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '../../../logic'
import jwt from 'jsonwebtoken'
import handleRequest from '../../handlers/handleRequest'

interface RequestBody {
    name: string,
    email: string,
    password: string
}

export async function POST(req: NextRequest) {
    return handleRequest( async () => {
        const body = await req.text()
        
        const { email, password }: RequestBody = JSON.parse(body)

        const userId = await authenticateUser(email, password)

        const payload = { sub: userId }

        const { JWT_SECRET, JWT_EXPIRATION } = process.env

        const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRATION })
        
        return NextResponse.json(token)
    })
}