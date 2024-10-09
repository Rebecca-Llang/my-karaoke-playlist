import { Song } from '../../models/songs'

interface Props {
  data: Song[]
  onDecadeChange: (decade: number) => void
}

export default function FilterByDecade({ onDecadeChange, data }: Props) {
  const decades = new Set(
    data.map((song) => song.decade).sort((min, max) => min - max),
  )

  const decadesArr = [...decades]

  return (
    <>
      <label htmlFor="decadeFilter">
        <select
          name="filterByDecade"
          id="decadeFilter"
          onChange={(e) => onDecadeChange(Number(e.target.value))}
        >
          <option value="">All Decades</option>
          {decadesArr.map((decade) => (
            <option key={decade} value={decade}>
              {decade}s
            </option>
          ))}
        </select>
      </label>
    </>
  )
}
