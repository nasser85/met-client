import { API_BASE_URL } from './constants'
import { GetObjectsResponse, getObjectsByPage, GetAllObjectIDsResponse } from './objects'

export const SEARCH_URL = `${API_BASE_URL}search`

interface MetDate {
  year: number
  era: 'BC' | 'AD'
}

interface DateRange {
  dateBegin: MetDate 
  dateEnd: MetDate
}

interface SearchOptions {
  geoLocation?: string[]
  dateRange?: DateRange
  hasImages?: boolean
}

const getDateInteger = ({ year, era }: MetDate): number => era === 'BC' ? -1 * year : year

const getSearchObjectIDs = async (q: string, options?: SearchOptions): Promise<GetAllObjectIDsResponse> => {
  const locationQuery = options?.geoLocation?.length ? `&geoLocation=${options.geoLocation.join('|')}` : ''
  const dateQuery = options?.dateRange
    ? `&dateBegin=${getDateInteger(options.dateRange.dateBegin)}&dateEnd=${getDateInteger(options.dateRange.dateEnd)}`
    : ''
  const hasImagesQuery = options?.hasImages ? '&hasImages=true' : ''
  const result = await fetch(`${SEARCH_URL}?q=${q.replace(/ /g, '+')}${locationQuery}${dateQuery}${hasImagesQuery}`)

  return result.json()
}

export const searchObjects = async (q: string, page: number = 1, options?: SearchOptions): Promise<GetObjectsResponse> => {
  const { total, objectIDs } = await getSearchObjectIDs(q, options)
  
  return getObjectsByPage(page, total, objectIDs)
}
