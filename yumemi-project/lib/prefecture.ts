/** RESAS-APiから取得した都道府県一覧 */
export interface Prefectures {
  message: null
  result: PrefecturesResult[]
}

/** 都道府県一覧 */
export interface PrefecturesResult {
  prefCode: number
  prefName: string
}

/** RESAS-APiで人口構成を取得する際のparam */
export interface FetchPopulationParams {
  prefCode: string
  cityCode: string
}

/** RESAS-APiから取得した人口構成 */
export interface Populations {
  message: null
  result: {
    boundaryYear: number
    // data[0]が総人口
    data: { label: string; data: { year: number; value: number }[] }[]
  }
}

/** 人口構成 */
export interface PrefPopulation {
  prefName: string
  data: { year: number; value: number }[]
}

/** 都道府県一覧の取得 */
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

/** 人口構成の取得 */
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
