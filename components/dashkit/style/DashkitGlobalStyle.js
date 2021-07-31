import Color from "plugins/utils/Color";

const DefaultStyles = {
  fontFamily: "SofiaPro",
  colors: {
    primary: "#2C7BE5",
    secondary: "#6e84a3",
    success: "#00D97E",
    danger: "#E63757",
    darkest: "#12263F",
    brightest: "#E3EBF6",
    warning: "#f6c343",
    info: "#39afd1",
    border: "#E3EBF6",
    borderBold: "#d2ddec",
    disabled: "#95aac9",
  },
  container: {
    maxWidthXS: 350,
    maxWidthSM: 550,
    maxWidthMD: 900,
    maxWidthLG: 1100,
  },
};

const DashkitGlobalStyle = () => {
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
          margin: initial;
        }
        .code,
        .code span {
          font-family: "Courier New", Courier, monospace !important;
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
          border: 1px solid ${DefaultStyles.colors.primary};
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
          color: ${DefaultStyles.colors.primary};
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
          .admin-icon {
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
        .ant-select-single {
          display: block;
          width: 100%;
          height: calc(1.5em + 1rem + 2px);
          line-height: 1.5;
          margin-top: 8px;

          .ant-select-selector {
            border-radius: 0.375rem !important;
            border: 1px solid ${DefaultStyles.colors.borderBold} !important;
            height: 100% !important;
          }

          .ant-select-selection-item {
            line-height: 2.5rem !important;
          }
        }

        .btn .admin-icon.svg {
          vertical-align: middle;
        }
      `}</style>
    </>
  );
};

export { DefaultStyles };

export default DashkitGlobalStyle;
