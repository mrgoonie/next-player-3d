import Cleave from "cleave.js/react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DatePicker, Select, Space, Switch } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useQuill } from "react-quilljs";

import asset from "plugins/assets/asset";
import { makeSlug } from "plugins/utils/Slug";
import NextQuill from "plugins/next-quill";

// [{ type: ValidationType.NOT_EMPTY, errMessage: "Không thể bỏ trống." }]

function hasNumber(str) {
  return /[0-9]/.test(str);
}

function hasLetter(str) {
  return /[a-zA-Z]/.test(str);
}

function hasNumberAndLetter(str) {
  return hasNumber(str) && hasLetter(str);
}

/**
 *
 * @param {*} email string
 * @returns boolean
 * note: username+something@gmail.com is still valid!
 */
function validateEmail(email) {
  // using regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log("validateEmail:", re.test(email));
  return re.test(email);
}

const ValidationType = {
  get NOT_EMPTY() {
    return "not_empty";
  },
  get MIN_LENGTH() {
    return "min_length";
  },
  get EMAIL() {
    return "email";
  },
  get ID_NO() {
    return "id_no";
  },
  get PHONE() {
    return "phone";
  },
  get LETTERS() {
    return "letters";
  },
  get NUMBERS() {
    return "numbers";
  },
  get LETTERS_AND_NUMBERS() {
    return "letters_and_numbers";
  },
  get DATE() {
    return "date";
  },
  get TIME() {
    return "time";
  },
  get DATE_TIME() {
    return "date_time";
  },
};

const InputType = {
  get TEXT() {
    return "text";
  },
  get NUMBER() {
    return "number";
  },
  get PASSWORD() {
    return "password";
  },
};

const InputShape = {
  get DEFAULT() {
    return "default";
  },
  get ROUND() {
    return "round";
  },
  get FLUSH() {
    return "flush";
  },
  get AUTO() {
    return "auto";
  },
};

/**
 * @typedef ValidateCondition
 * @type {object}
 * @property {('not_empty'|'min_length'|'email'|'id_no'|'phone'|'letters'|'numbers'|'letters_and_numbers'|'date'|'time'|'date_time')} type - Validation type.
 * @property {string} [errMessage="Not valid."] - A displayed error message when the condition failed.
 * @property {number} [minLength=1] - A condition of minimum character length.
 * @property {number} [maxLength=0] - A condition of maximum character length.
 */

function validate({
  value = "",
  type = ValidationType.NOT_EMPTY,
  minLength = 1,
  maxLength = 0,
  errMessage = "Not valid.",
}) {
  if (type == ValidationType.MIN_LENGTH) {
    if (value.length < minLength || (maxLength > 0 && value.length > maxLength)) {
      return errMessage;
    }
    return true;
  }

  if (type == ValidationType.EMAIL) {
    if (!validateEmail(value) || (maxLength > 0 && value.length > maxLength)) {
      return errMessage;
    }
    return true;
  }

  if (type == ValidationType.ID_NO) {
    // console.log(value, value.length)
    if (value.length < 9 || value.length > 12) {
      return errMessage;
    }
    return true;
  }

  if (type == ValidationType.PHONE) {
    console.log(value.length);
    if (value.charAt(0) != "0" || value.length < minLength || (maxLength > 0 && value.length > maxLength)) {
      return errMessage;
    }

    return true;
  }

  if (type == ValidationType.LETTERS || value.length < minLength || (maxLength > 0 && value.length > maxLength)) {
    // console.log(value, value.length)
    if (!value || !hasLetter(value)) {
      return errMessage;
    }
    return true;
  }

  if (type == ValidationType.NUMBERS || value.length < minLength || (maxLength > 0 && value.length > maxLength)) {
    // console.log(value, value.length)
    if (!value || isNaN(value)) {
      return errMessage;
    }
    return true;
  }

  if (
    type == ValidationType.LETTERS_AND_NUMBERS ||
    value.length < minLength ||
    (maxLength > 0 && value.length > maxLength)
  ) {
    // console.log(value, value.length)
    if (!value || !hasNumber(value) || !hasLetter(value)) {
      return errMessage;
    }
    return true;
  }

  if (type == ValidationType.NOT_EMPTY) {
    if (!value || value.length == 0 || (maxLength > 0 && value.length > maxLength)) {
      return errMessage;
    }
    return true;
  }

  return true;
}

