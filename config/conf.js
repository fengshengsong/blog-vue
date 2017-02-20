const path = require('path');
const projectRoot = path.resolve(__dirname, '../');

const prodEnv = {
	NODE_ENV: '"production"',
}
const devEnv = {
	NODE_ENV: '"development"',
}

const conf = {
	src:{
		root: projectRoot+'/src/',
	},
	dev:{
		env: devEnv,
		root: projectRoot+'/dev/',
	},
	build:{
		env: prodEnv,
		root: projectRoot+'/build/',
	}
};

module.exports = conf



