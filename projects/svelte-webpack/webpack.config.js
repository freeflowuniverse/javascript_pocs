const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
const fs = require('fs');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const wcs = fs.readdirSync(path.join(__dirname, 'src', '@elements'))
const configs = [];

for (const wc of wcs) {
	configs.push({
		entry: `${__dirname}/src/@elements/${wc}/index.js`,
		resolve: {
			alias: {
				svelte: path.dirname(require.resolve('svelte/package.json'))
			},
			extensions: ['.mjs', '.js', '.ts', '.svelte'],
			mainFields: ['svelte', 'browser', 'module', 'main']
		},
		output: {
			path: path.join(__dirname, 'public', 'build', 'elements'),
			filename: `${wc.toLocaleLowerCase()}.wc.js`,
		},
		module: {
				rules: [
					{
						test: /\.ts$/,
						loader: 'ts-loader',
						exclude: /node_modules/
					},
					{
					test: /\.svelte$/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								dev: !prod
							},
							emitCss: prod,
							hotReload: !prod,
								preprocess: sveltePreprocess({ sourceMap: !prod }),
								customElements: true
						}
					}
				},
				{
					test: /\.css$/,
					use: [
						'css-loader'
					]
				},
				{
					// required to prevent errors from Svelte on Webpack 5+
					test: /node_modules\/svelte\/.*\.mjs$/,
					resolve: {
						fullySpecified: false
					}
				}
			]
		},
		mode,
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css'
			})
		],
		devtool: prod ? false : 'source-map',
		devServer: {
			hot: true
		}
	});
}

configs.push({
	entry: {
		'build/bundle': ['./src/main.ts']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
							preprocess: sveltePreprocess({ sourceMap: !prod })
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	}
});


module.exports = configs;