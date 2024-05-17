
import React, { useEffect } from 'react';


const arrayFunction = () => {
  const urlHistory = window.location.pathname;

  useEffect(() => {
    const his = window.sessionStorage.getItem("history");
    const holdHistory = his ? JSON.parse(his) : [];
    holdHistory.push(urlHistory);
    const newHistory = JSON.stringify(holdHistory);
    window.sessionStorage.setItem("history", newHistory);
  }, [urlHistory]);
}

export default arrayFunction;





