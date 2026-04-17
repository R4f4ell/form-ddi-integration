import { useEffect, useState } from 'react'

import CountryForm from '../components/CountryForm/CountryForm'
import { getCountries } from '../lib/lib_api'
import type { CountryOption } from '../types/country'
import '../styles/global.scss'

function Form() {
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)
  const [countriesError, setCountriesError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCountries() {
      if (isMounted) {
        setIsLoadingCountries(true)
        setCountriesError('')
      }

      try {
        const countriesResponse = await getCountries()

        if (isMounted) {
          setCountries(countriesResponse)
          setCountriesError('')
        }
      } catch {
        if (isMounted) {
          setCountries([])
          setCountriesError('Nao foi possivel carregar os paises agora.')
        }
      } finally {
        if (isMounted) {
          setIsLoadingCountries(false)
        }
      }
    }

    void loadCountries()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="form-page">
      {!isLoadingCountries ? (
        <>
          <section className="form-page__hero">
            <p className="form-page__eyebrow">Atlas Ridge</p>
            <h1 className="form-page__title">
              Conversas relevantes começam com um contexto bem construido.
            </h1>
            <p className="form-page__description">
              Organize suas informações para que nossa equipe entenda sua necessidade com mais rapidez e precisão.
            </p>
          </section>

          {countriesError ? (
            <div className="form-page__feedback form-page__feedback--error" role="alert">
              {countriesError}
            </div>
          ) : null}

          <CountryForm countries={countries} />
        </>
      ) : null}
    </main>
  )
}

export default Form
