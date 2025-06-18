interface Theme {
  colors: string[]
  base: string
}

export function getThemeClass({ colors, base }: Theme): string {
  const day = new Date().getDay()

  return `${base} ${colors[day]}`
}
