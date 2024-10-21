import { useState } from 'react'

export const UseFetchWeatherHook = (ciudad) => {
  
    
    const [dataClima, setDataClima] = useState(null)
    const [error, setError] = useState(null)
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'c04129de456e76babab194f841df8bde'
    
  
    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) {
            fetchClima()
        }else {
            setError("Por favor ingrese una ciudad")
        }
    }

    const fetchClima = async () => {
        setError(null)
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            if(response.ok){
            setDataClima(data)
            }else{
                setError("Ciudad no encontrada, intente nuevamente")
            }
        }catch(error){
            setError('Ocurrio un problema')
        }

    }
  return {
    dataClima,
    handleSubmit,
    error
  }
}
