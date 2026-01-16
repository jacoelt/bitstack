import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';

const BALANCE_API_PATH = "/balance";

export function Balance() {
    const [amount, setAmount] = useState<number | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

    function fetchBalance() {
        const url = new URL(BALANCE_API_PATH, import.meta.env.VITE_API_BASE_URL);
        fetch(url.toString())
            .then((response) => response.json())
            .then((data) => {
                setAmount(data.balance);
                setLastFetchTime(new Date());
            });
    }

    useEffect(() => {
        fetchBalance();
        setInterval(fetchBalance, 60000);
    }, []);

    return (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Current Balance
            </Typography>
            <Typography variant="h4" color="primary">
                {amount !== null ? `$${amount.toFixed(2)}` : 'Loading...'}
            </Typography>
            {lastFetchTime && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Last updated: {lastFetchTime.toLocaleTimeString()}
                </Typography>
            )}

            <Box sx={{ mt: 2 }}>
                <IconButton onClick={fetchBalance} color="primary">
                    <RefreshIcon />
                </IconButton>
            </Box>
        </Box>
    );
}