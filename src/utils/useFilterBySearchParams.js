import { useSearchParams } from 'react-router-dom'

export function useFilterBySearchParams(array, key) {
  const [searchParams] = useSearchParams()
  const searchedWord = searchParams.get('search')?.toLowerCase()
  if (!searchedWord) return array
  return array.filter((item) => item[key]?.toLowerCase().includes(searchParams.get('search')))
}
