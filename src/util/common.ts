export const readError = (error: Error): string => {
    try {
        return error.message.split("\n")[0]
    } catch (e) {
        return error.message
    }
}