import { NextRequest } from "next/server"
import { headers } from 'next/headers'
import { NextApiRequest } from "next"

const jwt = require('jsonwebtoken')

function extractUserId(req: NextRequest | NextApiRequest) {
    const headersList = headers()
        
    const authorization = headersList.get('authorization')!

    const token = authorization.slice(7)

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const { sub: userId } = payload

    return userId
}

export { extractUserId }