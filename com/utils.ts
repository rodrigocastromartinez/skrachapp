import { validateToken } from './validators'

function extractPayload(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
}

function isTokenAlive(token: string) {
    const { iat, exp } = extractPayload(token)
    const now = Date.now() / 1000

    return exp - iat > now - iat
}

function isTokenValid(token: string) {
    try {
        validateToken(token)

        return true
    } catch (error) {
        return false
    }
}

function extractSubFromToken(token: string) {
    const { sub } = extractPayload(token)

    return sub
}

export {
    isTokenAlive,
    isTokenValid,
    extractSubFromToken
}