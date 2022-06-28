import {
  Prefectures,
  fetchPrefectures,
  fetchPopulation,
  Populations,
  PrefPopulation,
} from "../lib/prefecture"
import { InferGetStaticPropsType } from "next"

import Graph from "./Graph"
import CheckField from "./CheckField"
import { useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ prefectures }: Props) {
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
      <CheckField
        prefectures={prefectures.result}
        onChange={clickCheckField}
      ></CheckField>
      <Graph populationdata={prefPopulations} />
    </div>
  )
}

export const getStaticProps = async () => {
  const prefectures: Prefectures = await fetchPrefectures()
  return {
    props: {
      prefectures,
    },
  }
}
