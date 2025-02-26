export default class BaseError extends Error {
	status
	errors

	constructor(status, message, errors) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new BaseError(401, 'Unauthorized user')
	}

	static BadRequest(message, errors = []) {
		return new BaseError(400, message, errors)
	}
}