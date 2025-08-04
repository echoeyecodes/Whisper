/* eslint-disable @typescript-eslint/no-explicit-any */

export function errorHandler(error: any) {
    const { response } = error
    if (response && response.data) {
        const { data } = response
        if (data.message && data.status) {
            return {
                name: data.name,
                status: data.status as number,
                message: data.message as string
            }
        } else {
            return {
                name: error.name,
                status: response.status,
                message: "An unexpected error has occurred"
            }
        }
    } else {
        return {
            name: error.name,
            status: error.status ?? 500,
            message: error.message || "An unexpected error has occurred"
        }
    }

}