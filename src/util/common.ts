interface MetamaskError {
  code: number
  message: string
  data: any
}

export const readError = (error: Error): string => {
  try {
    let message = error.message.split('\n')[0]
    try {
      message = error.message
        .split(
          '(error=',
        )[1]
        .split(', method')[0]
      const metamaskError = JSON.parse(message) as MetamaskError
      return (
        metamaskError.message.charAt(0).toUpperCase() +
        metamaskError.message.slice(1)
      )
    } catch (e) {
      return message
    }
  } catch (e) {
    return error.message
  }
}

export const sleep = (timeout: number) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout))

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`
}
