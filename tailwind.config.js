/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{html,js}"],
	theme: {
		screens: {
			xs: "363px",
			"xs-mid": "433px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px"
		},
		backgroundSize: {
			auto: "auto",
			cover: "cover",
			contain: "contain",
			part: "75%",
			full: "100%"
		},
		extend: {}
	},
	plugins: []
};
