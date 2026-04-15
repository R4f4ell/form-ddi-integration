import CountryForm, {
  type CountryOption,
} from '../components/CountryForm/CountryForm'
import '../styles/global.scss'

const mockedCountries: CountryOption[] = [
  {
    name: 'Brasil',
    ddi: '+55',
    flag: 'https://country-code.com/flags/br.png',
  },
  {
    name: 'Portugal',
    ddi: '+351',
    flag: 'https://country-code.com/flags/pt.png',
  },
  {
    name: 'Estados Unidos',
    ddi: '+1',
    flag: 'https://country-code.com/flags/us.png',
  },
  {
    name: 'Reino Unido',
    ddi: '+44',
    flag: 'https://country-code.com/flags/gb.png',
  },
]

function Form() {
  return (
    <main className="form-page">
      <section className="form-page__hero">
        <p className="form-page__eyebrow">Atlas Ridge</p>
        <h1 className="form-page__title">
          Conversas relevantes começam com um contexto bem construído.
        </h1>
        <p className="form-page__description">
          Centralizamos seus dados de contato para que nosso time possa
          responder com mais precisão, agilidade e consistência desde a primeira
          interação.
        </p>
      </section>

      <CountryForm countries={mockedCountries} />
    </main>
  )
}

export default Form
