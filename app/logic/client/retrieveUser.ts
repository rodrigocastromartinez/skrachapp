console.debug('load retrieve user')

import context from './context'

/**
 * Retrieves the found user
 * @returns {object} user found
 */

export default function retrieveUser() {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/retrieveuser`, {
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