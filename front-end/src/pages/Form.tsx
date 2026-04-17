import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import CountryForm from '../components/CountryForm/CountryForm'
import { getCountries } from '../lib/lib_api'
import type { CountryOption } from '../types/country'
import '../styles/global.scss'

function Form() {
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)
  const [countriesError, setCountriesError] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: 'ease-out-cubic',
      once: true,
      offset: 24,
      anchorPlacement: 'top-bottom',
    })
  }, [])

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

  useEffect(() => {
    if (!isLoadingCountries) {
      AOS.refresh()
    }
  }, [isLoadingCountries])

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    AOS.refreshHard()

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 2800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toastMessage])

  return (
    <main className="form-page">
      {!isLoadingCountries ? (
        <>
          <section
            className="form-page__hero"
            data-aos="fade-up"
            data-aos-delay="0"
          >
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

          <CountryForm countries={countries} onSubmitSuccess={setToastMessage} />
        </>
      ) : null}

      {toastMessage ? (
        <div
          className="form-page__toast"
          role="status"
          aria-live="polite"
          data-aos="fade-down"
          data-aos-delay="0"
          data-aos-duration="300"
        >
          {toastMessage}
        </div>
      ) : null}
    </main>
  )
}

export default Form
