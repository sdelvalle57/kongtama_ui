export const getTokenIdFromURL = (url: string): number => {
  try {
    return parseInt(url.split('/').pop())
  } catch (e) {
    throw e
  }
}

export const getURLFromURI = (uri: string): string => {
  return uri
    .split('/')
    .slice(0, -1)
    .join('/')
}

export const getImageURI = (url: string): string => {
  return url.split('/')[url.split('/').length - 1]
}
