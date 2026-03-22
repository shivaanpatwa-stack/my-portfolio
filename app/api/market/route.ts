const SYMBOLS = [
  { id: "^GSPC", label: "S&P 500" },
  { id: "^IXIC", label: "NASDAQ" },
  { id: "^NSEI", label: "NIFTY 50" },
  { id: "GC=F", label: "Gold" },
  { id: "SI=F", label: "Silver" },
  { id: "BTC-USD", label: "BTC" },
];

export async function GET() {
  const results = await Promise.all(
    SYMBOLS.map(async ({ id, label }) => {
      try {
        const res = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(id)}?interval=1d&range=1d`,
          {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio/1.0)" },
            cache: "no-store",
          }
        );
        const data = await res.json();
        const meta = data?.chart?.result?.[0]?.meta;
        if (!meta) return null;

        const price: number = meta.regularMarketPrice ?? 0;
        const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
        const change = price - prevClose;
        const changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;

        return { id, label, price, change, changePercent };
      } catch {
        return null;
      }
    })
  );

  return Response.json(results.filter(Boolean));
}
