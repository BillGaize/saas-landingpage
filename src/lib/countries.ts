export interface CountryMeta {
  flag: string
  name: string
}

// Flag emoji + localized name for ANY ISO-3166 alpha-2 code.
export function countryMeta(
  code: string,
  language: 'es' | 'en'
): CountryMeta {
  if (!/^[A-Z]{2}$/.test(code)) {
    return {
      flag: '🌍',
      name: language === 'en' ? 'Others' : 'Otros'
    }
  }

  const flag = String.fromCodePoint(
    ...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )

  let name = code
  try {
    name =
      new Intl.DisplayNames([language], {
        type: 'region'
      }).of(code) ?? code
  } catch {
    // keep the raw code
  }

  return { flag, name }
}
