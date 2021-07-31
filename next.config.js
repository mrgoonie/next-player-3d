const path = require("path");
const framework = require("./diginext.json");
const withTM = require("next-transpile-modules")([
	// "react-spring",
	// "drei",
	"three",
	// "three-bmfont-text",
	// "postProcessing"
]);

let appBasePath = "";
let isEnabledCDN = false;

if (process.env.NEXT_PUBLIC_ENV == "production") {
	isEnabledCDN = framework.cdn.prod;
} else if (process.env.NEXT_PUBLIC_ENV == "staging") {
	isEnabledCDN = framework.cdn.staging;
	if (framework.domain.staging.length == 0) {
		appBasePath = process.env.NEXT_PUBLIC_BASE_PATH
			? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
			: `/${framework.projectSlug}`;
	}
} else if (process.env.NEXT_PUBLIC_ENV == "development") {
	isEnabledCDN = framework.cdn.dev;
	if (process.env.NEXT_PUBLIC_BASE_PATH) appBasePath = `/${process.env.NEXT_PUBLIC_BASE_PATH}`;
} else {
	isEnabledCDN = false;
}

console.log("process.env.NEXT_PUBLIC_ENV", process.env.NEXT_PUBLIC_ENV);
console.log("process.env.NEXT_PUBLIC_BASE_PATH", process.env.NEXT_PUBLIC_BASE_PATH);
console.log("process.env.NEXT_PUBLIC_BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);
console.log("process.env.NEXT_PUBLIC_API_BASE_PATH", process.env.NEXT_PUBLIC_API_BASE_PATH);
console.log("process.env.NEXT_PUBLIC_CDN_BASE_PATH", process.env.NEXT_PUBLIC_CDN_BASE_PATH);

let nextConfig = {
	// assetPrefix: isEnabledCDN ? process.env.NEXT_PUBLIC_CDN_BASE_PATH : "",
	basePath: appBasePath,
	webpack(config, { dev, isServer }) {
		const originalEntry = config.entry;

		// config.resolve.modules.push(path.resolve('./'))

		config.entry = async () => {
			const entries = await originalEntry();

			// if (entries["main.js"] && !entries["main.js"].includes("./polyfills.js")) {
			//   entries["main.js"].unshift("./polyfills.js");
			// }

			return entries;
		};

		// for reading shader files:
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag)$/,
			exclude: /node_modules/,
			use: ["raw-loader", "glslify-loader"],
		});

		return config;
	},
};

module.exports = withTM(nextConfig);
