console.debug('load retrieve user email')

import context from './context'

/**
 * Retrieves the found user's email
 * @param {string} userId user id
 * @returns {object} user found
 */

export default function retrieveUserEmail(userId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/${userId}/retrieveuseremail`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200){
            const { message } = await res.json()
    
            throw new Error (message)
        }

        return await res.json()
    })()
}