import type { CountryOption } from '../components/CountryForm/CountryForm'

const COUNTRIES_ENDPOINT = 'http://127.0.0.1:8000/countries'

export async function getCountries(): Promise<CountryOption[]> {
  const response = await fetch(COUNTRIES_ENDPOINT)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os países.')
  }

  return response.json()
}
