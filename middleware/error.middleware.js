import BaseError from "../errors/base.error.js"

export default function (err, req, res, next) {
	if (err instanceof BaseError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors })
	}

	return res.status(500).json({ message: 'Server error' })
}