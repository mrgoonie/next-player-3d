import { useCallback, useMemo, useState } from "react";

function useArrayArray(initial) {
  const [value, setValue] = useState(initial);
  const push = useCallback((a) => {
    setValue((v) => [...v, ...(Array.isArray(a) ? a : [a])]);
  }, []);
  const unshift = useCallback((a) => setValue((v) => [...(Array.isArray(a) ? a : [a]), ...v]), []);
  const pop = useCallback(() => setValue((v) => v.slice(0, -1)), []);
  const shift = useCallback(() => setValue((v) => v.slice(1)), []);
  const move = useCallback(
    (from, to) =>
      setValue((it) => {
        const copy = it.slice();
        copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
        return copy;
      }),
    []
  );
  const clear = useCallback(() => setValue(() => []), []);
  const removeById = useCallback(
    // @ts-ignore not every array that you will pass down will have object with id field.
    (id) => setValue((arr) => arr.filter((v) => v && v.id !== id)),
    []
  );
  const removeIndex = useCallback(
    (index) =>
      setValue((v) => {
        const copy = v.slice();
        copy.splice(index, 1);
        return copy;
      }),
    []
  );
  const modifyById = useCallback(
    (id, newValue) =>
      // @ts-ignore not every array that you will pass down will have object with id field.
      setValue((arr) => arr.map((v) => (v.id === id ? { ...v, ...newValue } : v))),
    []
  );
  const actions = useMemo(
    () => ({
      setValue,
      add: push,
      unshift,
      push,
      move,
      clear,
      removeById,
      removeIndex,
      pop,
      shift,
      modifyById,
    }),
    [modifyById, push, unshift, move, clear, removeById, removeIndex, pop, shift]
  );
  return [value, actions];
}

function useArray(initial) {
  const [value, actions] = useArrayArray(initial);

  return useMemo(
    () => ({
      value,
      ...actions,
    }),
    [actions, value]
  );
}

export default useArray;

// Usage
