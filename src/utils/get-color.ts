const getColorName = (color: string | null | undefined) => {
  switch (color) {
    case 'white':
        return 'customWhite'
    case 'black':
        return 'customBlack'
    case 'brown':
      return 'customBrown'
    default:
      return color
  }
}

export default getColorName