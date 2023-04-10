const getAccessibleTextColor = (backgroundColor: string | null | undefined, colorMode: string) => {
  const darkTextColor = 'gray.700'
  const lightTextColor = 'customWhite.200'

  switch (true) {
    case (backgroundColor === 'customWhite' && colorMode === 'dark'):
      return darkTextColor  
    case (backgroundColor === 'gray' && colorMode === 'dark'):
      return darkTextColor  
    case (backgroundColor === 'yellow' && colorMode === 'dark'):
      return darkTextColor  
    case (backgroundColor === 'customBlack' && colorMode === 'light'):
      return lightTextColor
    default:
      return 'unset'
  }
}

export default getAccessibleTextColor