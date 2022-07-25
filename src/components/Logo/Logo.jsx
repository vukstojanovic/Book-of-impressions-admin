const VARIANTS = {
  light: ['#0d71b9', '#ef9d03', '#ef6b03', '#e2f3ff', '#e2f3ff'],
  dark: ['#0d71b9', '#ef9d03', '#ef6b03', '#04375b', '#04375b'],
  black: ['#000', '#000', '#000', '#000', '#000'],
  white: ['#fff', '#fff', '#fff', '#fff', '#fff'],
}

export const Logo = ({ variant }) => {
  const colors = variant ? VARIANTS[variant] : VARIANTS.light
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 74">
      <text
        id="o"
        transform="translate(38 59)"
        fill={colors[0]}
        fontSize="61"
        fontFamily="Montserrat-SemiBold, Montserrat"
        fontWeight="600"
      >
        <tspan x="0" y="0">
          o
        </tspan>
      </text>
      <rect
        id="Rectangle_39"
        data-name="Rectangle 39"
        width="7"
        height="44"
        rx="3.5"
        transform="translate(3)"
        fill={colors[1]}
      />
      <text
        id="o-2"
        data-name="o"
        transform="translate(0 59)"
        fill={colors[2]}
        fontSize="61"
        fontFamily="Montserrat-SemiBold, Montserrat"
        fontWeight="600"
      >
        <tspan x="0" y="0">
          o
        </tspan>
      </text>
      <g id="Group_185" data-name="Group 185" transform="translate(-115 -52)">
        <rect
          id="Rectangle_40"
          data-name="Rectangle 40"
          width="8"
          height="33"
          rx="4"
          transform="translate(193 79)"
          fill={colors[3]}
        />
        <rect
          id="Rectangle_41"
          data-name="Rectangle 41"
          width="8"
          height="8"
          rx="4"
          transform="translate(193 69)"
          fill={colors[4]}
        />
      </g>
    </svg>
  )
}
