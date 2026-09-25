import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BF9z_JDW.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getMarketSnapshot_createServerFn_handler = createServerRpc({
	id: "52b584fb1f45afb59b233aa0a8411366524da992d053cd083f54732a5f68bdfc",
	name: "getMarketSnapshot",
	filename: "src/lib/market/api.ts"
}, (opts) => getMarketSnapshot.__executeServer(opts));
var getMarketSnapshot = createServerFn({ method: "POST" }).handler(getMarketSnapshot_createServerFn_handler, async () => {
	const { buildSnapshot } = await import("./snapshot.server-lqDzKJzd.mjs");
	return buildSnapshot();
});
//#endregion
export { getMarketSnapshot_createServerFn_handler };
