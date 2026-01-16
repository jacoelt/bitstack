import { Box } from "@mui/material";
import { Balance } from "./components/balance";
import { Price } from "./components/price";

import './App.css'
import { useEffect, useState } from "react";

const PRICE_API_PATH = "/price";
const REFRESH_INTERVAL = 1; // in seconds

function App() {

  const [price, setPrice] = useState<number | null>(null);

  function fetchPrice() {
    const url = new URL(PRICE_API_PATH, import.meta.env.VITE_API_BASE_URL);
    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => {
        setPrice(data.price);
      });
  }

  useEffect(() => {
    const interval = setInterval(fetchPrice, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
        <Balance currentPrice={price ?? undefined} />
        <Price price={price ?? undefined} />
      </Box>
    </>
  )
}

export default App
