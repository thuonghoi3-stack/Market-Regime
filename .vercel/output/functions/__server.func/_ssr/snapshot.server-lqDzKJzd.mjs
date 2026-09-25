import { a as displayTicker, i as UNIVERSE, n as MAJOR_IDS, o as fundingCandidates, r as MEME_IDS, s as spotCandidates } from "./universe-DBQCsBea.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/snapshot.server-lqDzKJzd.js
function finite(n, fallback = 0) {
	return Number.isFinite(n) ? n : fallback;
}
function mean(xs) {
	if (!xs.length) return 0;
	let s = 0;
	for (const x of xs) s += x;
	return s / xs.length;
}
function stdev(xs, ddof = 1) {
	if (xs.length < 2) return 0;
	const m = mean(xs);
	let v = 0;
	for (const x of xs) v += (x - m) * (x - m);
	return Math.sqrt(v / Math.max(1, xs.length - ddof));
}
function clamp(n, lo, hi) {
	return Math.min(hi, Math.max(lo, n));
}
function tanh(x) {
	if (x > 8) return 1;
	if (x < -8) return -1;
	const e = Math.exp(2 * x);
	return (e - 1) / (e + 1);
}
function logReturns(closes) {
	const r = [];
	for (let i = 1; i < closes.length; i++) {
		const a = closes[i - 1];
		const b = closes[i];
		r.push(a > 0 && b > 0 ? Math.log(b / a) : 0);
	}
	return r;
}
function simpleReturn(closes, bars) {
	if (closes.length <= bars) return 0;
	const prev = closes[closes.length - 1 - bars];
	const last = closes[closes.length - 1];
	if (prev <= 0) return 0;
	return last / prev - 1;
}
function smaAt(values, n) {
	if (values.length < n || n <= 0) return null;
	let s = 0;
	for (let i = values.length - n; i < values.length; i++) s += values[i];
	return s / n;
}
function smaSeries(values, n) {
	const out = Array(values.length).fill(null);
	if (n <= 0) return out;
	let s = 0;
	for (let i = 0; i < values.length; i++) {
		s += values[i];
		if (i >= n) s -= values[i - n];
		if (i >= n - 1) out[i] = s / n;
	}
	return out;
}
function realizedVolAnn(logRets, n = 20) {
	const slice = logRets.slice(-n);
	if (slice.length < 5) return 0;
	return stdev(slice) * Math.sqrt(365);
}
function rollingVolSeries(logRets, n = 20) {
	const out = [];
	for (let i = n; i <= logRets.length; i++) out.push(stdev(logRets.slice(i - n, i)) * Math.sqrt(365));
	return out;
}
function parkinsonAnn(candles, n = 20) {
	const slice = candles.slice(-n);
	if (!slice.length) return 0;
	const factor = 1 / (4 * Math.log(2));
	let s = 0;
	let count = 0;
	for (const c of slice) if (c.h > 0 && c.l > 0) {
		const x = Math.log(c.h / c.l);
		s += x * x;
		count += 1;
	}
	if (!count) return 0;
	return Math.sqrt(factor * s / count) * Math.sqrt(365);
}
function percentileRank(sample, value) {
	if (!sample.length) return .5;
	let count = 0;
	for (const x of sample) if (x <= value) count += 1;
	return count / sample.length;
}
function rsiWilder(closes, n = 14) {
	if (closes.length < n + 1) return 50;
	const changes = [];
	for (let i = 1; i < closes.length; i++) changes.push(closes[i] - closes[i - 1]);
	let avgG = 0;
	let avgL = 0;
	for (let i = 0; i < n; i++) {
		const d = changes[i];
		if (d >= 0) avgG += d;
		else avgL -= d;
	}
	avgG /= n;
	avgL /= n;
	for (let i = n; i < changes.length; i++) {
		const d = changes[i];
		const g = d > 0 ? d : 0;
		const l = d < 0 ? -d : 0;
		avgG = (avgG * (n - 1) + g) / n;
		avgL = (avgL * (n - 1) + l) / n;
	}
	if (avgL === 0) return 100;
	return 100 - 100 / (1 + avgG / avgL);
}
function betaVs(asset, market) {
	const n = Math.min(asset.length, market.length);
	if (n < 12) return 1;
	const a = asset.slice(-n);
	const m = market.slice(-n);
	const ma = mean(a);
	const mm = mean(m);
	let cov = 0;
	let varM = 0;
	for (let i = 0; i < n; i++) {
		cov += (a[i] - ma) * (m[i] - mm);
		varM += (m[i] - mm) * (m[i] - mm);
	}
	return varM < 1e-14 ? 1 : cov / varM;
}
function calcAdx(candles, n = 14) {
	if (candles.length < n + 2) return {
		adx: 0,
		plusDi: 0,
		minusDi: 0
	};
	const tr = [];
	const pdm = [];
	const mdm = [];
	for (let i = 1; i < candles.length; i++) {
		const cur = candles[i];
		const prev = candles[i - 1];
		const highDiff = cur.h - prev.h;
		const lowDiff = prev.l - cur.l;
		tr.push(Math.max(cur.h - cur.l, Math.abs(cur.h - prev.c), Math.abs(cur.l - prev.c)));
		pdm.push(highDiff > lowDiff && highDiff > 0 ? highDiff : 0);
		mdm.push(lowDiff > highDiff && lowDiff > 0 ? lowDiff : 0);
	}
	const smooth = (arr) => {
		const out = [];
		let s = 0;
		for (let i = 0; i < arr.length; i++) if (i < n) {
			s += arr[i];
			if (i === n - 1) out.push(s);
		} else {
			s = s - s / n + arr[i];
			out.push(s);
		}
		return out;
	};
	const str = smooth(tr);
	const sp = smooth(pdm);
	const sm = smooth(mdm);
	const dx = [];
	const plus = [];
	const minus = [];
	for (let i = 0; i < str.length; i++) {
		const pdi = str[i] === 0 ? 0 : 100 * sp[i] / str[i];
		const mdi = str[i] === 0 ? 0 : 100 * sm[i] / str[i];
		plus.push(pdi);
		minus.push(mdi);
		const den = pdi + mdi;
		dx.push(den === 0 ? 0 : 100 * Math.abs(pdi - mdi) / den);
	}
	if (dx.length < n) return {
		adx: 0,
		plusDi: plus.at(-1) ?? 0,
		minusDi: minus.at(-1) ?? 0
	};
	let adx = dx.slice(0, n).reduce((a, b) => a + b, 0) / n;
	for (let i = n; i < dx.length; i++) adx = (adx * (n - 1) + dx[i]) / n;
	return {
		adx: finite(adx),
		plusDi: finite(plus.at(-1) ?? 0),
		minusDi: finite(minus.at(-1) ?? 0)
	};
}
function slope(xs, ys) {
	const n = xs.length;
	const mx = mean(xs);
	const my = mean(ys);
	let num = 0;
	let den = 0;
	for (let i = 0; i < n; i++) {
		num += (xs[i] - mx) * (ys[i] - my);
		den += (xs[i] - mx) * (xs[i] - mx);
	}
	return den === 0 ? 0 : num / den;
}
/** Hurst exponent via rescaled range. >0.55 persistent, <0.45 mean-reverting. */
function hurstExponent(returns) {
	const n = returns.length;
	if (n < 32) return .5;
	const sizes = [
		8,
		16,
		32,
		64
	].filter((s) => s * 2 <= n);
	const xs = [];
	const ys = [];
	for (const size of sizes) {
		const rsVals = [];
		for (let start = 0; start + size <= n; start += size) {
			const slice = returns.slice(start, start + size);
			const m = mean(slice);
			let cum = 0;
			let minC = 0;
			let maxC = 0;
			let varS = 0;
			for (const v of slice) {
				const adj = v - m;
				cum += adj;
				varS += adj * adj;
				if (cum < minC) minC = cum;
				if (cum > maxC) maxC = cum;
			}
			const R = maxC - minC;
			const S = Math.sqrt(varS / size);
			if (S > 1e-12) rsVals.push(R / S);
		}
		if (rsVals.length) {
			xs.push(Math.log(size));
			ys.push(Math.log(mean(rsVals)));
		}
	}
	if (xs.length < 2) return .5;
	return clamp(slope(xs, ys), 0, 1);
}
function meanPairwiseCorr(matrix, start, len) {
	const n = matrix.length;
	if (n < 2 || len < 5) return 0;
	const means = new Array(n).fill(0);
	const stds = new Array(n).fill(0);
	for (let i = 0; i < n; i++) {
		const row = matrix[i];
		let s = 0;
		for (let t = start; t < start + len; t++) s += row[t] ?? 0;
		means[i] = s / len;
		let v = 0;
		for (let t = start; t < start + len; t++) {
			const d = (row[t] ?? 0) - means[i];
			v += d * d;
		}
		stds[i] = Math.sqrt(v);
	}
	let sum = 0;
	let count = 0;
	for (let i = 0; i < n; i++) {
		if (stds[i] < 1e-12) continue;
		const ri = matrix[i];
		for (let j = i + 1; j < n; j++) {
			if (stds[j] < 1e-12) continue;
			const rj = matrix[j];
			let cov = 0;
			for (let t = start; t < start + len; t++) cov += ((ri[t] ?? 0) - means[i]) * ((rj[t] ?? 0) - means[j]);
			sum += cov / (stds[i] * stds[j]);
			count += 1;
		}
	}
	return count ? sum / count : 0;
}
function maxDrawdown(closes, lookback) {
	const slice = closes.slice(-lookback);
	if (slice.length < 2) return 0;
	let peak = slice[0];
	let dd = 0;
	for (const x of slice) {
		if (x > peak) peak = x;
		if (peak > 0) dd = Math.min(dd, x / peak - 1);
	}
	return dd;
}
function alignCloses(series) {
	if (!series.length) return {
		t: [],
		closes: []
	};
	const maps = series.map((s) => {
		const m = /* @__PURE__ */ new Map();
		for (const bar of s) m.set(bar.t, bar.c);
		return m;
	});
	const counts = /* @__PURE__ */ new Map();
	for (const m of maps) for (const t of m.keys()) counts.set(t, (counts.get(t) ?? 0) + 1);
	const need = Math.max(1, Math.floor(series.length * .7));
	const t = [...counts.entries()].filter(([, n]) => n >= need).map(([ts]) => ts).sort((a, b) => a - b);
	const closes = maps.map((m) => {
		const row = [];
		let last = NaN;
		for (const ts of t) {
			const v = m.get(ts);
			if (v != null) {
				last = v;
				row.push(v);
			} else row.push(last);
		}
		return row;
	});
	let start = 0;
	outer: for (let i = 0; i < t.length; i++) {
		for (const row of closes) if (!Number.isFinite(row[i])) {
			start = i + 1;
			continue outer;
		}
		break;
	}
	return {
		t: t.slice(start),
		closes: closes.map((row) => row.slice(start))
	};
}
function band(value, lo, hi) {
	if (hi === lo) return 0;
	return clamp((value - lo) / (hi - lo), 0, 1);
}
function buildScores(kpis) {
	const trend = clamp(.28 * tanh((kpis.pctAboveSma20 - .5) * 2.4) + .22 * tanh((kpis.pctAboveSma50 - .5) * 2.2) + .12 * tanh((kpis.pctAboveSma100 - .5) * 2) + .2 * tanh(kpis.ew20 / .12) + .1 * (2 * kpis.pctUptrend - 1) + .08 * tanh(kpis.ew7d / .06), -1, 1);
	const crowding = clamp(.55 * tanh((kpis.avgFunding ?? 0) / 25e-5) + .25 * tanh((kpis.pctRsiHot - kpis.pctRsiCold) * 2) + .2 * tanh(kpis.ew7d / .08), -1, 1);
	return {
		trend: finite(trend),
		vol: clamp(kpis.volPercentile, 0, 1),
		breadth: clamp(kpis.pctAboveSma50, 0, 1),
		corr: clamp(kpis.avgCorr20, 0, 1),
		crowding: finite(crowding)
	};
}
function classify(scores, kpis) {
	const { trend, vol, breadth, corr, crowding } = scores;
	const dd = kpis.drawdown60;
	const adx = kpis.adx;
	const highLow = kpis.new20Highs + kpis.new20Lows === 0 ? 0 : (kpis.new20Highs - kpis.new20Lows) / Math.max(1, kpis.new20Highs + kpis.new20Lows);
	const crisisScore = .35 * band(vol, .7, .95) + .25 * band(-trend, .15, .7) + .2 * band(corr, .48, .75) + .2 * band(-dd, .08, .22);
	const expansionScore = .34 * band(trend, .2, .75) + .22 * band(breadth, .52, .82) + .18 * (1 - band(vol, .45, .8)) + .14 * band(highLow, 0, .7) + .12 * band(adx, 16, 32);
	const euphoriaScore = .3 * band(trend, .18, .7) + .28 * band(vol, .52, .88) + .22 * band(crowding, .15, .75) + .2 * band(kpis.pctRsiHot, .18, .45);
	const compressionScore = .32 * (1 - Math.abs(trend)) + .28 * (1 - band(vol, .28, .55)) + .2 * band(20 - adx, 0, 10) + .2 * (1 - band(Math.abs(highLow), .25, .8));
	const riskOffScore = .4 * band(-trend, .2, .75) + .22 * band(1 - breadth, .45, .85) + .2 * band(-highLow, 0, .7) + .18 * band(adx, 16, 34);
	const distributionScore = .28 * band(trend, -.05, .35) + .26 * band(.55 - breadth, 0, .3) + .22 * band(-dd, -.02, .08) + .12 * band(kpis.pctAboveSma100 - kpis.pctAboveSma20, 0, .25) + .12 * band(vol, .35, .7);
	const ranked = [
		["crisis", crisisScore],
		["expansion", expansionScore],
		["euphoria", euphoriaScore],
		["compression", compressionScore],
		["risk_off", riskOffScore],
		["distribution", distributionScore]
	];
	ranked.sort((a, b) => b[1] - a[1]);
	const [bestId, best] = ranked[0];
	const second = ranked[1]?.[1] ?? 0;
	if (best < .46) return {
		id: "transition",
		confidence: clamp(.35 + (.46 - best), .35, .62)
	};
	if (crisisScore >= .62 && vol > .78 && trend < -.12) return {
		id: "crisis",
		confidence: clamp(.55 + crisisScore * .4, .55, .94)
	};
	return {
		id: bestId,
		confidence: clamp(.48 + (best - second) * .9 + (best - .46) * .4, .48, .93)
	};
}
var COPY = {
	expansion: {
		label: "Expansion",
		labelVi: "Tăng đồng thuận",
		thesis: "Xu hướng tăng có bề rộng, biến động chưa nóng. Beta dương và dip của coin trên SMA50 thường được mua.",
		playbook: [
			"Ưu tiên trend-follow chiều tăng, thêm khi pullback về SMA20/50 còn giữ.",
			"Alts beta cao thường outperform BTC trong pha này.",
			"Tránh short mean-reversion; fade breakout dễ bị cuốn.",
			"Giữ kỷ luật trailing — expansion có thể chuyển Euphoria khi vol và funding dâng."
		]
	},
	euphoria: {
		label: "Euphoria",
		labelVi: "Tăng nóng",
		thesis: "Giá tăng kèm vol cao, RSI nóng và funding dương. Đám đông đã vào — phần thưởng lệch về quản trị rủi ro.",
		playbook: [
			"Không đuổi breakout FOMO; chỉ pyramiding vị thế đã có lãi.",
			"Giảm leverage, siết size — liquidation cascade dễ xuất hiện.",
			"Canh divergence breadth (ít coin làm đỉnh mới) như tín hiệu phân phối.",
			"Hedge bằng short beta cao hoặc giảm alt exposure về BTC."
		]
	},
	compression: {
		label: "Compression",
		labelVi: "Tích lũy",
		thesis: "Vol thấp, ADX yếu, tín hiệu lẫn. Thị trường đang nén năng lượng — breakout sau compression thường bền.",
		playbook: [
			"Mean-reversion intra-range; fade cực RSI, không phá cấu trúc.",
			"Size nhỏ, chờ ADX thoát vùng dưới 18 và vol percentile rời đáy.",
			"Breakout kèm breadth (phần trăm trên SMA20 nhảy) mới được follow.",
			"Tránh overtrade; edge nằm ở kiên nhẫn, không phải tần suất."
		]
	},
	distribution: {
		label: "Distribution",
		labelVi: "Phân phối",
		thesis: "Giá còn cao nhưng bề rộng yếu đi. Ít coin dẫn dắt — thị trường hẹp, rủi ro đảo chiều tăng.",
		playbook: [
			"Không mua đuổi alt yếu dưới SMA20 trong khi BTC đứng.",
			"Ưu tiên coin còn breadth; cắt những mã mất SMA50.",
			"Tăng tỷ trọng BTC/cash, giảm beta rổ.",
			"Chờ xác nhận: vol tăng kèm corr tăng thường mở risk-off."
		]
	},
	transition: {
		label: "Transition",
		labelVi: "Chuyển pha",
		thesis: "Các trục trend, vol, breadth, corr chưa cùng hướng. Regime chưa ổn định — ưu tiên quan sát.",
		playbook: [
			"Giảm size, tránh thesis lớn cho đến khi 3/4 trục đồng thuận.",
			"Trade tactical thay vì position theo tuần.",
			"Theo dõi breadth 5 phiên và vol percentile làm bộ lọc.",
			"Không biến nhiễu thành tín hiệu: chờ ADX và Hurst rõ hơn."
		]
	},
	risk_off: {
		label: "Risk-off",
		labelVi: "Giảm đồng thuận",
		thesis: "Xu hướng giảm lan rộng. Alt thường underperform BTC. Trend-follow chiều xuống có edge hơn bắt đáy.",
		playbook: [
			"Ưu tiên short/hedge theo SMA20/50; bounce là giảm vị thế long.",
			"Cắt alt beta cao trước — meme và gaming thường dẫn sóng xuống.",
			"Cash/BTC defensive; không bắt dao khi breadth dưới 30%.",
			"Đảo chiều chỉ khi vol percentile hạ và phần trăm trên SMA20 phục hồi bền."
		]
	},
	crisis: {
		label: "Crisis",
		labelVi: "Khủng hoảng",
		thesis: "Vol cực đoan, tương quan nhảy, drawdown sâu. Đa dạng hóa mất tác dụng — đây là regime giải chấp.",
		playbook: [
			"Hạ leverage về gần 0. Ưu tiên sống sót, không phải bắt đáy.",
			"Correlation spike: hedge 1–2 chân (BTC/ETH) thay vì rổ rộng.",
			"Mean-reversion sớm rất đắt; chờ vol-of-vol hạ.",
			"Tái vào lệnh chỉ khi corr và vol percentile cùng hạ, breadth tạo đáy."
		]
	}
};
function driver(key, label, value, hint, polarity) {
	return {
		key,
		label,
		value,
		hint,
		polarity
	};
}
function pct(n, d = 0) {
	return `${(n * 100).toFixed(d)}%`;
}
function signedPct(n, d = 1) {
	return `${n > 0 ? "+" : ""}${(n * 100).toFixed(d)}%`;
}
function describeRegime(scores, kpis) {
	const { id, confidence } = classify(scores, kpis);
	const copy = COPY[id];
	const drivers = [
		driver("trend", "Trend", scores.trend.toFixed(2), "Tổng hợp phần trăm trên SMA, momentum rổ và tỷ lệ uptrend.", scores.trend > .15 ? "pos" : scores.trend < -.15 ? "neg" : "neu"),
		driver("vol", "Vol percentile", pct(scores.vol), "Vol 20D của rổ so với 90 phiên gần nhất.", scores.vol > .7 ? "neg" : scores.vol < .35 ? "pos" : "neu"),
		driver("breadth", "Breadth SMA50", pct(kpis.pctAboveSma50), "Tỷ lệ coin đóng cửa trên SMA50 — đo sự đồng thuận.", kpis.pctAboveSma50 > .55 ? "pos" : kpis.pctAboveSma50 < .4 ? "neg" : "neu"),
		driver("corr", "Tương quan", kpis.avgCorr20.toFixed(2), "Hệ số tương quan cặp trung bình 20D. Cao = risk-on/off chung.", kpis.avgCorr20 > .55 ? "neg" : kpis.avgCorr20 < .32 ? "pos" : "neu"),
		driver("hurst", "Hurst", kpis.hurst.toFixed(2), "Trên 0.55 xu hướng bền, dưới 0.45 mean-revert.", kpis.hurst > .55 ? "pos" : "neu"),
		driver("adx", "ADX rổ", kpis.adx.toFixed(0), "Dưới 18 range, trên 25 trend rõ.", kpis.adx > 25 ? "pos" : "neu"),
		driver("dd", "Drawdown 60D", signedPct(kpis.drawdown60), "Độ sâu dưới đỉnh 60 phiên của chỉ số equal-weight.", kpis.drawdown60 < -.12 ? "neg" : kpis.drawdown60 > -.04 ? "pos" : "neu"),
		driver("fund", "Funding TB", kpis.avgFunding == null ? "—" : `${kpis.avgFunding >= 0 ? "+" : ""}${(kpis.avgFunding * 100).toFixed(3)}%`, "Funding perp 8h trung bình — proxy cho crowding.", Math.abs(kpis.avgFunding ?? 0) > 3e-4 ? "neg" : "neu")
	];
	return {
		id,
		label: copy.label,
		labelVi: copy.labelVi,
		thesis: copy.thesis,
		playbook: copy.playbook,
		confidence,
		drivers
	};
}
var VISION = "https://data-api.binance.vision";
var BITGET = "https://api.bitget.com";
var KLINE_LIMIT = 180;
var CACHE_TTL_MS = 45e3;
var KLINE_TTL_MS = 48e4;
var snapshotCache = null;
var klineCache = /* @__PURE__ */ new Map();
async function getJson(url, timeoutMs = 1e4) {
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			headers: { accept: "application/json" }
		});
		if (!res.ok) throw new Error(`${url} ${res.status}`);
		return await res.json();
	} finally {
		clearTimeout(timer);
	}
}
async function mapPool(items, limit, fn) {
	const out = new Array(items.length);
	let next = 0;
	async function worker() {
		while (next < items.length) {
			const idx = next++;
			out[idx] = await fn(items[idx], idx);
		}
	}
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
	return out;
}
async function loadTickers() {
	const raw = await getJson(`${VISION}/api/v3/ticker/24hr`, 12e3);
	const map = /* @__PURE__ */ new Map();
	for (const row of raw) {
		if (!row.symbol.endsWith("USDT")) continue;
		map.set(row.symbol, {
			symbol: row.symbol,
			lastPrice: Number(row.lastPrice),
			priceChangePercent: Number(row.priceChangePercent)
		});
	}
	return map;
}
async function loadFunding() {
	try {
		const raw = await getJson(`${BITGET}/api/v2/mix/market/current-fund-rate?productType=USDT-FUTURES`);
		const map = /* @__PURE__ */ new Map();
		for (const row of raw.data ?? []) {
			const v = Number(row.fundingRate);
			if (Number.isFinite(v)) map.set(row.symbol, v);
		}
		return map;
	} catch {
		return /* @__PURE__ */ new Map();
	}
}
function parseKlines(raw) {
	if (!Array.isArray(raw)) return [];
	const bars = [];
	for (const row of raw) {
		if (!Array.isArray(row) || row.length < 6) continue;
		const t = Number(row[0]);
		const o = Number(row[1]);
		const h = Number(row[2]);
		const l = Number(row[3]);
		const c = Number(row[4]);
		const v = Number(row[5]);
		if (![
			t,
			o,
			h,
			l,
			c
		].every(Number.isFinite)) continue;
		bars.push({
			t,
			o,
			h,
			l,
			c,
			v: finite(v)
		});
	}
	return bars;
}
async function loadKlines(symbol) {
	const hit = klineCache.get(symbol);
	if (hit && Date.now() - hit.at < KLINE_TTL_MS) return hit.bars;
	const bars = parseKlines(await getJson(`${VISION}/api/v3/klines?symbol=${symbol}&interval=1d&limit=${KLINE_LIMIT}`));
	if (bars.length) klineCache.set(symbol, {
		at: Date.now(),
		bars
	});
	return bars;
}
function resolveSymbol(coin, tickers) {
	for (const s of spotCandidates(coin.id)) if (tickers.has(s)) return s;
	return null;
}
function pickFunding(id, funding) {
	for (const s of fundingCandidates(id)) {
		const v = funding.get(s);
		if (v != null) return v;
	}
	return null;
}
function trendTag(above50, adx, plusDi, minusDi) {
	if (adx >= 18 && plusDi > minusDi && above50) return "up";
	if (adx >= 18 && minusDi > plusDi && !above50) return "down";
	return "range";
}
function equalWeightIndex(closeMatrix) {
	const nCoins = closeMatrix.length;
	const nDays = closeMatrix[0]?.length ?? 0;
	const idx = new Array(nDays).fill(100);
	if (nCoins === 0 || nDays === 0) return idx;
	for (let t = 1; t < nDays; t++) {
		let r = 0;
		let count = 0;
		for (let i = 0; i < nCoins; i++) {
			const prev = closeMatrix[i][t - 1];
			const cur = closeMatrix[i][t];
			if (prev > 0 && cur > 0 && Number.isFinite(prev) && Number.isFinite(cur)) {
				r += cur / prev - 1;
				count += 1;
			}
		}
		const next = idx[t - 1] * (1 + (count ? r / count : 0));
		idx[t] = finite(next, idx[t - 1]);
	}
	return idx;
}
function rollingScores(ew, breadth, vol, corr, volStart) {
	const out = [];
	const n = ew.length;
	for (let i = 0; i < n; i++) {
		const b = breadth[i] ?? .5;
		const look = Math.min(30, i);
		const eNow = ew[i];
		const ePrev = ew[i - look] ?? eNow;
		const mom = ePrev > 0 ? eNow / ePrev - 1 : 0;
		const v = vol[Math.max(0, i - volStart)] ?? vol.at(-1) ?? .5;
		const c = corr[i] ?? .4;
		const trend = clamp(.55 * Math.tanh(mom / .1) + .45 * (2 * b - 1), -1, 1);
		let id = "transition";
		if (v > .78 && trend < -.15 && c > .52) id = "crisis";
		else if (trend > .35 && v < .55 && b > .55) id = "expansion";
		else if (trend > .28 && v >= .55) id = "euphoria";
		else if (trend < -.32) id = "risk_off";
		else if (Math.abs(trend) < .22 && v < .4) id = "compression";
		else if (trend > 0 && b < .45) id = "distribution";
		out.push(id);
	}
	return out;
}
async function buildSnapshot() {
	if (snapshotCache && Date.now() - snapshotCache.at < CACHE_TTL_MS) return snapshotCache.data;
	const [tickers, funding] = await Promise.all([loadTickers(), loadFunding()]);
	const resolved = [];
	const missing = [];
	for (const coin of UNIVERSE) {
		const symbol = resolveSymbol(coin, tickers);
		const ticker = symbol ? tickers.get(symbol) : void 0;
		if (!symbol || !ticker) {
			missing.push(coin.id);
			continue;
		}
		resolved.push({
			coin,
			symbol,
			ticker
		});
	}
	const klines = await mapPool(resolved, 12, async (row) => {
		try {
			const bars = await loadKlines(row.symbol);
			const last = bars.at(-1);
			if (last && row.ticker.lastPrice > 0) return [...bars.slice(0, -1), {
				...last,
				c: row.ticker.lastPrice
			}];
			return bars;
		} catch {
			return [];
		}
	});
	const usable = [];
	for (let i = 0; i < resolved.length; i++) {
		const bars = klines[i] ?? [];
		if (bars.length < 40) {
			missing.push(resolved[i].coin.id);
			continue;
		}
		usable.push({
			...resolved[i],
			bars
		});
	}
	if (usable.length < 8) throw new Error("Không lấy đủ dữ liệu nến để xác định regime.");
	const aligned = alignCloses(usable.map((u) => u.bars));
	const closeMatrix = aligned.closes;
	const nDays = aligned.t.length;
	const ew = equalWeightIndex(closeMatrix);
	const btcIdx = usable.findIndex((u) => u.coin.id === "BTC");
	const btcCloses = btcIdx >= 0 ? closeMatrix[btcIdx] : closeMatrix[0];
	const btcNorm = [];
	const btc0 = btcCloses[0] || 1;
	for (const c of btcCloses) btcNorm.push(100 * c / btc0);
	const retMatrix = closeMatrix.map((row) => {
		const r = new Array(nDays).fill(0);
		for (let t = 1; t < nDays; t++) {
			const prev = row[t - 1];
			const cur = row[t];
			r[t] = prev > 0 ? Math.log(cur / prev) : 0;
		}
		return r;
	});
	const sma50ByCoin = closeMatrix.map((row) => smaSeries(row, 50));
	const breadthSma50 = aligned.t.map((_, t) => {
		let n = 0;
		let hit = 0;
		for (let i = 0; i < closeMatrix.length; i++) {
			const sma = sma50ByCoin[i][t];
			const px = closeMatrix[i][t];
			if (sma != null && sma > 0 && px != null) {
				n += 1;
				if (px > sma) hit += 1;
			}
		}
		return n ? hit / n : .5;
	});
	const ewRets = logReturns(ew);
	const volSeries = rollingVolSeries(ewRets, 20);
	const corr20 = aligned.t.map(() => 0);
	const corrLook = 20;
	for (let t = corrLook; t < nDays; t++) corr20[t] = meanPairwiseCorr(retMatrix, t - corrLook + 1, corrLook);
	let lastCorr = 0;
	for (let t = 0; t < nDays; t++) if (corr20[t]) lastCorr = corr20[t];
	else corr20[t] = lastCorr;
	const volStart = nDays - volSeries.length;
	const padVol = Array.from({ length: nDays }, (_, i) => {
		return volSeries[i - volStart] ?? volSeries[0] ?? 0;
	});
	const btcRets = logReturns(btcCloses);
	const ew20 = simpleReturn(ew, Math.min(20, ew.length - 1));
	const coins = usable.map((u) => {
		const closes = u.bars.map((b) => b.c);
		const rets = logReturns(closes);
		const sma20 = smaAt(closes, 20);
		const sma50 = smaAt(closes, 50);
		const sma100 = smaAt(closes, 100);
		const last = closes.at(-1) ?? u.ticker.lastPrice;
		const adx = calcAdx(u.bars, 14);
		const above50 = sma50 != null && last > sma50;
		const slice20 = u.bars.slice(-20);
		const hi20 = Math.max(...slice20.map((b) => b.h));
		const lo20 = Math.min(...slice20.map((b) => b.l));
		const chg7d = simpleReturn(closes, 7);
		const btc7 = simpleReturn(btcCloses, 7);
		return {
			id: u.coin.id,
			ticker: displayTicker(u.coin.id),
			ccxt: u.coin.ccxt,
			symbol: u.symbol,
			group: u.coin.group,
			price: last,
			chg1d: simpleReturn(closes, 1),
			chg7d,
			chg30d: simpleReturn(closes, 30),
			vsBtc7d: chg7d - btc7,
			rsi14: rsiWilder(closes, 14),
			sma20Dist: sma20 ? last / sma20 - 1 : 0,
			sma50Dist: sma50 ? last / sma50 - 1 : 0,
			sma100Dist: sma100 ? last / sma100 - 1 : 0,
			aboveSma20: sma20 != null && last > sma20,
			aboveSma50: above50,
			aboveSma100: sma100 != null && last > sma100,
			vol20d: realizedVolAnn(rets, 20),
			beta60: betaVs(rets, btcRets),
			adx14: adx.adx,
			plusDi: adx.plusDi,
			minusDi: adx.minusDi,
			trend: trendTag(above50, adx.adx, adx.plusDi, adx.minusDi),
			new20High: last >= hi20 * .999,
			new20Low: last <= lo20 * 1.001,
			funding: pickFunding(u.coin.id, funding)
		};
	});
	const n = coins.length;
	const pct = (pred) => n ? coins.filter(pred).length / n : 0;
	const fundingVals = coins.map((c) => c.funding).filter((v) => v != null);
	const meme = coins.filter((c) => MEME_IDS.has(c.id));
	const majors = coins.filter((c) => MAJOR_IDS.has(c.id));
	const kpis = {
		ew1d: simpleReturn(ew, 1),
		ew7d: simpleReturn(ew, 7),
		ew30d: simpleReturn(ew, 30),
		btc1d: simpleReturn(btcCloses, 1),
		btc7d: simpleReturn(btcCloses, 7),
		btc30d: simpleReturn(btcCloses, 30),
		altVsBtc20: ew20 - simpleReturn(btcCloses, Math.min(20, btcCloses.length - 1)),
		ew20,
		memeVsMajors7: (meme.length ? mean(meme.map((c) => c.chg7d)) : 0) - (majors.length ? mean(majors.map((c) => c.chg7d)) : 0),
		pctAboveSma20: pct((c) => c.aboveSma20),
		pctAboveSma50: pct((c) => c.aboveSma50),
		pctAboveSma100: pct((c) => c.aboveSma100),
		adv1d: coins.filter((c) => c.chg1d > 0).length,
		dec1d: coins.filter((c) => c.chg1d < 0).length,
		new20Highs: coins.filter((c) => c.new20High).length,
		new20Lows: coins.filter((c) => c.new20Low).length,
		realizedVol20: realizedVolAnn(ewRets, 20),
		parkinsonVol20: parkinsonAnn(usable[btcIdx >= 0 ? btcIdx : 0].bars, 20),
		volPercentile: percentileRank(volSeries, volSeries.at(-1) ?? 0),
		avgCorr20: corr20.at(-1) ?? 0,
		avgFunding: fundingVals.length ? mean(fundingVals) : null,
		adx: mean(coins.map((c) => c.adx14)),
		hurst: hurstExponent(ewRets.slice(-90)),
		dispersion20: stdev(coins.map((c) => c.chg7d)),
		drawdown60: maxDrawdown(ew, 60),
		pctUptrend: pct((c) => c.trend === "up"),
		pctRsiHot: pct((c) => c.rsi14 >= 70),
		pctRsiCold: pct((c) => c.rsi14 <= 30)
	};
	kpis.parkinsonVol20 = mean(usable.map((u) => parkinsonAnn(u.bars, 20)));
	const scores = buildScores(kpis);
	const regime = describeRegime(scores, kpis);
	const sliceFrom = Math.max(0, nDays - 90);
	const series = {
		t: aligned.t.slice(sliceFrom),
		ew: ew.slice(sliceFrom),
		btc: btcNorm.slice(sliceFrom),
		breadthSma50: breadthSma50.slice(sliceFrom),
		vol20: padVol.slice(sliceFrom),
		corr20: corr20.slice(sliceFrom),
		regime: rollingScores(ew, breadthSma50, padVol, corr20, 0).slice(sliceFrom)
	};
	const volPctSeries = padVol.map((v) => percentileRank(volSeries, v));
	series.vol20 = volPctSeries.slice(sliceFrom);
	series.regime = rollingScores(ew, breadthSma50, volPctSeries, corr20, 0).slice(sliceFrom);
	const data = {
		asOf: Date.now(),
		source: "Binance · Bitget funding",
		universe: UNIVERSE.length,
		listed: coins.length,
		missing: [...new Set(missing)],
		regime,
		scores,
		kpis,
		series,
		coins: coins.sort((a, b) => a.ticker.localeCompare(b.ticker))
	};
	snapshotCache = {
		at: Date.now(),
		data
	};
	return data;
}
//#endregion
export { buildSnapshot };
