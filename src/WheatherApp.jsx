import React from 'react'
import './styles/WheatherStyles.css'
import { UseFetchWeatherHook } from './hook/useFetchWeatherHook'

import { useState } from 'react'

export const WheatherApp = () => {
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const { handleSubmit, dataClima, error } = UseFetchWeatherHook(ciudad)

    return (
        <div className='container'>
            <h1>Apliccion de clima</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                    placeholder='Ingrese una ciudad'
                />
                <button type='submit'>Buscar</button>
            </form>

            { error && <p>{error}</p>}

            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Condicion Meteorologica: {dataClima?.weather[0]?.description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                    </div>
                )
            }
        </div>
    )
}
