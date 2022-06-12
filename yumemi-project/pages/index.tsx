import {
  Prefectures,
  fetchPrefectures,
  fetchPopulation,
  Populations,
} from "../lib/prefecture"
import { InferGetStaticPropsType } from "next"

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
