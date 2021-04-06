const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV);
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
	//部署应用包时的基本 URL
	publicPath: './',
	//当运行 vue-cli-service build 时生成的生产环境构建文件的目录
	outputDir: 'dist',
	//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
	assetsDir: 'assets',
	// eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
	lintOnSave: true,
	//是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
	runtimeCompiler: true,
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
		extract: IS_PROD,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			scss: {
				// 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
				prependData: `
					@import "@/styles/variables.scss";
					@import "@/styles/mixins.scss";
					@import "@/styles/function.scss";
					$src: "${process.env.VUE_APP_OSS_SRC}";
					`
			},
			postcss: {
				plugins: [
				require('postcss-pxtorem')({
					"rootValue": 37.5, // 设计稿宽度的1/10
					"unitPrecision": 5, //小数位
					"minPixelValue": 1, //转换的最小单位
					"selectorBlackList": [], //忽略的样式, 正则
					"propList": ["*"] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部，正则
				})
				]
			}
		},
		// 启用 CSS modules for all css / pre-processor files.
		modules: false
	},
	// webpack-dev-server 相关配置
	devServer: { // 设置代理
		hot: true, //热加载
		host: '0.0.0.0', //ip地址
		port: 8088, //端口
		https: false, //false关闭https，true为开启
		open: false, //自动打开浏览器
		proxy: {
			'/socket.io': { //本地
				target: 'http://localhost:3000',
				// 如果要代理 websockets
				// ws: true,
				changeOrigin: true
			},
			'/k': { //本地
				target: 'http://127.0.0.1:7001',
				// 如果要代理 websockets
				// ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/k': '/k' 
				}
			}
		}
	},
	chainWebpack: config => {
		// 修复HMR
		config.resolve.symlinks(true);
		config.resolve.alias
			.set('@', resolve('src'));
		if (IS_PROD) {
			config.module
				.rule("images")
				.use("image-webpack-loader")
				.loader("image-webpack-loader")
				.options({
					mozjpeg: { progressive: true, quality: 65 },
					optipng: { enabled: false },
					pngquant: { quality: [0.65, 0.9], speed: 4 },
					gifsicle: { interlaced: false }
					// webp: { quality: 75 }
				});
		}
	},
  	configureWebpack: (config) => {
		// config.plugins.push(
		// 	new SkeletonWebpackPlugin({
		// 		webpackConfig: {
		// 			entry: {
		// 				app: path.join(__dirname, './src/common/entry-skeleton.js'),
		// 			},
		// 		},
		// 		minimize: true,
		// 		quiet: true,
		// 		router: {
		// 			mode: 'hash',
		// 			routes: [
		// 				{ path: '/', skeletonId: 'skeleton1' },
		// 				{ path: '/about', skeletonId: 'skeleton2' },
		// 			],
		// 		},
		// 	})
		// )
		// if (process.env.NODE_ENV === 'production') {
    	// 	config.plugins.push(new BundleAnalyzerPlugin())
		// 	config.plugins.push(
		// 		new CompressionPlugin({
		// 			// gzip压缩配置
		// 			test: /\.js$|\.html$|\.css/, // 匹配文件名
		// 			threshold: 10240, // 对超过10kb的数据进行压缩
		// 			deleteOriginalAssets: false // 是否删除原文件
		// 		})
		// 	)
		// }
	},
	pluginOptions: { // 第三方插件配置
		// ...
	}
}