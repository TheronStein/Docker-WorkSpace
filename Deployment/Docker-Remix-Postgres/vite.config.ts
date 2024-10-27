import { vitePlugin as remix } from "@remix-run/dev";
import { flatRoutes } from 'remix-flat-routes'
import { installGlobals } from "@remix-run/node";
import { defineConfig  } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
//import { routes } from "./remix/config";
// import { fs } from "fs";

const MODE = process.env.NODE_ENV

// const key = fs.readFileSync(import.meta.env.VITE_SRV_KEY_PATH);
// const cert = fs.readFileSync(import.meta.env.VITE_SRV_SSL_CERT_PATH);
installGlobals();

export default defineConfig({
	server: {
		port: 3001,
		// https:
		//   key: fs.readFileSync(import.meta.env.VITE_SRV_KEY_PATH),
		//   cert: fs.readFileSync(import.meta.env.VITE_SRV_SSL_CERT_PATH)
		//
	},
	plugins: [
		remix({
			ignoredRouteFiles: ['**/*'],
			serverModuleFormat: 'esm',
			routes: async defineRoutes => {
				return flatRoutes('routes', defineRoutes, {
					ignoredRouteFiles: [
						'.*',
						'**/*.css',
						'**/*.test.{js,jsx,ts,tsx}',
						'**/__*.*',
						// This is for server-side utilities you want to colocate next to
						// your routes without making an additional directory.
						// If you need a route that includes "server" or "client" in the
						// filename, use the escape brackets like: my-route.[server].tsx
						'**/*.server.*',
						'**/*.client.*',
					],
				})
			},
		}),
		tsconfigPaths()
	],
});