import { Box } from "@mui/material";
import { Balance } from "./components/balance";

import './App.css'

function App() {
  return (
    <>
      <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
        <Balance />
      </Box>
    </>
  )
}

export default App
