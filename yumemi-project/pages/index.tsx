import {
  Prefectures,
  fetchPrefectures,
  fetchPopulation,
  Populations,
  PrefPopulation,
} from "../lib/prefecture"
import { InferGetStaticPropsType } from "next"

import Graph from "../components/Graph"
import CheckField from "../components/CheckField"
import { useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home = ({ prefectures }: Props) => {
  const [prefPopulations, setPrefPopulations] = useState<PrefPopulation[]>([])
  async function clickCheckField(
    prefName: string,
    prefCode: number,
    checked: boolean
  ): Promise<void> {
    const prefPopulationArray: PrefPopulation[] = prefPopulations.slice()
    if (checked) {
      const populations: Populations = await fetchPopulation({
        prefCode: String(prefCode),
        cityCode: "-",
      })
      prefPopulationArray.push({
        prefName: prefName,
        data: populations.result.data[0].data,
      })
      setPrefPopulations(prefPopulationArray)
    } else {
      const deletedPrefPopulationArray: PrefPopulation[] =
        prefPopulationArray.filter(
          (population) => population.prefName !== prefName
        )
      setPrefPopulations(deletedPrefPopulationArray)
    }
    return
  }

  return (
    <div>
      <div className="text-4xl text-gray-800 mb-8 ml-4">
        都道府県別の総人口推移グラフ
      </div>
      <div className="text-3xl text-gray-800 ml-6">都道府県</div>
      <CheckField
        prefectures={prefectures.result}
        onChange={clickCheckField}
      ></CheckField>
      <div className="text-3xl text-gray-800 ml-6">人口数</div>
      <Graph populationdata={prefPopulations} />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const prefectures: Prefectures = await fetchPrefectures()
  return {
    props: {
      prefectures,
    },
  }
}
