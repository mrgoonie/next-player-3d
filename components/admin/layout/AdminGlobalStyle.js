import Color from "plugins/utils/Color";

const DefaultStyles = {
	fontFamily: "SofiaPro",
	colors: {
		primary: "#2C7BE5",
		secondary: "#6e84a3",
		success: "#00D97E",
		danger: "#E63757",
		darker: "#9ba8b9",
		darkest: "#12263F",
		brighter: "#e1e8f5",
		brightest: "#f4f8ff",
		warning: "#f6c343",
		info: "#39afd1",
		border: "#E3EBF6",
		borderBold: "#c4d0e0",
		disabled: "#95aac9",
	},
	container: {
		maxWidthXS: 350,
		maxWidthSM: 550,
		maxWidthMD: 728,
		maxWidthLG: 1100,
	},
};

const AdminGlobalStyle = () => {
	return (
		<>
			<style jsx global>{`
				html,
				body {
					position: relative;
					background-color: #f9fbfd;
					font-family: ${DefaultStyles.fontFamily};
					color: ${DefaultStyles.colors.darkest};
				}
				* {
					font-family: ${DefaultStyles.fontFamily};
				}
				p {
					color: ${DefaultStyles.colors.secondary};
				}
				.code,
				.code span {
					font-family: "Courier New", Courier, monospace !important;
					// color: #e1e8f5;
				}

				ol {
					padding-inline-start: 0px;
				}

				*::placeholder {
					opacity: 1;
					color: ${DefaultStyles.colors.disabled};
				}

				code.hljs {
					padding: 1.2rem 1.5rem;
				}

				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					font-weight: bold;
				}
				a,
				a:hover,
				a:active {
					color: black;
				}
				pre {
					margin: 0;
				}

				.form-group {
					position: relative;
					margin-bottom: 1.375rem;
				}

				.form-control {
					display: block;
					width: 100%;
					height: calc(1.5em + 1rem + 2px);
					padding: 0.5rem 0.75rem;
					font-weight: 300;
					line-height: 1.5;
					color: #12263f;
					background-clip: padding-box;
					border: 1px solid ${DefaultStyles.colors.borderBold};
					border-radius: 0.375rem;
					transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
					outline: none;
				}

				.form-control:hover,
				.form-control:active,
				.form-control:focus {
					border: 1px solid #2c7be5;
				}

				.form-control.error,
				.form-control.error:active,
				.form-control.error:hover,
				.form-control.error:focus {
					border: 1px solid red;
				}

				.form-control.round {
					border-radius: 20rem;
				}

				.form-control.flush,
				.form-control.flush:valid,
				.form-control.flush:invalid,
				.form-control.flush:not([value=""]) .form-control.flush:placeholder-shown,
				.form-control.flush:not(:placeholder-shown),
				.form-control.flush:-webkit-autofill,
				.form-control.flush:-webkit-autofill:hover,
				.form-control.flush:-webkit-autofill:focus {
					padding: 0.5rem 0;
					border: none;
					transition: none;
					background: none;
					background-color: none;
					-webkit-box-shadow: 0 0 0px 1000px #fff inset;
				}
				.form-control.flush:hover,
				.form-control.flush:active,
				.form-control.flush:focus {
					border: none;
					background: none;
				}

				.form-control.auto {
					height: auto;
					padding: 0;
					border: none;
					transition: none;
					background: none;
					-webkit-box-shadow: 0 0 0px 1000px #fff inset;
				}
				.form-control.auto:hover,
				.form-control.auto:active,
				.form-control.auto:focus {
					border: none;
					background: none;
				}

				.tox-tinymce-aux {
					position: fixed !important;
					z-index: 1600;
				}

				a {
					color: #2c7be5;
					transition: color 0.15s ease-in-out;
				}
				a:hover,
				a:active {
					color: ${DefaultStyles.colors.secondary};
				}

				.ant-table-wrapper .ant-table-pagination.ant-pagination {
					justify-content: flex-start;
					padding-left: 20px;
				}
				.helper-hide {
					display: none;
				}

				.dropdown-menu {
					min-width: 10rem;
					padding: 0.5rem 0;
					margin: 0 0 0;
					font-size: 0.9375rem;
					color: #12263f;
					text-align: left;
					list-style: none;
					background-color: #fff;
					background-clip: padding-box;
					border: 1px solid rgba(18, 38, 63, 0.1);
					border-radius: 0.375rem;
				}

				.dropdown-menu-item {
					display: block;
					width: 100%;
					padding: 0.375rem 1.5rem;
					clear: both;
					font-weight: 400;
					color: ${DefaultStyles.colors.secondary};
					text-align: inherit;
					white-space: nowrap;
					background-color: transparent;
					border: 0;
					transition: all 0.25s;
				}
				.dropdown-menu-item:hover,
				.dropdown-menu-item:active {
					${`color: ${Color.hexDarken(DefaultStyles.colors.secondary, 0.8)};`}
				}

				.sidebar li {
					display: block;
				}
				.ant-menu-item,
				.ant-menu-submenu {
					.anticon {
						vertical-align: middle;
					}
					.admin-icon {
						vertical-align: text-bottom !important;
						margin-right: 10px;
					}
				}
				.ant-menu-sub.ant-menu-inline .ant-menu-item {
					height: auto;
					line-height: normal;
					padding-top: 0.4rem;
					padding-bottom: 0.4rem;
				}
				.ant-menu,
				.ant-menu-inline {
					.ant-menu-item {
						margin: 0 !important;
					}
				}

				.ant-menu .ant-menu-item,
				.ant-menu .ant-menu-item a,
				.ant-menu-submenu,
				.ant-menu-submenu i {
					color: ${DefaultStyles.colors.secondary};
				}
				.ant-menu-submenu i,
				.ant-menu-submenu i::before,
				.ant-menu-submenu i::after {
					color: ${DefaultStyles.colors.secondary};
					background: ${DefaultStyles.colors.secondary};
				}

				.ant-select,
				.ant-input-number {
					margin-top: 0;
					width: 100%;
					height: calc(1.5em + 0.7rem + 0px);
					border-radius: 6px !important;
				}

				.ant-select-focused .ant-select-selector,
				.ant-select-selector:focus,
				.ant-select-selector:active,
				.ant-select-open .ant-select-selector {
					//border-color: transparent !important;
					box-shadow: none !important;
				}
				.ant-select .ant-select-selection-item,
				.ant-select-single .ant-select-selection-item {
					line-height: 2.2rem !important;
				}

				.ant-input {
					border-radius: 6px !important;
					border: none;
					background-color: ${DefaultStyles.colors.brighter};
					outline: none;
				}
				.suffix .ant-input {
					border-radius: 6px 0 0 6px !important;
				}
				.prefix .ant-input {
					border-radius: 0 6px 6px 0 !important;
				}
				.suffix.prefix .ant-input {
					border-radius: 0 !important;
				}
				.ant-input::placeholder {
					color: ${DefaultStyles.colors.disabled};
				}
				.ant-input:focus,
				.ant-input.selected,
				.ant-input:active {
					border-color: transparent !important;
					box-shadow: none !important;
					outline: none !important;
				}

				.ant-input-group-addon {
					border: none;
					background-color: ${DefaultStyles.colors.borderBold};
					overflow: hidden;
				}
				.ant-input-group-addon:first-child {
					border-radius: 6px 0 0 6px;
				}
				.ant-input-group-addon:last-child {
					border-radius: 0 6px 6px 0;
				}

				.ant-input-search-button {
					height: 30px;
				}
				.ant-input-search .ant-input {
					border-radius: 6px 0 0 6px !important;
				}

				.step-content-title-input.ant-input {
					padding-left: 0;
					background-color: transparent;
					font-size: 1.2rem;
					font-weight: bold;
				}

				.btn .admin-icon.svg {
					vertical-align: middle;
				}

				.app-icon {
					border-radius: 200px;
					background-color: ${DefaultStyles.colors.primary};
					display: inline-block;
					position: relative;
					color: white;
					vertical-align: middle;

					.icon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.admin-list-item {
					padding: 10px 15px;
					background-color: white;
					border-radius: 8px;
					margin-bottom: 5px;

					.ant-list-item-meta-title {
						font-size: 1.2rem;
						margin-bottom: 0;
					}
				}
			`}</style>
		</>
	);
};

export { DefaultStyles };

export default AdminGlobalStyle;
