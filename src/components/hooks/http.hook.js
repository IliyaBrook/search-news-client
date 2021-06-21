import {useCallback, useState} from "react";

const useHttp = (useCallbackDeps = null) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true)
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            try {

                if (!response.ok) {
                    return Error('Something wrong, bad request...')
                }
                setLoading(false)
                return data
            } catch (e) {
                setLoading(false)
                setError(e)
                throw e
            }
        }
        ,
        [useCallbackDeps]
    )

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}
export default useHttp
