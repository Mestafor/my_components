module.exports = {
	plugins: {
		//'postcss-inline-comment'       : {},
		// 'postcss-strip-inline-comments': {},
		//'postcss-simple-vars'          : {},
		//'postcss-sassy-import'         : {},
		//'postcss-sassy-mixins'         : {},
		//'postcss-import': {},
		// 'postcss-nested'               : {},
		//'postcss-for-var'              : {},
		//'postcss-for'                  : {},
		//'postcss-mixins'               : {},
		//'postcss-sass-mixins'          : {},
		//'postcss-include'              : {},
		'cssnano': {
			zindex: false
		},
		'postcss-cssnext'              : {
			browsers: [ 'last 2 versions', '> 5%' ],
		},
	},
};