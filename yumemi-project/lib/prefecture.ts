export interface Prefectures {
  message: null
  result: PrefecturesResult[]
}

export interface PrefecturesResult {
  prefCode: number
  prefName: string
}

export interface FetchPopulationParams {
  prefCode: string
  cityCode: string
}

export interface Populations {
  message: null
  result: {
    boundaryYear: number
    data: { label: string; data: { year: number; value: number }[] }[]
  }
}

export interface PrefPopulation {
  prefName: string
  data: { year: number; value: number }[]
}

export const fetchPrefectures = async () => {
  const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
  const API_KEY = String(process.env.NEXT_PUBLIC_RESAS_API_KEY)
  const res = await fetch(url, {
    headers: { "X-API-KEY": API_KEY },
  })
    .then((response) => response.json())
    .catch(console.error)
  return res
}

export const fetchPopulation = async (params: FetchPopulationParams) => {
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=${params.cityCode}&prefCode=${params.prefCode}`
  const API_KEY = String(process.env.NEXT_PUBLIC_RESAS_API_KEY)
  const res = await fetch(url, {
    headers: { "X-API-KEY": API_KEY },
  })
    .then((response) => response.json())
    .catch(console.error)
  return res
}
