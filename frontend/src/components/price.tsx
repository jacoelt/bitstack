

import { Box, CircularProgress, Typography } from "@mui/material";


export function Price({ price }: { price?: number }) {
    return (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Current Price
            </Typography>
            <Typography variant="h4" color="primary">
                {price !== undefined ? `1 BTC = $${price.toFixed(2)}` : <CircularProgress />}
            </Typography>
        </Box>
    );
}