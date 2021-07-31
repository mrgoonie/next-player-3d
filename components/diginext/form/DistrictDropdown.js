import ApiCall from "modules/ApiCall";
import useArray from "plugins/next-hooks/useArray";
import React, { useEffect, useRef, useState } from "react";

const DistrictDropdown = ({
  label = "QUẬN/ HUYỆN",
  name = "district",
  provinceId,
  className = "",
  style = {},
  onChange,
  defaultValue,
  inputRef,
}) => {
  const [currentSelect, setCurrentSelect] = useState("");
  const list = useArray([]);

  const fetchData = async (provinceId) => {
    if (!provinceId) {
      list.setValue([]);
      return;
    }

    try {
      const res = await ApiCall({
        path: `/api/v1/zone-districts?get=true&zoneProvince=${provinceId}`,
      });
      // console.log(res.data);
      list.setValue(res.data);
    } catch (e) {
      console.warn("Không tìm thấy dữ liệu:", e);
    }
  };

  useEffect(() => {
    fetchData(provinceId);
  }, [provinceId]);

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
        className={`district ${className} ${currentSelect != "" ? "black" : ""}`}
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
          <option key={`district-option-${index}`} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default DistrictDropdown;
