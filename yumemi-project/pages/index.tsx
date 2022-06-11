import { Prefectures, fetchPrefectures } from "../lib/prefecture"
import { InferGetStaticPropsType } from "next"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ prefectures }: Props) {
  return (
    <div>
      {prefectures.result.map((result: any) => (
        <div key={result.prefCode}>{result.prefName}</div>
      ))}
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
