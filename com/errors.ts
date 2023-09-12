class DuplicityError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return ContentError.name }
}

class ExistenceError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return ExistenceError.name }
}

class AuthError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return AuthError.name }
}

class AuthorizationError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return AuthorizationError.name }
}

export {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError,
    AuthorizationError
}