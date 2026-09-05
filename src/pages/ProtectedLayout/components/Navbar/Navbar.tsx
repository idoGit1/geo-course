import * as Icons from "@mui/icons-material";
import {
  Explore as ExploreIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useMetadata } from "../../../../api/app/useMetadata";
import { useUnitsOverview } from "../../../../api/app/useUnitsOverview";
import { useAuthUser } from "../../../../api/auth/useAuthUser";
import { useLogoutUser } from "../../../../api/auth/useLogoutUser";
import { COLORS, FONT_DISPLAY, UNIT_ACCENTS } from "../../../../theme";
export const Navbar = () => {
  const { data: metadata } = useMetadata();
  const { data: unitsMetadata } = useUnitsOverview();
  const { data: user } = useAuthUser();
  const logout = useLogoutUser();
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "auto",
              gap: "0.5rem",
            }}
          >
            <Typography>שלום {user?.username}</Typography>
            <Button onClick={logout}>התנתק</Button>
          </Box>
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
            {unitsMetadata?.map((unit) => {
              const path = `/unit/${unit.slug}`;
              const Icon =
                Icons[unitsMetadata[0].iconName as keyof typeof Icons] ||
                Icons.HelpOutline;
              return (
                <ListItemButton
                  key={unit.slug}
                  component={RouterLink}
                  to={path}
                  onClick={() => setOpen(false)}
                  selected={isActive(path)}
                >
                  <ListItemIcon
                    sx={{ minWidth: 40, color: UNIT_ACCENTS[unit.number - 1] }}
                  >
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