const Form = ({ children, ...rest }) => {
  return <form {...rest}>{children}</form>;
};

/**
 * @callback onChange
 * @param {String} value - New value of this input
 */

/**
 * @typedef  {Object} InputProps
 * @property  {String} [label]
 * @property  {String} [icon] - "/admin/icons/" + icon + ".svg"
 * @property  {String} [placeholder]
 * @property  {String} [defaultValue]
 * @property  {onChange} [onChange]
 * @property  {String} [marginBottom]
 * @property  {('default'|'round'|'flush'|'auto')} [shape="default"]
 * @property  {('text'|'number'|'password')} [type="text"]
 * @property  {ValidateCondition[]} [validateConditions=[]]
 * @property  {React.ElementRef} ref
 */

/**
 * @type  {React.FC<InputProps>}
 */
const Input = forwardRef(
  (
    {
      children,
      label,
      icon,
      placeholder,
      defaultValue,
      onChange,
      marginBottom,
      shape = InputShape.DEFAULT,
      type = InputType.TEXT,
      validateConditions = [],
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef();
    const [error, setError] = useState();
    // const [conditions, setConditions] = useState(validateConditions);

    const onValueChange = (e) => {
      // console.log('inputRef.current.value', inputRef.current.value)
      if (onChange) onChange(inputRef.current.value);
    };

    const isValid = () => {
      let isValid;
      for (var i = 0; i < validateConditions.length; i++) {
        const condition = validateConditions[i];
        isValid = validate({
          value: inputRef.current.value,
          type: condition.type,
          minLength: condition.minLength,
          maxLength: condition.maxLength,
          errMessage: condition.errMessage,
        });
        if (typeof isValid != "boolean") {
          setError(isValid); // display error message...
          break;
        }
      }
      if (isValid == true) {
        setError(null);
        return true;
      } else {
        return false;
      }
    };

    useEffect(() => {
      // ref.current.addE
    }, []);

    useImperativeHandle(ref, () => ({
      get value() {
        return inputRef.current.value;
      },
      set value(val) {
        inputRef.current.value = val;
      },
      get isValid() {
        return isValid();
      },
    }));

    const keyUpHandler = (e) => {
      // console.log(e.key, e.keyCode);
      // console.log(ref.current.value);
      isValid();
    };

    const errClass = error && error.length > 0 ? "error" : "";
    let requiredSpan = 'none';
    validateConditions.forEach(function(validate) {
      if(validate.type == ValidationType.NOT_EMPTY || validate.type == ValidationType.EMAIL) {
        requiredSpan = true;
      }
    });

    return (
      <div className="form-group">
        <style jsx>{`
          .form-group {
            ${marginBottom ? `margin-bottom: ${marginBottom};` : ""}
            ${icon ? `padding-left: 26px;` : ""}
            ${icon ? `background: url(${asset("/admin/icons/" + icon + ".svg")}) no-repeat;` : ""}
            background-position: left center;
          }

          label {
            display: inline-block;
          }
          .label {
            margin-bottom: 0.5rem;
          }
          label.error {
            font-size: 12px;
          }
          .error {
            display: block;
            color: red;

            margin-top: 5px;
          }
          .label.hide,
          .error.hide {
            display: none;
          }
        `}</style>
        <label className={`label ${label ? "" : "hide"}`}>{label}
        <span style={{color: "red", display: requiredSpan}}>*</span>
        </label>
        <input
          className={`form-control ${errClass} ${shape}`}
          type={type}
          placeholder={placeholder}
          onKeyUp={keyUpHandler}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={onValueChange}
          {...rest}
        ></input>
        <label className={`error ${label ? "" : "hide"}`}>{error}</label>
        {children}
      </div>
    );
  }
);

/**
 * @typedef  {Object} TextAreaProps
 * @property  {String} [label]
 * @property  {String} [placeholder]
 * @property  {String} [defaultValue]
 * @property  {Boolean} [autoSize=false]
 * @property  {String} [height="100px"]
 * @property  {onChange} [onChange]
 * @property  {('default'|'round'|'flush'|'auto')} [shape="default"]
 * @property  {('text'|'number'|'password')} [type="text"]
 * @property  {ValidateCondition[]} [validateConditions=[]]
 * @property  {React.ElementRef} ref
 */

/**
 * @type  {React.FC<TextAreaProps>}
 */
const TextArea = forwardRef(
  (
    {
      children,
      label,
      defaultValue,
      height = "100px",
      autoSize = false,
      shape = InputShape.DEFAULT,
      type = InputType.TEXT,
      placeholder,
      validateConditions = [],
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef();
    const [error, setError] = useState();

    const handleChange = (e) => {
      if (onChange) onChange(inputRef.current.value);
    };

    const isValid = () => {
      let isValid;
      for (var i = 0; i < validateConditions.length; i++) {
        const condition = validateConditions[i];
        isValid = validate({
          value: inputRef.current.value,
          type: condition.type,
          minLength: condition.minLength,
          maxLength: condition.maxLength,
          errMessage: condition.errMessage,
        });
        if (typeof isValid != "boolean") {
          setError(isValid); // display error message...
          break;
        }
      }
      if (isValid == true) {
        setError(null);
        return true;
      } else {
        return false;
      }
    };

    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    useEffect(() => {
      if (autoSize == true) {
        let element = inputRef.current;
        element.setAttribute("style", "height:" + element.scrollHeight + "px; overflow-y:hidden;");
        element.addEventListener("input", OnInput, false);
      }
    }, [autoSize]);

    useImperativeHandle(ref, () => ({
      get value() {
        return inputRef.current.value;
      },
      get isValid() {
        return isValid();
      },
    }));

    const keyUpHandler = (e) => {
      // console.log(e.key, e.keyCode);
      // console.log(ref.current.value);
      isValid();
    };

    const errClass = error && error.length > 0 ? "error" : "";

    return (
      <div className="form-group">
        <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
          .text-area {
            ${height ? `height: ${height};` : ""}
          }
        `}</style>
        <label className="label">{label}</label>
        <textarea
          className={`text-area form-control ${errClass} ${shape}`}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onKeyUp={keyUpHandler}
          onChange={handleChange}
          ref={inputRef}
          {...rest}
        />
        <label className="error">{error}</label>
        {children}
      </div>
    );
  }
);

/**
 * @typedef  {Object} QuillEditorProps
 * @property  {String} [label]
 * @property  {String} [placeholder]
 * @property  {String} [defaultValue]
 * @property  {number} [height=400]
 * @property  {onChange} [onChange]
 * @property  {('text'|'number'|'password')} [type="text"]
 * @property  {ValidateCondition[]} [validateConditions=[]]
 * @property  {React.ElementRef} ref
 */

/**
 * @type  {React.FC<QuillEditorProps>}
 */
const QuillEditor = forwardRef(
  (
    {
      children,
      defaultValue,
      height = 400,
      label,
      type = InputType.TEXT,
      placeholder,
      validateConditions = [],
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef();
    // const { quill, quillRef } = useQuill();
    const [error, setError] = useState();
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const isValid = () => {
      let isValid;
      for (var i = 0; i < validateConditions.length; i++) {
        const condition = validateConditions[i];
        isValid = validate({
          value: currentValue,
          type: condition.type,
          minLength: condition.minLength,
          maxLength: condition.maxLength,
          errMessage: condition.errMessage,
        });
        if (typeof isValid != "boolean") {
          setError(isValid); // display error message...
          break;
        }
      }
      if (isValid == true) {
        setError(null);
        return true;
      } else {
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      get value() {
        return currentValue;
      },
      get isValid() {
        return isValid();
      },
    }));

    const errClass = error && error.length > 0 ? "error" : "";
    const onEditorChange = (value) => {
      // console.log(quill.root.innerHTML);
      setCurrentValue(value);
      if (onChange) onChange(value);
    };

    // useEffect(() => {
    //   // console.log("rerendered...")
    //   if (quill) {
    //     quill.on("text-change", onEditorChange);
    //     return () => quill.off("text-change", onEditorChange);
    //   }
    // }, [quill]);

    return (
      <div className="form-group">
        <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
          .hide {
            display: none;
          }
        `}</style>
        <label className={`label ${label ? "" : "hide"}`}>{label}</label>
        <NextQuill ref={inputRef} onChange={onEditorChange}>
          <div style={{ height: `${height}px` }} />
        </NextQuill>
        {/* <div>
          <div className="quill-editor" ref={quillRef} style={{ height: `${height}px` }} />
        </div> */}
        <label className="error">{error}</label>
      </div>
    );
  }
);

/**
 * @typedef  {Object} TextEditorProps
 * @property  {String} [label]
 * @property  {String} [placeholder]
 * @property  {String} [defaultValue]
 * @property  {number} [height=400]
 * @property  {onChange} [onChange]
 * @property  {('text'|'number'|'password')} [type="text"]
 * @property  {ValidateCondition[]} [validateConditions=[]]
 * @property  {React.ElementRef} ref
 */

/**
 * @type  {React.FC<TextEditorProps>}
 */
const TextEditor = forwardRef(
  (
    {
      children,
      defaultValue,
      height = 300,
      label,
      type = InputType.TEXT,
      placeholder,
      validateConditions = [],
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef();
    const [error, setError] = useState();
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const isValid = () => {
      let isValid;
      for (var i = 0; i < validateConditions.length; i++) {
        const condition = validateConditions[i];
        isValid = validate({
          value: currentValue,
          type: condition.type,
          minLength: condition.minLength,
          maxLength: condition.maxLength,
          errMessage: condition.errMessage,
        });
        if (typeof isValid != "boolean") {
          setError(isValid); // display error message...
          break;
        }
      }
      if (isValid == true) {
        setError(null);
        return true;
      } else {
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      get value() {
        return currentValue;
      },
      get isValid() {
        return isValid();
      },
    }));

    const errClass = error && error.length > 0 ? "error" : "";
    const onEditorChange = (content, editor) => {
      setCurrentValue(content);
      if (onChange) onChange(content);
    };

    return (
      <div className="form-group">
        <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
          .hide {
            display: none;
          }
        `}</style>
        <label className={`label ${label ? "" : "hide"}`}>{label}</label>
        <Editor
          ref={inputRef}
          id="text-editor"
          initialValue={defaultValue}
          apiKey="tglg10xhq02cxgmaixdccuyfwkkvvem203eqoqlftdk2j48t"
          init={{
            height: height,
            menubar: false,
            entity_encoding: "raw",
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline forecolor backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={onEditorChange}
        />
        <label className="error">{error}</label>
      </div>
    );
  }
);

const InputMask = forwardRef(
  (
    {
      children,
      label,
      maskOption,
      shape = InputShape.DEFAULT,
      placeholder = "DD/MM/YYYY",
      validateConditions = [],
      ...rest
    },
    ref
  ) => {
    let inputRef;
    const [error, setError] = useState();
    // const [conditions, setConditions] = useState(validateConditions);

    const handleChange = (e) => {
      if (onChange && inputRef) onChange(inputRef.current.value);
    };

    const isValid = () => {
      let isValid;
      for (var i = 0; i < validateConditions.length; i++) {
        const condition = validateConditions[i];
        isValid = validate({
          value: inputRef.current.value,
          type: condition.type,
          minLength: condition.minLength,
          maxLength: condition.maxLength,
          errMessage: condition.errMessage,
        });
        if (typeof isValid != "boolean") {
          setError(isValid); // display error message...
          break;
        }
      }
      if (isValid == true) {
        setError(null);
        return true;
      } else {
        return false;
      }
    };

    useEffect(() => {
      // ref.current.addE
    }, []);

    useImperativeHandle(ref, () => ({
      get value() {
        return inputRef.current.value;
      },
      get isValid() {
        return isValid();
      },
    }));

    const keyUpHandler = (e) => {
      // console.log(e.key, e.keyCode);
      // console.log(ref.current.value);
      isValid();
    };

    const errClass = error && error.length > 0 ? "error" : "";

    return (
      <div className="form-group">
        <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
        `}</style>
        {label ? <label className="label">{label}</label> : null}
        <Cleave
          className={`form-control ${errClass} ${shape}`}
          onChange={handleChange}
          // onKeyUp={keyUpHandler}
          placeholder={placeholder}
          options={maskOption}
          htmlRef={(_ref) => (inputRef = _ref)}
          {...rest}
        />
        <label className="error">{error}</label>
        {children}
      </div>
    );
  }
);

