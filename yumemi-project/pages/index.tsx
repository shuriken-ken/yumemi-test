import {
  Prefectures,
  fetchPrefectures,
  fetchPopulation,
  Populations,
} from "../lib/prefecture"
import { InferGetStaticPropsType } from "next"

import Graph from "./Graph"
import CheckField from "./CheckField"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ prefectures, populations }: Props) {
  return (
    <div>
      <CheckField
        prefectures={prefectures.result}
        onChange={clickCheckField}
      ></CheckField>
      <div>{String(populations.result.data[0].data[8].value)}</div>
      <Graph
        populationdata={[
          {
            prefName: "hokkaido",
            data: populations.result.data[0].data,
          },
          {
            prefName: "aomori",
            data: populations.result.data[1].data,
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
  return {
    props: {
      prefectures,
      populations,
    },
  }
}

async function clickCheckField(
  prefName: string,
  prefCode: number,
  checked: boolean
): Promise<void> {
  if (checked) {
    const populations: Populations = await fetchPopulation({
      prefCode: String(1),
      cityCode: "-",
    })
    console.log(populations)
  }

  return
}
