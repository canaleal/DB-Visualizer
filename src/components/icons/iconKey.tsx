
import { IIconProps } from "./types"
const IconKey = ({ fillColor, className, size = 24 }: IIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"

        viewBox="0 0 512 512"
        height={size}
        width={size}
        fill={fillColor}
        className={className}
    >
        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zm40-256a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
    </svg>
)
export default IconKey