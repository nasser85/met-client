import { API_BASE_URL, OBJECTS_PER_PAGE } from './constants'
import { getObjectByID, MetObject } from './object'
import { SEARCH_URL } from './search'

export const OBJECTS_URL = `${API_BASE_URL}objects`

export interface GetObjectsResponse {
  currentPage: number
  totalObjects: number
  totalPages: number
  objects: MetObject[]
}

export interface GetAllObjectIDsResponse {
  total: number
  objectIDs: number[]
}

interface GetObjectsOptions {
  departmentIds?: string[]
  hasImages?: boolean
}

const getAllObjectIDs = async (departmentIds?: string[], hasImages?: boolean): Promise<GetAllObjectIDsResponse> => {
  const departmentsQuery = departmentIds?.length ? `departmentIds=${departmentIds.join('|')}` : ''
  const imagesQuery = 'q=1+2+3+4+5+6+7+8+9+0&hasImages=true'
  const requestUrl = hasImages ? `${SEARCH_URL}?${imagesQuery}${departmentsQuery.length ? `&${departmentsQuery}`: ''}` : `${OBJECTS_URL}?${departmentsQuery}`
  
  const result = await fetch(requestUrl)

  return result.json()
}

export const getObjectsByPage = async (page: number, total: number, objectIDs: number[]): Promise<GetObjectsResponse> => {
  const startingIndex = (page - 1) * OBJECTS_PER_PAGE

  if (startingIndex > objectIDs.length) {
    throw new Error("Error fetching objects: page does not exist!")
  }

  const objects = await Promise.all(
    objectIDs.slice(startingIndex, startingIndex + OBJECTS_PER_PAGE).map(getObjectByID)
  )

  return {
    currentPage: page,
    totalObjects: total,
    totalPages: Math.floor(total / OBJECTS_PER_PAGE) + 1,
    objects,
  }
}

export const getObjects = async (page: number = 1, options?: GetObjectsOptions): Promise<GetObjectsResponse> => {
  const { total, objectIDs } = await getAllObjectIDs(options?.departmentIds, options?.hasImages)
  
  return getObjectsByPage(page, total, objectIDs)
}

