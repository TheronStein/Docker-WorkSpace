/* eslint-disable no-undef */
import { createRequestHandler } from "@remix-run/express";
import { installGlobals, createCookieSessionStorage } from "@remix-run/node";
import compression from "compression";
import express from "express";
import morgan from "morgan";
//import https from "https";


// const keyInfo = {
// 	key: process.env.SSL_KEY_PATH,
// 	cert: process.env.SSL_CERT_PATH,
// };

const start = Date.now()

let viteVersion
let remixVersion
if (process.env.NODE_ENV !== 'production') {
  // get the vite version from the vite package.json
  viteVersion = JSON.parse(
    fs.readFileSync('node_modules/vite/package.json'),
  ).version
  remixVersion = JSON.parse(
    fs.readFileSync('node_modules/@remix-run/dev/package.json'),
  ).version
}

installGlobals();

let vite =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then(({ createServer }) =>
        createServer({
          server: {
            middlewareMode: true,
          },
        }),
      )

// const viteDevServer =
//   process.env.NODE_ENV === "production"
//     ? undefined
//     : await import("vite").then(({ createServer }) =>
//       createServer({
//         server: {
//           middlewareMode: true,
//         },
//       }),
//     )

const app = express();

// handle asset requests
if (vite) {
  app.use(vite.middlewares)
} else {
  // add morgan here for production only
  // dev uses morgan plugin, otherwise it spams the console with HMR requests
  app.use(morgan('tiny'))
  app.use(
    '/assets',
    express.static('build/client/assets', { immutable: true, maxAge: '1y' }),
  )
}
app.use(express.static('build/client', { maxAge: '1h' }))

// handle SSR requests
app.all(
  '*',
  createRequestHandler({
    build: vite
      ? () => vite.ssrLoadModule('virtual:remix/server-build')
      : await import('../build/server/index.js'),
  }),
)

const port = 3000
app.listen(port, '0.0.0.0', () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('http://localhost:' + port)
  } else {
    // since we're using a custom server, emulate what vite dev server prints

    const elapsed = Date.now() - start

    console.log(
      `  ${chalk.greenBright.bold('VITE')} ${chalk.green(
        `v${viteVersion}`,
      )} ${chalk.blueBright.bold('Remix')} ${chalk.blue(
        `v${remixVersion}`,
      )} ready in ${chalk.bold(elapsed)} ms`,
    )
    console.log()
    console.log(
      `  ${chalk.greenBright.bold('➜')}  ${chalk.bold('Local:')}   ${chalk.cyan(
        'http://localhost:' + port,
      )}`,
    )
    console.log()
  }
})


// const remixHandler = createRequestHandler({
//   build: viteDevServer
//     ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
//     : await import("./build/server/index.js"),
// });

// app.use(compression());

// /http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
// app.disable("x-powered-by");


//  handle asset requests
// if (viteDevServer) {
// 	app.use(viteDevServer.middlewares);
// } else {
// 	 Vite fingerprints its assets so we can cache forever.
// 	app.use(
// 		"/assets",
// 		express.static("build/client/assets", { immutable: true, maxAge: "1y" })
// 	);
// }

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
// app.use(express.static("build/client", { maxAge: "1h" }));
// app.use(morgan("tiny"));
// handle SSR requests
// app.all("*", remixHandler);

// app.listen(port, () =>
//   console.log(`Express server listening at http://localhost:${port}`)
// );

// https.createServer(keyInfo, (req, res) => {
// 	res.writeHead(200);
// 	res.end("Server is running on port 443");
// }).listen(port, () =>
// 	console.log(`Express server listening at https://localhost:${port}`)
// );