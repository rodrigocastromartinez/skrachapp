console.debug('context loaded')

const context = {
    set token(token) {
        if (!token) {
            delete sessionStorage.token

            return
        }

        sessionStorage.token = token
    },
    get token() {
        return sessionStorage.token
    },
    set instrument(instrument) {
        if (!instrument) {
            delete sessionStorage.instrument

            return
        }

        sessionStorage.instrument = instrument
    },
    get instrument() {
        return sessionStorage.instrument
    }
}

export default context