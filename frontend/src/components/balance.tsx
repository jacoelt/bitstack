import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';

const BALANCE_API_PATH = "/balance";
const REFRESH_INTERVAL = 60; // in seconds

export function Balance({ currentPrice }: { currentPrice?: number }) {
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
        // Called twice in strict mode in dev env, but that's fine
        fetchBalance();
        const interval = setInterval(fetchBalance, REFRESH_INTERVAL * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Current Balance
            </Typography>
            <Typography variant="h4" color="primary">
                {amount !== null ? <>
                    {`BTC ${amount.toFixed(8)}`}
                    {currentPrice !== undefined && (
                        <Typography variant="caption" display="block">
                            (≈ ${(amount * currentPrice).toFixed(2)} USD)
                        </Typography>
                    )}
                </> : <CircularProgress />}
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