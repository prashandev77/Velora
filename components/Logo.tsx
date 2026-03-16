'use client';

interface LogoProps {
    isDark?: boolean;
    className?: string;
}

const Logo = ({ isDark = false, className = "h-10 md:h-12 w-auto object-contain transition-all duration-300" }: LogoProps) => (
    <svg 
        viewBox="0 0 342 100.17" 
        className={className}
    >
        <defs>
            <linearGradient id="logo-linear-gradient" x1="53.35" y1="40.2" x2="66.55" y2="79.13" gradientUnits="userSpaceOnUse">
                <stop offset="0.29" stopColor="#34aaf0"/>
                <stop offset="0.3" stopColor="#2ea3eb"/>
                <stop offset="0.35" stopColor="#2196e2"/>
                <stop offset="0.41" stopColor="#198edd"/>
                <stop offset="0.53" stopColor="#178cdb"/>
            </linearGradient>
            <radialGradient id="logo-radial-gradient" cx="54.78" cy="45.2" r="40.45" gradientUnits="userSpaceOnUse">
                <stop offset="0.49" stopColor="#fca138"/>
                <stop offset="0.64" stopColor="#fca339"/>
                <stop offset="0.7" stopColor="#fbaa3b"/>
                <stop offset="0.74" stopColor="#fab540"/>
                <stop offset="0.77" stopColor="#f8c647"/>
                <stop offset="0.78" stopColor="#f7cc49"/>
            </radialGradient>
        </defs>
        
        {/* Main Icon */}
        <g id="image">
            <path fill="url(#logo-linear-gradient)" d="M9.2,48.2s9.13,10.63,29.28,7,50.67-20.19,64-8.24a32.09,32.09,0,0,0-9.74,1.22c-6.61,1.88-11.08,5.51-15.94,9.45,0,0-.85.69-9.54,8.56h0s-29,23.42-46.76-1.84c18,9.47,35.91-.9,35.91-.9a99.5,99.5,0,0,0,12-6.05C74,54.16,77,51.64,83.35,49.16a32.44,32.44,0,0,1,6.5-2s2.58-.48,11.17-.52h0S94.76,42.2,83,46.11,47.93,62,33.85,62.71,12,55.79,9.2,48.2Z"/>
            <path fill="url(#logo-radial-gradient)" d="M10.14,48.16s5.71,2.91,10.79,2.61c-2.64-18.78,11-30.42,11-30.42S49.3,4.79,71.51,15.46C89.22,25,90.59,39.82,90.59,39.82s8-.15,11.64,5.72c-7-5.68-19.13-3.72-19.13-3.72s.15-20.59-23.52-24.7S29.05,35.51,28.47,37.17s-1.27,11.06,2,16.15C15,54.73,10.14,48.16,10.14,48.16Z"/>
            <path fill="#315997" d="M34.14,76.89A38,38,0,0,0,68,80.61c19.08-7,22.59-23.36,22.76-31.74C83.15,51.52,73.05,61,73.05,61S60.41,73.91,47.2,76.94C42.51,78.26,34.14,76.89,34.14,76.89Z"/>
        </g>

        {/* Brand Name */}
        <g id="brand_name" fill={isDark ? "#23344e" : "#FFFFFF"} className="transition-colors duration-300">
            <polygon points="109.96 23.93 112.37 47.48 119.74 47.48 131.8 23.93 124.76 23.93 117.13 41.54 116.61 23.93 109.96 23.93"/>
            <polygon points="153.88 21.96 148.7 47.48 154.56 47.48 160.14 21.96 153.88 21.96"/>
            <path d="M184,29.61l-3.52,17.87h6.33s.88-11.22,3.65-12.07a12.16,12.16,0,0,1,4.79-.55l1-5.81s-4,.43-5.35,1.5a6.67,6.67,0,0,0-1.73,2l.07-2.8Z"/>
            <path d="M135.54,40.65s8.07.68,11-3.48-1.22-9-7.58-8.12a10.84,10.84,0,0,0-9.54,10.72c.1,4.5,1.81,7.3,5.73,7.71s9.14-1.4,9.14-1.4l-.14-4a9.2,9.2,0,0,1-6.75,1.28c-3.92-.79-.79-6.22-.79-6.22A3.37,3.37,0,0,1,138,33.41c2.16-1.62,4.05.8,2.6,2.15A6.1,6.1,0,0,1,137,36.93Z"/>
            <path d="M160.5,40.6s.23-8.55,7.43-11.55,10.7,3.82,10.24,7.73-2.25,9.68-8.18,10.76a26.24,26.24,0,0,0-.63-4.24,11.59,11.59,0,0,0,3.11-5.87c1-4.14-2.61-5-4.24-2.71a9,9,0,0,0-1.37,6.69c.29,1.83.85,2,1.24,2s2.9-.59,2.9-.59l-.9,4.7s-4.36,1-7.32-1.38A8.69,8.69,0,0,1,160.5,40.6Z"/>
            <path d="M210.52,31.73l1-2.09h4.7l-3.59,17.84h-5l-.16-2.12s-1.37,1-2.29,1.82-4.72,1-6.45-1.79S197,36.2,201,31.3c4.88-3.88,8.56-.22,8.56-.22l-.88,3a3.21,3.21,0,0,0-4,1.74,9.57,9.57,0,0,0-.52,6.63c.42,1.27,2.5,1,3.31-.61s2.17-3.73,1.71-5.75-.7-1.87-.7-1.87l1-2.85Z"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M231.51,25.34l-5.14,25.48s-1.22,3.18-6.21,1.66"/>
            <ellipse fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" cx="240.95" cy="39.64" rx="8.16" ry="6.65" transform="translate(147.62 265.29) rotate(-76.87)"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M254.2,31.94l-2.15,10.57s-.83,3.86,2.74,4.49,7.33-4,7.33-4l2.55-11-3.23,15.51"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M269.05,47l2.78-15.06-1.55,9s2.21-6.14,4.46-7.78a5.93,5.93,0,0,1,4.77-.9"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M291.46,47.45s2.44-11.19,2.44-11.68,0-5-4.95-3.68-6.53,7.3-6.62,7.38-1.5,7.53-1.5,7.53l3.09-15.06"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M299.35,39.47s5.48.64,8.28-1.58,1.73-6.85-2.15-5.95a9.22,9.22,0,0,0-7.08,8.76c0,4.23,1,5.28,3.17,6.16s5.67-.56,5.67-.56"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M313,31.84l3.08,15.3,8.66-14.91S313.92,52.66,312,53.67s-4.43,0-4.43,0"/>
            <path fill="none" stroke={isDark ? "#23344e" : "#FFFFFF"} strokeMiterlimit="10" d="M336.35,32.77s-5.67-2.25-8.05.85,2.87,5.18,4,6.26,4.32,3.33.54,6.55c-3,1.41-7.5-.13-7.5-.13"/>
        </g>

        {/* Slogans - Toggle based on isDark */}
        <g id="slogans" className="transition-opacity duration-300">
            {/* Dark/Black Slogan (When nav has white background) */}
            <g id="black_slogan" opacity={isDark ? 1 : 0}>
                <polyline fill="none" stroke="#000" strokeMiterlimit="10" points="126.87 67.91 120.66 67.91 120.12 73 125.45 73 120.02 72.87 119.21 78.9 124.59 78.9"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M128.83,78.9s1.63-10.34,2.38-11.35,2.8-.46,2.8-.46"/>
                <line fill="none" stroke="#000" strokeMiterlimit="10" x1="128.34" y1="70.91" x2="132.38" y2="70.91"/>
                <ellipse fill="none" stroke="#000" strokeMiterlimit="10" cx="142.77" cy="74.92" rx="4.17" ry="3.3" transform="translate(47.32 204.86) rotate(-81.39)"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M150.52,70.28l-1.27,8.62s.51-5.19,1.66-6.73,3.65-1.59,3.65-1.59"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M156.2,70.92h4l-2.33-.12.46-2.61s-1.94,9.38-2,9.94.88,1.25,2.59.88"/>
                <line fill="none" stroke="#000" strokeMiterlimit="10" x1="164.4" y1="66.28" x2="162.06" y2="79.12"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M166.81,74.49a11.21,11.21,0,0,0,4.28-.22c1.47-.59,2.37-2.69.61-3.47s-3.79,1-4.43,2a6.4,6.4,0,0,0,.15,5.25c.88,1.52,4.48.44,4.48.44"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M180.74,71s-3.63-.86-4.53.53,2,3.14,2.68,3.7,2.5,2.63,0,3.92a4.35,4.35,0,0,1-4.65-.62"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M134.24,78.9s1.63-10.34,2.38-11.35,2.81-.46,2.81-.46"/>
                <line fill="none" stroke="#000" strokeMiterlimit="10" x1="133.76" y1="70.91" x2="137.8" y2="70.91"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M188.75,71s-3.64-.86-4.53.53,2,3.14,2.68,3.7,2.49,2.63,0,3.92a4.33,4.33,0,0,1-4.64-.62"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M196.37,70.7h4l-2.33-.13.46-2.61s-1.94,9.39-2,10,.88,1.25,2.59.88"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M204,70.28l-1.27,8.62s.51-5.19,1.66-6.73S208,70.58,208,70.58"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M271.69,70.61l-1.27,8.62s.51-5.19,1.66-6.73,3.64-1.59,3.64-1.59"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M215.47,72s-2.35-2.78-4.63-.23-2,7.56.85,7.37,3.68-4,3.78-4.41.55-4.17.55-4.17l-.78,8.58"/>
                <polyline fill="none" stroke="#000" strokeMiterlimit="10" points="219.32 70.55 220.83 79.13 221.47 79.13 226.29 70.55"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M228.58,74.59s3.32.38,4.66-1.16-.45-3.37-2.33-2.65a4.85,4.85,0,0,0-3.11,5.87c.65,3.32,5.21,1.86,5.21,1.86"/>
                <line fill="none" stroke="#000" strokeMiterlimit="10" x1="239.08" y1="66.31" x2="236.47" y2="78.9"/>
                <circle fill="none" stroke="#000" strokeMiterlimit="10" cx="241.07" cy="78.18" r="0.45"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M250,79.23l2.35-11.65s6.62-.42,5.67,3.36-6.59,2.9-6.59,2.9"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M261.51,70.31s-.91,6.55-1,7.21S263,80,265.08,78c1.76-2,2.47-7.51,2.47-7.51l-1.72,8.9"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M277.82,74.86s3.72.24,4.74-1.46-.27-3.17-2.2-2.6a5,5,0,0,0-3,6.33c1.05,3.11,4.86,1.49,4.86,1.49"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M292.26,70.31s-2.38,11.56-2.63,12.08-1.69.58-2.47.61"/>
                <ellipse fill="none" stroke="#000" strokeMiterlimit="10" cx="292.83" cy="67.59" rx="0.32" ry="0.39"/>
                <ellipse fill="none" stroke="#000" strokeMiterlimit="10" cx="298.46" cy="75.05" rx="4.11" ry="3.62" transform="translate(165.54 352.62) rotate(-78.53)"/>
                <path fill="none" stroke="#000" strokeMiterlimit="10" d="M304.79,70.31,306.51,79l4.93-8.73s-6.39,12-7.24,12.47a3.15,3.15,0,0,1-1.93.22"/>
                <ellipse fill="none" stroke="#000" strokeMiterlimit="10" cx="312.65" cy="78.22" rx="0.53" ry="0.6"/>
            </g>
            {/* Default/Gold Slogan (When nav is transparent over hero or in Footer) */}
            <g id="defalt_slogan" opacity={isDark ? 0 : 1}>
                <polyline fill="none" stroke="#dab363" strokeMiterlimit="10" points="127.27 67.99 121.06 67.99 120.52 73.08 125.85 73.08 120.42 72.95 119.61 78.98 124.99 78.98"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M129.23,79s1.63-10.34,2.38-11.35,2.8-.46,2.8-.46"/>
                <line fill="none" stroke="#dab363" strokeMiterlimit="10" x1="128.74" y1="70.99" x2="132.78" y2="70.99"/>
                <ellipse fill="none" stroke="#dab363" strokeMiterlimit="10" cx="143.17" cy="75" rx="4.17" ry="3.3" transform="translate(47.58 205.33) rotate(-81.39)"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M150.92,70.36,149.65,79s.51-5.19,1.66-6.74S155,70.65,155,70.65"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M156.6,71h4l-2.33-.13.46-2.6s-1.94,9.38-2,9.94.88,1.25,2.59.88"/>
                <line fill="none" stroke="#dab363" strokeMiterlimit="10" x1="164.8" y1="66.36" x2="162.46" y2="79.2"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M167.21,74.57a11.43,11.43,0,0,0,4.28-.22c1.47-.59,2.37-2.69.61-3.48s-3.79,1-4.43,2a6.42,6.42,0,0,0,.15,5.26c.88,1.52,4.48.44,4.48.44"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M181.14,71.05s-3.63-.86-4.53.53,2,3.13,2.68,3.7,2.5,2.63,0,3.92a4.35,4.35,0,0,1-4.65-.62"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M134.64,79s1.63-10.34,2.38-11.35,2.81-.46,2.81-.46"/>
                <line fill="none" stroke="#dab363" strokeMiterlimit="10" x1="134.15" y1="70.99" x2="138.2" y2="70.99"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M189.15,71.05s-3.64-.86-4.53.53,2,3.13,2.68,3.7,2.49,2.63,0,3.92a4.33,4.33,0,0,1-4.64-.62"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M196.77,70.78h4l-2.33-.13.46-2.61S197,77.43,197,78s.89,1.25,2.6.88"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M204.38,70.36,203.11,79s.51-5.19,1.66-6.74,3.64-1.59,3.64-1.59"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M272.09,70.69l-1.27,8.62s.51-5.19,1.66-6.74S276.12,71,276.12,71"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M215.87,72.07s-2.35-2.78-4.63-.23-2,7.56.85,7.37,3.68-4,3.78-4.41.55-4.17.55-4.17l-.78,8.58"/>
                <polyline fill="none" stroke="#dab363" strokeMiterlimit="10" points="219.72 70.63 221.23 79.21 221.87 79.21 226.69 70.63"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M229,74.67s3.32.38,4.66-1.16-.46-3.37-2.33-2.65a4.84,4.84,0,0,0-3.11,5.87c.65,3.32,5.21,1.86,5.21,1.86"/>
                <line fill="none" stroke="#dab363" strokeMiterlimit="10" x1="239.48" y1="66.39" x2="236.87" y2="78.98"/>
                <circle fill="none" stroke="#dab363" strokeMiterlimit="10" cx="241.47" cy="78.25" r="0.45"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M250.37,79.31l2.35-11.65s6.62-.42,5.67,3.36-6.59,2.9-6.59,2.9"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M261.9,70.39s-.9,6.55-1,7.21,2.42,2.47,4.55.49c1.76-2,2.47-7.51,2.47-7.51l-1.72,8.9"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M278.22,74.93s3.71.25,4.74-1.45-.27-3.17-2.2-2.61a5,5,0,0,0-3,6.34c1.05,3.11,4.86,1.49,4.86,1.49"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M292.66,70.39S290.27,82,290,82.47s-1.69.58-2.47.61"/>
                <ellipse fill="none" stroke="#dab363" strokeMiterlimit="10" cx="293.23" cy="67.67" rx="0.32" ry="0.39"/>
                <ellipse fill="none" stroke="#dab363" strokeMiterlimit="10" cx="298.86" cy="75.13" rx="4.11" ry="3.62" transform="translate(165.78 353.07) rotate(-78.53)"/>
                <path fill="none" stroke="#dab363" strokeMiterlimit="10" d="M305.18,70.39l1.73,8.73,4.93-8.73s-6.39,12-7.24,12.47a3.15,3.15,0,0,1-1.93.22"/>
                <ellipse fill="none" stroke="#dab363" strokeMiterlimit="10" cx="313.05" cy="78.3" rx="0.53" ry="0.6"/>
            </g>
        </g>
    </svg>
);

export default Logo;
