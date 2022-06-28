import React from "react"

type Props = {
  prefectures:
    | {
        prefCode: number
        prefName: string
      }[]

  onChange: (name: string, prefName: number, check: boolean) => void
}

// 都道府県一覧のチェックボックスを表示するコンポーネント
const CheckField = ({ prefectures, onChange }: Props) => {
  return (
    <>
      <div className="flex flex-wrap p-10 justify-start justify-self-auto">
        {prefectures.map((prefecture) => (
          <div
            className="w-36 rounded-3xl border-solid border-2 text-center p-1 m-2"
            key={prefecture.prefName}
          >
            <input
              className="mr-3"
              type="checkbox"
              name="Prefecture name"
              onChange={(event) =>
                onChange(
                  prefecture.prefName,
                  prefecture.prefCode,
                  event.target.checked
                )
              }
              id={"checkbox" + prefecture.prefCode}
            />
            <label
              className="contents cursor-pointer"
              htmlFor={"checkbox" + prefecture.prefCode}
            >
              {prefecture.prefName.length === 3
                ? "　" + prefecture.prefName
                : prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}

export default CheckField
