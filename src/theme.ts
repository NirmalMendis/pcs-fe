import { createTheme } from '@mui/material';

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
                variant: 'outlined',
            },
        },
    },
});

export default theme;
