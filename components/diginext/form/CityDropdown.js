import ApiCall from "modules/ApiCall";
import useArray from "plugins/next-hooks/useArray";
import React, { useEffect, useRef, useState } from "react";

const CityDropdown = ({
  label = "TỈNH/ THÀNH PHỐ",
  name = "province",
  className = "",
  style = {},
  onChange,
  defaultValue,
  inputRef,
}) => {
  const [currentSelect, setCurrentSelect] = useState("");
  const list = useArray([]);

  const fetchData = async () => {
    try {
      const res = await ApiCall({
        path: "/api/v1/zone-provinces?get=true&orderBy=name&order=1",
      });
      // console.log(res.data);
      list.setValue(res.data);
    } catch (e) {
      console.warn("Không tìm thấy dữ liệu:", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <style jsx>{`
        select {
          .black {
            color: black;
          }
        }
      `}</style>
      {label ? <label>{label}</label> : null}
      <select
        name={name}
        className={`province ${className} ${currentSelect != "" ? "black" : ""}`}
        style={style}
        onChange={(value) => {
          setCurrentSelect(value.currentTarget.value);
          if (onChange) onChange(value.currentTarget.value);
        }}
        ref={inputRef}
      >
        <option value="" className="not-selected">
          - Vui lòng chọn -
        </option>
        {list.value.map((item, index) => (
          <option key={`province-option-${index}`} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CityDropdown;
