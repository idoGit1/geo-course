import {
  ArrowBack as ArrowBackIcon,
  MenuBookOutlined as MenuBookOutlinedIcon,
  PlayCircleOutline as PlayCircleOutlineIcon
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link as RouterLink } from "react-router-dom";
import { COLORS, FONT_DISPLAY } from "../../theme";
import { CoordinateChip } from "../CoordinateChip/CoordinateChip";

interface UnitCardProps {
  slug: string;
  title: string;
  subtitle: string | null;
  number: number;
  accent: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  scale: string | null;
  readingPartsCount: number;
  videosCount: number;
  assignmentsCount: number;
}

export const UnitCard = ({
  slug,
  title,
  subtitle,
  number,
  accent,
  icon,
  scale,
  readingPartsCount,
  videosCount,
}: UnitCardProps) => {
  const unitNumber = String(number).padStart(2, "0");
  const Icon = icon || PlayCircleOutlineIcon;
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 12px 24px -12px ${accent}55`,
          borderColor: accent,
        },
      }}
    >
      <RouterLink
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/unit/${slug}`}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            p: 0,
          }}
        >
          <Box sx={{ height: 6, backgroundColor: accent }} />
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              flexGrow: 1,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${accent}1F`,
                }}
              >
                <Icon sx={{ color: accent }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  color: COLORS.line,
                  lineHeight: 1,
                }}
              >
                {unitNumber}
              </Typography>
            </Stack>

            <Typography
              variant="h6"
              sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              {subtitle}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
              <Chip
                size="small"
                icon={
                  <PlayCircleOutlineIcon sx={{ fontSize: "16px !important" }} />
                }
                label={videosCount}
                variant="outlined"
                sx={{ borderColor: COLORS.line }}
              />
              <Chip
                size="small"
                icon={
                  <MenuBookOutlinedIcon sx={{ fontSize: "16px !important" }} />
                }
                label={readingPartsCount}
                variant="outlined"
                sx={{ borderColor: COLORS.line }}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1 }}
            >
              <CoordinateChip label={`קנ״מ ${scale}`} color={accent} />
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{
                  color: accent,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                כניסה ליחידה
                <ArrowBackIcon sx={{ fontSize: 16 }} />
              </Stack>
            </Stack>
          </Box>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};
