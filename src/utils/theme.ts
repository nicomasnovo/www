interface Theme {
  colors: string[]
  base: string
}

// export const _day = 6

export function getThemeClass({ colors, base }: Theme): string {
  const day = new Date().getDay()
  // const day = _day

  return `${base} ${colors[day]}`
}