const InputDate = ({
  maskOption = { date: true, datePattern: ["d", "m", "Y"] },
  placeholder = "DD/MM/YYYY",
  ...rest
}) => {
  return <InputMask maskOption={maskOption} placeholder={placeholder} {...rest} />;
};

const InputTime = ({
  maskOption = { time: true, timePattern: ["h", "m", "s"] },
  placeholder = "HH:MM:SS",
  ...rest
}) => {
  return <InputMask maskOption={maskOption} placeholder={placeholder} {...rest} />;
};

const FormDatePicker = ({ placeholder, onChange }) => {
  const inputRef = useRef();
  const handleChange = (e) => {
    if (onChange) onChange(inputRef.current.value);
  };
  return <DatePicker ref={inputRef} onChange={handleChange} />;
};

const Switcher = ({ label, active = true, onChange, ...rest }) => {
  const [isActive, setIsActive] = useState(active);

  const handleChange = (checked) => {
    if (onChange) onChange(checked);
  };

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div className="form-group">
      {label}
      <Switch checked={isActive} onChange={handleChange} {...rest} />
    </div>
  );
};

const InputSelect = forwardRef(({ children, label, defaultValue, ...rest }, ref) => {
  const inputRef = useRef();
  const { onChange } = rest;
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useImperativeHandle(ref, () => ({
    get value() {
      return currentValue;
    },
    set value(val) {
      setCurrentValue(val);
    },
    reload() {
      setCurrentValue(defaultValue);
    },
  }));

  const handleChange = (e) => {
    // console.log(e);
    setCurrentValue(inputRef.current.value);
    if (onChange) onChange(inputRef.current.value);
  };

  const handleSelect = (val) => {
    // console.log(val);
    setCurrentValue(val);
    if (onChange) onChange(val);
  };

  // useEffect(() => {
  //   setCurrentValue(defaultValue);
  // }, [defaultValue]);

  return (
    <div className="form-group">
      {label}
      <Select ref={inputRef} value={currentValue} onChange={handleChange} onSelect={handleSelect} {...rest}>
        {children}
      </Select>
    </div>
  );
});

const InputSlug = ({ label, name = "", defaultValue, onChange, ...rest }) => {
  const inputRef = useRef();
  const [slug, setSlug] = useState(makeSlug(name));

  const onInputChange = (e) => {
    // console.log(ref.current.value);
    const newSlug = makeSlug(inputRef.current.value);
    setSlug(newSlug);
    if (onChange) onChange(newSlug);
  };

  useEffect(() => {
    // setSlug(makeSlug(name));
    const newSlug = makeSlug(name);
    inputRef.current.value = newSlug;
    if (onChange) onChange(newSlug);
  }, [name]);

  return <Input ref={inputRef} label={label} defaultValue={slug} onChange={onInputChange} />;
};

export {
  InputType,
  InputShape,
  ValidationType,
  Input,
  TextArea,
  TextEditor,
  QuillEditor,
  InputMask,
  InputDate,
  InputTime,
  InputSlug,
  FormDatePicker,
  InputSelect,
  Switcher,
};

export default Form;
