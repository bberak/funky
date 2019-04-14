const co = require('co')
const { static:expressStatic } = require('express')
const { resolve } = require('path')
const { files } = require('../utils')

const staticHandler = (...args) => {
	const folder = args[0]
	let handler = expressStatic(...args)
	handler.type = 'static'
	handler.config = app => co(function *() {
		const folderPath = resolve(folder)
		const _files = (yield files.get(folderPath)) || []
		_files.forEach(f => app.get(f.replace(folderPath,''),handler))
	})
	return handler
}

module.exports = staticHandler


