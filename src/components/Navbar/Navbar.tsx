import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  Explore as ExploreIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { units } from "../../data/units";
import { COLORS, FONT_DISPLAY } from "../../theme";
import { useMetadata } from "../../api/useMetadata";
import { useUnitsOverview } from "../../api/useUnitsOverview";

export const Navbar = () => {
  const { data: metadata } = useMetadata();
  const { data: unitsMetadata } = useUnitsOverview();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = (
    <>
      {unitsMetadata?.map((unit) => {
        const path = `/unit/${unit.slug}`;
        const active = isActive(path);
        return (
          <Button
            key={unit.slug}
            component={RouterLink}
            to={path}
            onClick={() => setOpen(false)}
            sx={{
              color: active ? COLORS.brass : "rgba(255,255,255,0.85)",
              fontWeight: active ? 700 : 500,
              fontSize: "0.92rem",
              position: "relative",
              "&:after": active
                ? {
                    content: '""',
                    position: "absolute",
                    bottom: 4,
                    insetInline: 14,
                    height: "2px",
                    backgroundColor: COLORS.brass,
                  }
                : undefined,
            }}
          >
            {unit.title}
          </Button>
        );
      })}
    </>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, py: 0.5 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <ExploreIcon sx={{ color: COLORS.brass }} />
            {metadata && (
              <Typography
                variant="h6"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: 0,
                }}
              >
                {metadata.siteName}
              </Typography>
            )}
          </Box>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                flexGrow: 1,
                justifyContent: "flex-start",
              }}
            >
              <Button
                component={RouterLink}
                to="/"
                sx={{
                  color: isActive("/")
                    ? COLORS.brass
                    : "rgba(255,255,255,0.85)",
                  fontWeight: isActive("/") ? 700 : 500,
                }}
              >
                ראשי
              </Button>
              {navLinks}
            </Box>
          )}
          {isMobile && (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ color: "#fff" }}
              aria-label="פתיחת תפריט"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 280,
            backgroundColor: COLORS.ink,
            height: "100%",
            color: "#fff",
          }}
          role="presentation"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
            <ExploreIcon sx={{ color: COLORS.brass }} />
            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800 }}>
              {metadata?.siteName}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
          <List>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={() => setOpen(false)}
              selected={isActive("/")}
            >
              <ListItemIcon sx={{ minWidth: 40, color: COLORS.brass }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="ראשי"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 1 }} />
            {units.map((unit) => {
              const path = `/unit/${unit.slug}`;
              const Icon = unit.icon;
              return (
                <ListItemButton
                  key={unit.slug}
                  component={RouterLink}
                  to={path}
                  onClick={() => setOpen(false)}
                  selected={isActive(path)}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: unit.accent }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={unit.title}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

