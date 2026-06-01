import { useState, useEffect } from "react";

const useGeolocation = () => {

    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })

    const [permission, setPermission] = useState('')
    const [error, setError] = useState('')

    

    useEffect(() => {

        let watchId = null;
        const onSuccess = (position) => {
            setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }
        const onError = (error) => {
            const errorMessage = "Hey, fellow ninja! We got an error with your geolocation..."
            console.log(errorMessage);
            console.error(error);
            setError(`[handlePermissionChange] :: [onError] - ${errorMessage}`)
        }

        const handlePermissionChange = (status) => {
            setPermission(status.state)

            if (status.state === 'denied') {
                alert("Hey, fellow ninja! You denied the geolocation permission. Please allow it to use this feature.")
            }

            if (status.state === 'granted' || status.state === 'prompt') {
                watchId = navigator.geolocation.watchPosition(onSuccess, onError)
            }
        }

        if ('geolocation' in navigator && 'permissions' in navigator) {
            console.log("Go, ninja go! Geolocation is available in your browser.");
            navigator.permissions.query({ name: 'geolocation' }).then((status) => {
            handlePermissionChange(status)
            });
        } else {
            setError("Geolocation is not available in your browser.")
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId)
            }
        }

    }, [])

    return { coordinates, permission, error }

}


export default useGeolocation;