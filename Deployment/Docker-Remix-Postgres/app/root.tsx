/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react"
import type {
  LinksFunction,
//   LoaderArgs,
//   V2_MetaFunction,
} from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import {
	Form,
	isRouteErrorResponse,
	Links,
	LiveReload,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigation,
	useRouteError,
} from "@remix-run/react";
// import { createEmptyUser, getUser } from "./data";
import style from "./styles/index.module.css";

// import { authenticator } from "~/services"
// import { createCacheHeaders } from "~/utils"

export const action = async () => {
	const user = await createEmptyContact();
	return json({ user });
	return redirect(`/users/${user.id}/edit`);
  };

// export function Layout({ children }: { children: React.ReactNode }) {
export const loader = async () => {
	const contacts = await getUsers();
	return json({ users });
  };

export default function App() {
	const { users } = useLoaderData<typeof loader>();
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div className={style.logoContainer}>
					<img className={style.banner} src={"/assets/images/rampage.png"} alt={"Rampage Doom Servers"} />
				</div>
				<Outlet />;
				{/* {children} */}
				<ScrollRestoration />
				<Scripts />8
			</body>
		</html>
	);
}

// export default function App() {
// 	return 
// }
