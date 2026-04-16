import { useEffect, useState } from 'react'

import CountryForm, {
  type CountryOption,
} from '../components/CountryForm/CountryForm'
import { getCountries } from '../lib/lib_api'
import '../styles/global.scss'

function Form() {
  const [countries, setCountries] = useState<CountryOption[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadCountries() {
      try {
        const countriesResponse = await getCountries()

        if (isMounted) {
          setCountries(countriesResponse)
        }
      } catch {
        if (isMounted) {
          setCountries([])
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
      <section className="form-page__hero">
        <p className="form-page__eyebrow">Atlas Ridge</p>
        <h1 className="form-page__title">
          Conversas relevantes começam com um contexto bem construído.
        </h1>
        <p className="form-page__description">
          Centralizamos seus dados de contato para que nosso time possa
          responder com mais precisão, agilidade e consistância desde a primeira interação.
        </p>
      </section>

      <CountryForm countries={countries} />
    </main>
  )
}

export default Form
