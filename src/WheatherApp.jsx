import React from 'react'
import './styles/WheatherStyles.css'
import { useState } from 'react'
export const WheatherApp = () => {

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'c04129de456e76babab194f841df8bde'
    const difKelvin = 273.15
    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
           
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error('Ocurrio un problema')
        }

    }

  return (
    <div className='container'>
        <h1>Apliccion de clima</h1>

        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
             />
            <button type='submit'>Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                    <img src= {`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                </div>
            )
        }
    </div>
  )
}
