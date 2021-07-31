import ButtonGroup from "components/dashkit/ButtonGroup";
import AdminIcon from "components/dashkit/Icon";
import DashkitButton, { ButtonSize, ButtonType } from "components/dashkit/Buttons";
import { useEffect, useState } from "react";

const AdminPagination = ({
  children,
  type = ButtonType.PRIMARY,
  size = ButtonSize.NORMAL,
  total = 0,
  defaultCurrent = 1,
  onChange,
  pageSize = 5,
  displayPages = 5,
}) => {
  const [current, setCurrent] = useState(defaultCurrent);
  const [pageBtns, setPageBtns] = useState([]);
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();

  const totalPages = Math.ceil(total / pageSize);

  const prevClick = (e) => {
    let prevPage = current - 1;
    if (prevPage < 1) prevPage = 1;
    setCurrent(prevPage);
  };

  const nextClick = (e) => {
    let nextPage = current + 1;
    if (nextPage > totalPages) nextPage = totalPages;
    setCurrent(nextPage);
  };

  useEffect(() => {
    let tmps = [];

    let amountLeft = Math.floor((displayPages - 1) / 2);
    let amountRight = Math.ceil((displayPages - 1) / 2);
    let addToRight = 0;
    let addToLeft = 0;

    let start = current - amountLeft;

    if (start < 1) addToRight = Math.abs(start - 1);

    let end = current + amountRight + addToRight;

    if (end > totalPages - amountRight + 1) {
      end = totalPages;
      start = totalPages - displayPages + 1;
    }

    if (start < 1) start = 1;

    for (let i = start; i <= end; i++) {
      tmps.push(
        <DashkitButton key={`page-item-${i}`} onClick={() => setCurrent(i)} className={current == i ? "active" : ""}>
          {i}
        </DashkitButton>
      );
    }

    if (current > amountLeft + 1) {
      setPrev(<DashkitButton key="prevPage">...</DashkitButton>);
    } else {
      setPrev(null);
    }

    if (current <= totalPages - amountRight - 1) {
      setNext(<DashkitButton key="nextPage">...</DashkitButton>);
    } else {
      setNext(null);
    }

    if (totalPages <= pageSize) {
      setPrev(null);
      setNext(null);
    }

    setPageBtns(tmps);

    if (onChange) onChange({ current, totalPages, total });
  }, [current]);

  return (
    <ButtonGroup type={type} size={size}>
      <DashkitButton key="prev-btn" onClick={prevClick}>
        <AdminIcon name="arrow-left" />
      </DashkitButton>
      {prev}
      {pageBtns}
      {next}
      <DashkitButton key="next-btn" onClick={nextClick}>
        <AdminIcon name="arrow-right" />
      </DashkitButton>
    </ButtonGroup>
  );
};

export default AdminPagination;
