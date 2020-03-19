const XPATH = "//html/body/div[2]/div[1]/div[2]/div[1]/div/table/tr[1]/td[2]/div/div[2]/div[2]/div[2]/div";
const XPATH_TITLE = "div[1]/div[1]";
const XPATH_VALUE = "div[2]/div/div[5]/div";
const TICKERS_SHARE = [
  ["NEM", "US", 34055004],
  ["GOLD", "US", 73846019],
  ["FNV", "US", 7833046],
  ["WPM", "US", 20847486],
  ["NCM", "AUDUSD", 31936383],
  ["KL", "CADUSD", 17005037],
  ["AU", "US", 25240431],
  ["AEM", "US", 9964622],
  ["KGC", "US", 76183443],
  ["RGLD", "US", 3986582],
  ["GFI", "US", 50362946],
  ["NST", "AUDUSD", 39438730],
  ["EVN", "AUDUSD", 103410135],
  ["BTG", "US", 62340263],
  ["PAAS", "US", 12739849],
  ["AUY", "US", 57765441],
  ["AGI", "US", 23775162],
  ["SAR", "AUDUSD", 66999156],
  ["BVN", "US", 15426087],
  ["2899", "HKDUSD", 348718000],
  ["CG", "CADUSD", 17842515],
  ["EDV", "CADUSD", 6680727],
  ["CEY", "GBPUSD", 70257115 / 100],
  ["SSRM", "US", 7478484],
  ["HMY", "US", 32958300],
  ["AG", "US", 12446511],
  ["PVG", "US", 11264454],
  ["IAG", "US", 28444281],
  ["OR", "US", 9566838],
  ["RRL", "AUDUSD", 30886541],
  ["EGO", "US", 9630969],
  ["HL", "US", 30116736],
  ["1818", "HKDUSD", 63773000],
  ["SAND", "US", 10624008],
  ["ASR", "CADUSD", 17910396],
  ["SBM", "AUDUSD", 42493101],
  ["CDE", "US", 14613902],
  ["TXG", "CADUSD", 5182968],
  ["WDO", "CADUSD", 8310476],
  ["OGC", "CADUSD", 37822105],
  ["HGM", "GBPUSD", 22117066 / 100],
  ["DPM", "CADUSD", 10863453],
  ["SMF", "CADUSD", 20327655],
  ["PRU", "AUDUSD", 70683099],
  ["SVM", "US", 10432980],
  ["RSG", "AUDUSD", 54891806],
  ["NGD", "US", 40897794],
  ["EQX", "US", 187109]
]

function evaluate() {
  const result = {};
  const nodesSnapshot = document.evaluate(XPATH, document, null, 7, null);
  for (let i = 1; i < nodesSnapshot.snapshotLength; i++) {
    const title = document.evaluate(XPATH_TITLE, nodesSnapshot.snapshotItem(i), null, 2, null).stringValue;
    const value = document.evaluate(XPATH_VALUE, nodesSnapshot.snapshotItem(i), null, 2, null).stringValue;
    const ticker = title.split(",")[0];
    result[ticker] = Number(value);
  };

  return TICKERS_SHARE.reduce((acc, [ticker, exc, share]) => {
    return acc + (result[ticker] * share * (result[exc] || 1));
  }, 0);
}

setInterval(() => {
  console.log(evaluate());
}, 1000);