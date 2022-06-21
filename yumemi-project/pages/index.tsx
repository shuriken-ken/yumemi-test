import {
  Prefectures,
  fetchPrefectures,
  fetchPopulation,
  Populations,
} from "../lib/prefecture"
import { InferGetStaticPropsType } from "next"

import Graph from "./graph"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ prefectures, populations }: Props) {
  return (
    <div>
      <div>
        {prefectures.result.map((result: any) => (
          <div key={result.prefCode}>{result.prefName}</div>
        ))}
      </div>
      <div>{String(populations.result.data[0].data[8].value)}</div>
      <Graph
        populationdata={[
          {
            prefName: "hokkaido",
            data: [{ year: 2020, value: 500000 }],
          },
          {
            prefName: "aomori",
            data: [{ year: 2020, value: 20000 }],
          },
        ]}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const prefectures: Prefectures = await fetchPrefectures()
  const populations: Populations = await fetchPopulation({
    prefCode: "1",
    cityCode: "-",
  })
  console.log(populations)
  return {
    props: {
      prefectures,
      populations,
    },
  }
}
