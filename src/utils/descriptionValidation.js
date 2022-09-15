export const descriptionValidationProps = (t) => {
  return [
    {
      validator: (_, value) =>
        value.trim().length >= 15
          ? Promise.resolve()
          : Promise.reject(new Error(`${t('min_characters')} 15`)),
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
        value.trim()[value.trim().length - 1] === '.' ||
        value.trim()[value.trim().length - 1] === '?'
          ? Promise.resolve()
          : Promise.reject(new Error(t('ends_with'))),
    },
    {
      validator: (_, value) =>
        value.trim()[0] === value.trim()[0]?.toUpperCase()
          ? Promise.resolve()
          : Promise.reject(new Error(t('starts_with'))),
    },
  ]
}
