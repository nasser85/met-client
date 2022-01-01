import { OBJECTS_URL } from './objects'

interface MetLocation {
  geographyType: string
  city: string
  country: string
  subregion: string
}

interface MetArtist {
  role: string
  prefix: string
  displayName: string
  displayBio: string
  beginDate: string
  endDate: string
  nationality: string
}

export interface MetObject {
  objectID: number
  isHighlight: boolean
  accessionYear: string
  isPublicDomain: boolean
  primaryImage: string
  primaryImageSmall: string
  additionalImages: string[]
  department: string
  objectName: string
  title: string
  culture: string
  period: string
  portfolio: string
  objectDate: string
  objectBeginDate: string
  objectEndDate: string
  medium: string
  dimensions: string
  creditLine: string
  galleryNumber: string
  rightsAndReproduction: string
  location: MetLocation
  artist: MetArtist
}

export const getObjectByID = async (objectID: number): Promise<MetObject> => {
  const result = await fetch(`${OBJECTS_URL}/${objectID}`)

  const {
    artistRole,
    artistPrefix,
    artistDisplayName,
    artistDisplayBio,
    artistBeginDate,
    artistEndDate,
    artistNationality,
    geographyType,
    city,
    country,
    subregion,
    isHighlight,
    accessionYear,
    isPublicDomain,
    primaryImage,
    primaryImageSmall,
    additionalImages,
    department,
    objectName,
    title,
    culture,
    period,
    portfolio,
    objectDate,
    objectBeginDate,
    objectEndDate,
    medium,
    dimensions,
    creditLine,
    galleryNumber,
    rightsAndReproduction,
  } = await result.json()

  return {
    isHighlight,
    accessionYear,
    isPublicDomain,
    primaryImage,
    primaryImageSmall,
    additionalImages,
    department,
    objectName,
    title,
    culture,
    period,
    portfolio,
    objectDate,
    objectBeginDate,
    objectEndDate,
    medium,
    dimensions,
    creditLine,
    galleryNumber,
    rightsAndReproduction,
    objectID,
    location: {
      geographyType,
      city,
      country,
      subregion,
    },
    artist: {
      role: artistRole,
      prefix: artistPrefix,
      displayBio: artistDisplayBio,
      displayName: artistDisplayName,
      beginDate: artistBeginDate,
      endDate: artistEndDate,
      nationality: artistNationality,
    },
  }
}
