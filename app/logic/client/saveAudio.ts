import context from './context'

/**
 * Saves audio file recorded in firebase
 * @param {FormData} formData data to be uploaded
 * @param {string} projectId project id
 * @param {string} trackId track id
 */

export default function saveAudio(formData: FormData, projectId: string, trackId: string) {
    return (async () => {
        // const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}`, {
        const res = await fetch(`http://localhost:3000/api/helloApi/${projectId}/${trackId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.token}`
            },
            body: formData,
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}