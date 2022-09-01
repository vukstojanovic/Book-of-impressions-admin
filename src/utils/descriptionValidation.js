export const descriptionValidationProps = (t) => {
  return [
    {
      validator: (_, value) =>
        value.trim().length >= 20
          ? Promise.resolve()
          : Promise.reject(new Error(`${t('min_characters')} 20`)),
    },
    {
      validator: (_, value) =>
        value
          .trim()
          .split('')
          .filter((letter) => letter === ' ').length >= 2
          ? Promise.resolve()
          : Promise.reject(new Error(`${t('min_spaces')} 2`)),
    },
    {
      validator: (_, value) =>
        value[value.length - 1] === '.' || value[value.length - 1] === '?'
          ? Promise.resolve()
          : Promise.reject(new Error(t('ends_with'))),
    },
    {
      validator: (_, value) =>
        value[0] === value[0]?.toUpperCase()
          ? Promise.resolve()
          : Promise.reject(new Error(t('starts_with'))),
    },
  ]
}
