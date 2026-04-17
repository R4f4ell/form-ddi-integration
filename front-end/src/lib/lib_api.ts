import type { CountryOption } from '../components/CountryForm/CountryForm'

const COUNTRIES_ENDPOINT = '/countries'

let countriesRequest: Promise<CountryOption[]> | null = null

export async function getCountries(): Promise<CountryOption[]> {
  if (!countriesRequest) {
    countriesRequest = fetch(COUNTRIES_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Nao foi possivel carregar os paises.')
        }

        return response.json() as Promise<CountryOption[]>
      })
      .catch((error) => {
        countriesRequest = null
        throw error
      })
  }

  return countriesRequest
}
