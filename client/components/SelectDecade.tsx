import { useState } from 'react'

interface SelectDecadeProps {
  onSelect: (decade: number) => void
}

export default function SelectDecade({ onSelect }: SelectDecadeProps) {
  const [decade, setDecade] = useState<number | null>(null)

  const options = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]

  const onDecadeSelectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedDecade = Number(event.target.value)
    setDecade(selectedDecade)
    onSelect(selectedDecade)
  }

  return (
    <>
      <select
        id="decade"
        className="select"
        onChange={onDecadeSelectHandler}
        value={decade ?? ''}
      >
        <option value="" disabled>
          Select Decade
        </option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>
        })}
      </select>
    </>
  )
}
