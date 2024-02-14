import React from "react";

export function Card() {
	return (
		<svg
			width="20"
			height="16"
			viewBox="0 0 20 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				opacity="0.3"
				x="2"
				y="2"
				width="16"
				height="2"
				fill="#494949"
			/>
			<rect
				opacity="0.3"
				x="2"
				y="8"
				width="16"
				height="6"
				fill="#494949"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 0H2C0.89 0 0.01 0.89 0.01 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM18 14H2V8H18V14ZM2 4H18V2H2V4Z"
				fill="#494949"
			/>
		</svg>
	);
}
export function CardActive() {
	return (
		<svg
			width="20"
			height="16"
			viewBox="0 0 20 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				opacity="0.3"
				x="2"
				y="2"
				width="16"
				height="2"
				fill="#EC5B24"
			/>
			<rect
				opacity="0.3"
				x="2"
				y="8"
				width="16"
				height="6"
				fill="#EC5B24"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 0H2C0.89 0 0.01 0.89 0.01 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM18 14H2V8H18V14ZM2 4H18V2H2V4Z"
				fill="#EC5B24"
			/>
		</svg>
	);
}
