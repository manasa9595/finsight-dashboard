import { Box, CircularProgress, Typography } from "@mui/material";

// Usage example:
// <Loader text="Fetching data..." height="100vh" size={50} />
// <Loader text="Please wait..." height={400} size={30} />
// <Loader /> // Defaults to "Loading..." with height 300px and size 40

interface LoaderProps {
  text?: string;
  height?: number | string;
  size?: number;
}

export default function Loader({
  text = "Loading...",
  height = 300,
  size = 40,
}: LoaderProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={height}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="textSecondary" mt={2}>
        {text}
      </Typography>
    </Box>
  );
}
