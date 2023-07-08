import * as React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CachedIcon from "@mui/icons-material/Cached";
import Box from "@mui/material/Box";

export default function BackButton({ refreshPage }) {
  const location = useLocation();
  const excludePaths = ["/", "/admin", "/admin/*"];
  const [tooltip1Open, setTooltip1Open] = React.useState(false);
  const [tooltip2Open, setTooltip2Open] = React.useState(false);

  const handleTooltip1Open = () => {
    setTooltip1Open(true);
  };

  const handleTooltip1Close = () => {
    setTooltip1Open(false);
  };

  const handleTooltip2Open = () => {
    setTooltip2Open(true);
  };

  const handleTooltip2Close = () => {
    setTooltip2Open(false);
  };

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Box id="contenedor-backr-refresh">
      <Tooltip
        id="tooltip1"
        title="Volver al inicio"
        placement="right"
        open={tooltip1Open}
        onClose={handleTooltip1Close}
        onOpen={handleTooltip1Open}
      >
        <Link
          id="back-button"
          to="/"
          onMouseEnter={handleTooltip1Open}
          onMouseLeave={handleTooltip1Close}
        >
          <ArrowBackIosIcon color="black" />
        </Link>
      </Tooltip>

      <Tooltip
        id="tooltip2"
        title="Recargar"
        placement="right"
        open={tooltip2Open}
        onClose={handleTooltip2Close}
        onOpen={handleTooltip2Open}
      >
        <IconButton
          id="back-button"
          onClick={refreshPage}
          onMouseEnter={handleTooltip2Open}
          onMouseLeave={handleTooltip2Close}
        >
          <CachedIcon color="black" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
