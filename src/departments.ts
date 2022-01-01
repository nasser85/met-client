import { API_BASE_URL } from './constants'

interface Department {
  departmentId: number
  displayName: string
}

interface GetDepartmentsResponse {
  departments: Department[]
}

const DEPARTMENTS_URL = `${API_BASE_URL}departments`

export const getDepartments = async (): Promise<GetDepartmentsResponse> => {
  const result = await fetch(DEPARTMENTS_URL)
  
  return result.json()
}
