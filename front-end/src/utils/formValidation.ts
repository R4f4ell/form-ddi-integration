import { FORM_MESSAGES } from '../constants/formMessages'

export type FormErrors = {
  name: string | null
  email: string | null
  phone: string | null
}

type FormValues = {
  name: string
  email: string
  phone: string
}

function trimValue(value: string) {
  return value.trim()
}

function normalizeSpaces(value: string) {
  return trimValue(value).replace(/\s+/g, ' ')
}

function isBlank(value: string) {
  return !trimValue(value)
}

function validateName(name: string) {
  const normalizedName = normalizeSpaces(name)

  if (isBlank(name) || normalizedName.length < 3 || normalizedName.length > 25) {
    return FORM_MESSAGES.nameInvalid
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(normalizedName)) {
    return FORM_MESSAGES.nameInvalid
  }

  return null
}

function validateEmail(email: string) {
  const normalizedEmail = trimValue(email).toLowerCase()

  if (isBlank(email) || normalizedEmail.length > 60) {
    return FORM_MESSAGES.emailInvalid
  }

  if (!/^[a-z0-9._%+-]+@gmail\.com$/.test(normalizedEmail)) {
    return FORM_MESSAGES.emailInvalid
  }

  return null
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')

  if (!digits || digits.length < 10 || digits.length > 11) {
    return FORM_MESSAGES.phoneInvalid
  }

  return null
}

export function normalizeFormValues(values: FormValues): FormValues {
  return {
    name: normalizeSpaces(values.name),
    email: trimValue(values.email).toLowerCase(),
    phone: values.phone,
  }
}

export function validateForm(values: FormValues): FormErrors {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
  }
}

export function hasFormErrors(errors: FormErrors) {
  return Object.values(errors).some(Boolean)
}
