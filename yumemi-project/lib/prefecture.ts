export interface Prefectures {
  message: null
  result: PrefecturesResult[]
}

export interface PrefecturesResult {
  prefCode: number
  prefName: string
}

export const fetchPrefectures = async () => {
  const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
  const API_KEY = String(process.env.RESAS_API_KEY)
  const res = await fetch(url, {
    headers: { "X-API-KEY": API_KEY },
  })
    .then((response) => response.json())
    .catch(console.error)
  return res
}
