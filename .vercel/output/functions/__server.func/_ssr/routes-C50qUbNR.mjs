import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as ArrowDownRight, i as ArrowUpRight, n as Search, o as Activity, r as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Slot } from "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, i as TooltipTrigger, n as Tooltip, r as TooltipContent } from "./router-Byv-IEeB.mjs";
import { t as GROUP_LABEL } from "./universe-DBQCsBea.mjs";
import { a as Line, c as ResponsiveContainer, i as Area, l as Tooltip$1, n as YAxis, o as CartesianGrid, r as XAxis, s as ReferenceArea, t as ComposedChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C50qUbNR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getMarketSnapshot = createServerFn({ method: "POST" }).handler(createSsrRpc("52b584fb1f45afb59b233aa0a8411366524da992d053cd083f54732a5f68bdfc"));
var ICT = "Asia/Ho_Chi_Minh";
function fmtPct(x, digits = 1) {
	if (!Number.isFinite(x)) return "—";
	return `${x > 0 ? "+" : ""}${(x * 100).toFixed(digits)}%`;
}
function fmtPctPlain(x, digits = 0) {
	if (!Number.isFinite(x)) return "—";
	return `${(x * 100).toFixed(digits)}%`;
}
function fmtPrice(n) {
	if (!Number.isFinite(n)) return "—";
	if (n >= 1e3) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
	if (n >= 1) return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
	if (n >= .01) return n.toFixed(5);
	return n.toPrecision(4);
}
function fmtNum(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return n.toFixed(digits);
}
function fmtVol(n) {
	if (!Number.isFinite(n)) return "—";
	return `${(n * 100).toFixed(0)}%`;
}
function fmtTimeIct(ms) {
	try {
		return new Intl.DateTimeFormat("vi-VN", {
			timeZone: ICT,
			hour: "2-digit",
			minute: "2-digit",
			day: "2-digit",
			month: "2-digit",
			hour12: false
		}).format(new Date(ms));
	} catch {
		return new Date(ms).toISOString();
	}
}
function pnlClass(x) {
	if (x > .0015) return "text-bull";
	if (x < -.0015) return "text-bear";
	return "text-muted";
}
var REGIME_TONE = {
	expansion: {
		bar: "bg-bull",
		text: "text-bull",
		bg: "bg-bull/12"
	},
	euphoria: {
		bar: "bg-warn",
		text: "text-warn",
		bg: "bg-warn/12"
	},
	compression: {
		bar: "bg-accent",
		text: "text-accent",
		bg: "bg-accent/12"
	},
	distribution: {
		bar: "bg-warn",
		text: "text-warn",
		bg: "bg-warn/12"
	},
	transition: {
		bar: "bg-muted",
		text: "text-muted",
		bg: "bg-surface-2"
	},
	risk_off: {
		bar: "bg-bear",
		text: "text-bear",
		bg: "bg-bear/12"
	},
	crisis: {
		bar: "bg-bear",
		text: "text-bear",
		bg: "bg-bear/18"
	}
};
var TREND_LABEL = {
	up: "Uptrend",
	down: "Downtrend",
	range: "Range"
};
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		default: "bg-surface-2 text-muted",
		bull: "bg-bull/15 text-bull",
		bear: "bg-bear/15 text-bear",
		warn: "bg-warn/15 text-warn",
		accent: "bg-accent/15 text-accent"
	} },
	defaultVariants: { tone: "default" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:opacity-90",
			secondary: "bg-surface-2 text-fg shadow-border hover:bg-surface",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			outline: "shadow-border bg-transparent text-fg hover:bg-surface-2"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-surface p-4 shadow-border", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-3 flex flex-col gap-1", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("text-sm font-medium tracking-tight text-fg", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-xs text-muted", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-border placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", className),
		...props
	});
}
function Separator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-px w-full bg-border", className),
		...props
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-surface-2", className),
		...props
	});
}
var FILTERS = [
	{
		id: "all",
		label: "Tất cả"
	},
	{
		id: "up",
		label: "Uptrend"
	},
	{
		id: "down",
		label: "Downtrend"
	},
	{
		id: "l1",
		label: "L1"
	},
	{
		id: "defi",
		label: "DeFi"
	},
	{
		id: "meme",
		label: "Meme"
	}
];
function heatColor(ret) {
	const mag = Math.min(1, Math.abs(ret) / .18);
	return `color-mix(in oklab, ${ret >= 0 ? "var(--color-bull)" : "var(--color-bear)"} ${Math.round(18 + mag * 62)}%, transparent)`;
}
function ScoreMeter({ label, value, hint, bipolar }) {
	const pct = bipolar ? (value + 1) / 2 : value;
	const left = `${Math.round(Math.min(100, Math.max(0, pct * 100)))}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-11 flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tabular text-fg",
					children: bipolar ? fmtNum(value, 2) : fmtPctPlain(value, 0)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-1.5 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 left-0 rounded-full bg-accent",
					style: { width: left }
				})
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: hint })] });
}
function Kpi({ label, value, hint, signed }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-16 flex-col justify-between gap-1 rounded-lg bg-surface-2 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-mono text-base tabular tracking-tight", signed != null ? pnlClass(signed) : "text-fg"),
			children: value
		})]
	});
	if (!hint) return inner;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: inner
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: hint })] });
}
function ChartTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-fg px-2.5 py-2 text-xs text-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-bg/70",
			children: typeof label === "number" ? new Date(label).toLocaleDateString("vi-VN") : label
		}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between gap-4 tabular",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name.includes("%") || p.name.includes("Vol") || p.name.includes("Corr") ? fmtPctPlain(Number(p.value), 0) : fmtNum(Number(p.value), 1) })]
		}, p.name))]
	});
}
function regimeBandFill(id) {
	switch (id) {
		case "expansion": return "color-mix(in oklab, var(--color-bull) 14%, transparent)";
		case "euphoria": return "color-mix(in oklab, var(--color-warn) 16%, transparent)";
		case "compression": return "color-mix(in oklab, var(--color-accent) 10%, transparent)";
		case "distribution": return "color-mix(in oklab, var(--color-warn) 12%, transparent)";
		case "risk_off": return "color-mix(in oklab, var(--color-bear) 14%, transparent)";
		case "crisis": return "color-mix(in oklab, var(--color-bear) 22%, transparent)";
		default: return "transparent";
	}
}
function bandRanges(series) {
	const ranges = [];
	if (!series.t.length) return ranges;
	let start = 0;
	for (let i = 1; i <= series.regime.length; i++) if (i === series.regime.length || series.regime[i] !== series.regime[start]) {
		const id = series.regime[start];
		ranges.push({
			id,
			x1: series.t[start],
			x2: series.t[Math.min(i, series.t.length - 1)]
		});
		start = i;
	}
	return ranges;
}
function DashboardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-36 w-full rounded-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-lg" }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 w-full rounded-xl" })
		]
	});
}
function Loaded({ data }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)({
		key: "chg7d",
		dir: "desc"
	});
	const tone = REGIME_TONE[data.regime.id];
	const chartData = (0, import_react.useMemo)(() => data.series.t.map((t, i) => ({
		t,
		Rổ: data.series.ew[i],
		BTC: data.series.btc[i],
		Breadth: data.series.breadthSma50[i],
		Vol: data.series.vol20[i],
		Corr: data.series.corr20[i]
	})), [data.series]);
	const bands = (0, import_react.useMemo)(() => bandRanges(data.series), [data.series]);
	const coins = (0, import_react.useMemo)(() => {
		const query = q.trim().toUpperCase();
		let rows = data.coins.filter((c) => {
			if (query && !c.ticker.includes(query) && !c.id.includes(query)) return false;
			if (filter === "up") return c.trend === "up";
			if (filter === "down") return c.trend === "down";
			if (filter === "meme" || filter === "defi" || filter === "l1") return c.group === filter;
			return true;
		});
		const { key, dir } = sort;
		rows = [...rows].sort((a, b) => {
			const av = a[key];
			const bv = b[key];
			const an = typeof av === "number" ? av : String(av);
			const bn = typeof bv === "number" ? bv : String(bv);
			if (an < bn) return dir === "asc" ? -1 : 1;
			if (an > bn) return dir === "asc" ? 1 : -1;
			return 0;
		});
		return rows;
	}, [
		data.coins,
		q,
		filter,
		sort
	]);
	function toggleSort(key) {
		setSort((s) => s.key === key ? {
			key,
			dir: s.dir === "desc" ? "asc" : "desc"
		} : {
			key,
			dir: "desc"
		});
	}
	const k = data.kpis;
	const s = data.scores;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 pb-16 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-[0.22em] text-accent uppercase",
							children: "Market state desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-medium tracking-tight text-fg md:text-4xl",
							children: "REGIME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "max-w-xl text-sm text-muted",
							children: [
								"Regime rổ ",
								data.listed,
								"/",
								data.universe,
								" perp USDT — trend, breadth, vol, correlation, Hurst, funding."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular",
							children: [fmtTimeIct(data.asOf), " ICT"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.source })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn("rounded-xl p-5 md:p-6", tone.bg),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-xs font-medium tracking-wide uppercase", tone.text),
								children: data.regime.labelVi
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "default",
								children: data.regime.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "max-w-2xl text-2xl font-medium tracking-tight text-fg md:text-3xl",
							children: data.regime.thesis
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-40 flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "Độ tin cậy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 flex-1 overflow-hidden rounded-full bg-bg/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full", tone.bar),
									style: { width: `${Math.round(data.regime.confidence * 100)}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular",
								children: Math.round(data.regime.confidence * 100)
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMeter, {
							label: "Trend",
							value: s.trend,
							bipolar: true,
							hint: "Composite của % trên SMA, momentum rổ equal-weight và tỷ lệ uptrend."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMeter, {
							label: "Vol percentile",
							value: s.vol,
							hint: "Vol 20 ngày của rổ so với 90 phiên. Cao = stress / euphoria."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMeter, {
							label: "Breadth SMA50",
							value: s.breadth,
							hint: "Tỷ lệ coin đóng cửa trên SMA50. Đo sự đồng thuận, không phải giá BTC đơn lẻ."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMeter, {
							label: "Tương quan",
							value: s.corr,
							hint: "Tương quan cặp trung bình 20D. Cao nghĩa là đa dạng hóa mất tác dụng."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Rổ 1D",
						value: fmtPct(k.ew1d),
						signed: k.ew1d,
						hint: "Equal-weight 1 phiên."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Rổ 7D",
						value: fmtPct(k.ew7d),
						signed: k.ew7d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Rổ 30D",
						value: fmtPct(k.ew30d),
						signed: k.ew30d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "BTC 7D",
						value: fmtPct(k.btc7d),
						signed: k.btc7d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Alt vs BTC 20D",
						value: fmtPct(k.altVsBtc20),
						signed: k.altVsBtc20,
						hint: "Rổ equal-weight trừ BTC — dương = alt season."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Meme vs majors 7D",
						value: fmtPct(k.memeVsMajors7),
						signed: k.memeVsMajors7
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "% trên SMA20",
						value: fmtPctPlain(k.pctAboveSma20)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "% trên SMA50",
						value: fmtPctPlain(k.pctAboveSma50)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "% trên SMA100",
						value: fmtPctPlain(k.pctAboveSma100)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Vol 20D ann.",
						value: fmtVol(k.realizedVol20),
						hint: "Realized vol log-return, annualized 365."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Hurst",
						value: fmtNum(k.hurst, 2),
						hint: ">0.55 xu hướng bền, <0.45 mean-revert."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "ADX TB",
						value: fmtNum(k.adx, 0),
						hint: "<18 range, >25 trend rõ."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Funding 8h",
						value: k.avgFunding == null ? "—" : `${k.avgFunding >= 0 ? "+" : ""}${(k.avgFunding * 100).toFixed(3)}%`,
						hint: "Funding perp trung bình — crowding."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Drawdown 60D",
						value: fmtPct(k.drawdown60),
						signed: k.drawdown60
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Highs / Lows 20D",
						value: `${k.new20Highs} / ${k.new20Lows}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Adv / Dec 1D",
						value: `${k.adv1d} / ${k.dec1d}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Dispersion 7D",
						value: fmtPct(k.dispersion20),
						hint: "Độ lệch chuẩn lợi nhuận 7D giữa các coin. Cao = thị trường chọn lọc."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "% Uptrend",
						value: fmtPctPlain(k.pctUptrend)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-3 md:p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Rổ equal-weight vs BTC · 90D" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Nền màu là regime lịch sử (vol + trend + breadth). Chỉ số gốc = 100." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72 w-full md:h-80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
								data: chartData,
								margin: {
									top: 8,
									right: 8,
									left: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										vertical: false
									}),
									bands.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceArea, {
										x1: b.x1,
										x2: b.x2,
										fill: regimeBandFill(b.id),
										fillOpacity: 1,
										ifOverflow: "hidden"
									}, `${b.id}-${i}`)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "t",
										tickFormatter: (v) => new Date(v).toLocaleDateString("vi-VN", {
											day: "2-digit",
											month: "2-digit"
										}),
										tick: {
											fill: "var(--color-subtle)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										minTickGap: 28
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "var(--color-subtle)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										width: 36
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip$1, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Rổ",
										stroke: "var(--color-accent)",
										fill: "color-mix(in oklab, var(--color-accent) 18%, transparent)",
										strokeWidth: 1.75,
										dot: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "BTC",
										stroke: "var(--color-fg)",
										strokeWidth: 1.25,
										dot: false,
										strokeOpacity: .7
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Playbook" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Hành động phù hợp regime hiện tại — không phải khuyến nghị đầu tư." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-3 text-sm text-fg/90",
						children: data.regime.playbook.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-subtle tabular",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
						}, step))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs tracking-wide text-muted uppercase",
						children: "Drivers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-2 gap-2",
						children: data.regime.drivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md bg-surface-2 px-2.5 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: d.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("font-mono text-xs tabular", d.polarity === "pos" ? "text-bull" : d.polarity === "neg" ? "text-bear" : "text-fg"),
									children: d.value
								})]
							})
						}, d.key))
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkCard, {
						title: "Breadth % SMA50",
						data: chartData,
						dataKey: "Breadth",
						format: (v) => fmtPctPlain(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkCard, {
						title: "Vol percentile",
						data: chartData,
						dataKey: "Vol",
						format: (v) => fmtPctPlain(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkCard, {
						title: "Tương quan 20D",
						data: chartData,
						dataKey: "Corr",
						format: (v) => fmtNum(v, 2)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Heatmap 7D" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Màu theo lợi nhuận 7 ngày. Nhấn để sắp bảng theo coin." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10",
				children: data.coins.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setQ(c.ticker);
						setFilter("all");
					},
					className: "flex min-h-14 flex-col items-start justify-between rounded-md px-2 py-1.5 text-left transition-opacity hover:opacity-90",
					style: { background: heatColor(c.chg7d) },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-fg",
						children: c.ticker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-mono text-xs tabular", pnlClass(c.chg7d)),
						children: fmtPct(c.chg7d, 1)
					})]
				}, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Rổ coin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								coins.length,
								" mã · sort ",
								String(sort.key),
								" ",
								sort.dir
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 md:flex-row md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Tìm ticker",
									className: "pl-9 md:w-56",
									"aria-label": "Tìm ticker"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: filter === f.id ? "default" : "secondary",
									onClick: () => setFilter(f.id),
									children: f.label
								}, f.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[720px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "border-t border-border",
									children: [
										["ticker", "Coin"],
										["price", "Giá"],
										["chg1d", "1D"],
										["chg7d", "7D"],
										["chg30d", "30D"],
										["vsBtc7d", "vs BTC"],
										["rsi14", "RSI"],
										["sma50Dist", "Δ SMA50"],
										["vol20d", "Vol"],
										["beta60", "Beta"],
										["trend", "Trend"],
										["funding", "Fund"]
									].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "min-h-11 text-left",
											onClick: () => toggleSort(key),
											children: label
										})
									}, key))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: coins.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "sticky left-0 bg-surface px-3 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: c.ticker
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-subtle",
												children: GROUP_LABEL[c.group]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5 font-mono text-xs tabular",
										children: fmtPrice(c.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctCell, { v: c.chg1d }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctCell, { v: c.chg7d }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctCell, { v: c.chg30d }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctCell, { v: c.vsBtc7d }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5 font-mono text-xs tabular",
										children: fmtNum(c.rsi14, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctCell, { v: c.sma50Dist }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5 font-mono text-xs tabular",
										children: fmtVol(c.vol20d)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5 font-mono text-xs tabular",
										children: fmtNum(c.beta60, 2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: c.trend === "up" ? "bull" : c.trend === "down" ? "bear" : "default",
											children: TREND_LABEL[c.trend]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5 font-mono text-xs tabular",
										children: c.funding == null ? "—" : `${(c.funding * 100).toFixed(3)}%`
									})
								]
							}, c.id)) })]
						})
					}),
					data.missing.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-4 py-3 text-xs text-subtle",
						children: ["Không có data: ", data.missing.join(", ")]
					}) : null
				]
			})
		]
	});
}
function PctCell({ v }) {
	const up = v > .0015;
	const down = v < -.0015;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: cn("px-3 py-2.5 font-mono text-xs tabular", pnlClass(v)),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-0.5",
			children: [up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" }) : down ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-3" }) : null, fmtPct(v)]
		})
	});
}
function SparkCard({ title, data, dataKey, format }) {
	const last = data.at(-1)?.[dataKey] ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-baseline justify-between px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-sm tabular",
				children: format(last)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposedChart, {
					data,
					margin: {
						top: 4,
						right: 4,
						left: 0,
						bottom: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey,
						stroke: "var(--color-accent)",
						strokeWidth: 1.5,
						dot: false
					})
				})
			})
		})]
	});
}
function Dashboard() {
	const query = useQuery({
		queryKey: ["market-snapshot"],
		queryFn: () => getMarketSnapshot(),
		refetchInterval: 6e4
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center gap-4 px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-8 text-bear" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium",
				children: "Không tải được regime"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: query.error instanceof Error ? query.error.message : "Nguồn giá tạm thời không phản hồi."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => query.refetch(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Thử lại"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loaded, { data: query.data }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "icon",
			variant: "secondary",
			className: "fixed right-4 bottom-4 z-20 shadow-border",
			onClick: () => query.refetch(),
			"aria-label": "Làm mới",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", query.isFetching && "animate-spin") })
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
//#endregion
export { Home as component };
