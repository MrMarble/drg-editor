import { SVGProps } from "react"

const LabelIcon = ({fill = "#afafaf", ...props}: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="data"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      d="m844.25 519.29-237.5 479.85c-1.88 3.81-5.17 6.12-8.7 6.12H188.38c-5.68 0-10.29-5.87-10.29-13.11V31.85c0-7.24 4.61-13.11 10.29-13.11h409.67c3.53 0 6.82 2.31 8.7 6.12l237.5 479.85a16.86 16.86 0 0 1 0 14.58Z"
      style={{
        fill: fill,
      }}
    />
  </svg>
)

export default LabelIcon
