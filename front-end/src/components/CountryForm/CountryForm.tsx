import { useEffect, useId, useRef, useState } from 'react'

import './CountryForm.scss'

export type CountryOption = {
  name: string
  ddi: string
  flag: string | null
}

type CountryFormProps = {
  countries: CountryOption[]
}

type FormState = {
  name: string
  email: string
  phone: string
  countryDdi: string
}

const initialFormState = (countries: CountryOption[]): FormState => ({
  name: '',
  email: '',
  phone: '',
  countryDdi: countries[0]?.ddi ?? '',
})

function formatPhoneValue(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function CountryForm({ countries }: CountryFormProps) {
  const formId = useId()
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [formData, setFormData] = useState<FormState>(() =>
    initialFormState(countries),
  )
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)

  const selectedCountry =
    countries.find((country) => country.ddi === formData.countryDdi) ??
    countries[0] ??
    null

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsCountryMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  function handleFieldChange(field: keyof FormState, value: string) {
    setFormData((currentState) => ({
      ...currentState,
      [field]: field === 'phone' ? formatPhoneValue(value) : value,
    }))
  }

  function handleCountrySelect(ddi: string) {
    handleFieldChange('countryDdi', ddi)
    setIsCountryMenuOpen(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className="country-form-section" aria-labelledby={`${formId}-title`}>
      <div className="country-form-section__shell">
        <div className="country-form-section__accent" />

        <div className="country-form-section__header">
          <p className="country-form-section__label">Preencha o Formulário</p>
          <h2 id={`${formId}-title`} className="country-form-section__title">
            Estamos prontos para entender sua necessidade
          </h2>
        </div>

        <form className="country-form" onSubmit={handleSubmit}>
          <label className="country-form__field">
            <span>Nome</span>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
            />
          </label>

          <label className="country-form__field">
            <span>E-mail</span>
            <input
              type="email"
              placeholder="Ex: nome@empresa.com"
              value={formData.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
            />
          </label>

          <label className="country-form__field">
            <span>Telefone</span>

            <div className="country-form__phone-shell" ref={dropdownRef}>
              <button
                type="button"
                className={`country-form__country-trigger${
                  isCountryMenuOpen ? ' country-form__country-trigger--open' : ''
                }`}
                onClick={() => setIsCountryMenuOpen((currentState) => !currentState)}
                aria-expanded={isCountryMenuOpen}
                aria-label="Selecionar DDI"
              >
                {selectedCountry?.flag ? (
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="country-form__country-flag"
                  />
                ) : (
                  <span className="country-form__country-flag country-form__country-flag--placeholder" />
                )}

                <span className="country-form__country-ddi">
                  {selectedCountry?.ddi ?? ''}
                </span>
                <span className="country-form__country-arrow" aria-hidden="true">
                  {isCountryMenuOpen ? '▴' : '▾'}
                </span>
              </button>

              <input
                type="tel"
                inputMode="numeric"
                placeholder="(DDD) 99999-9999"
                value={formData.phone}
                onChange={(event) => handleFieldChange('phone', event.target.value)}
              />

              {isCountryMenuOpen ? (
                <div className="country-form__country-dropdown" role="listbox">
                  {countries.map((country) => (
                    <button
                      key={`${country.name}-${country.ddi}`}
                      type="button"
                      className={`country-form__country-option${
                        country.ddi === formData.countryDdi
                          ? ' country-form__country-option--active'
                          : ''
                      }`}
                      onClick={() => handleCountrySelect(country.ddi)}
                    >
                      <span className="country-form__country-option-main">
                        {country.flag ? (
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="country-form__country-option-flag"
                          />
                        ) : (
                          <span className="country-form__country-option-flag country-form__country-option-flag--placeholder" />
                        )}

                        <span className="country-form__country-option-name">
                          {country.name}
                        </span>
                      </span>

                      <span className="country-form__country-option-ddi">
                        {country.ddi}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </label>

          <button type="submit" className="country-form__button">
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}

export default CountryForm
