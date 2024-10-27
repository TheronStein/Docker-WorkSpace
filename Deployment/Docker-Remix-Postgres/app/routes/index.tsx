import type { MetaFunction } from "@remix-run/node";
import style from "../styles/index.module.css";

export const meta: MetaFunction = () => {
	return [
		{ title: "[RAMPAGE] DOOM servers" },
		{ name: "OS Multiplayer Doom Community", content: "Welcome to [RAMPAGE]" },
	];
};

export default function Index() {
	return (
		<div className={style.content}>
			<div className={style.pageHeader}>
				<img className={style.soon} src="/assets/images/words/soon.png" />
			</div>
			<div className={style.links}>
				<ul>
					<li>
						<a className={style.wads} ><img src="/assets/images/words/wads.png" /></a>
					</li>
					<li>
						<a className={style.doomLink} href="https://discord.com/invite/WjwE27NwBm"><img src="/assets/images/words/discord.png" /></a>
					</li>
					<li>
						<a className={style.doomLink} ><img src="/assets/images/words/servers.png" /></a>
					</li>
					<li>
						<a className={style.doomLink} ><img src="/assets/images/words/matches.png" /></a>
					</li>
					<li>
						<a className={style.doomLink} ><img src="/assets/images/words/leagues.png" /></a>
					</li>
				</ul>
			</div>
		</div>
	);
}
