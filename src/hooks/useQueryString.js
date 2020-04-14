import { useState, useCallback } from "react";

const useQueryString = (key) => {
  const [paramValue, setParamValue] = useState(getQueryParamValue(key));

  const onSetValue = useCallback(
    (newValue) => {
      setParamValue(newValue);
      updateQueryStringWithoutReload(newValue ? `${key}=${newValue}` : "");
    },
    [key, setParamValue]
  );

  const getQueryParamValue = (key) =>
    new URLSearchParams(window.location.search).get(key);

  const updateQueryStringWithoutReload = (queryString) => {
    const { protocol, host, pathname } = window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  return [paramValue, onSetValue];
};

export default useQueryString;
