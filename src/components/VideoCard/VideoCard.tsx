import { useState } from "react";
import {
  Card,
  CardActionArea,
  Box,
  Typography,
  Chip,
  Dialog,
  IconButton,
  Stack,
} from "@mui/material";
import {
  PlayArrowRounded as PlayArrowRoundedIcon,
  Close as CloseIcon,
  MovieOutlined as MovieOutlinedIcon,
} from "@mui/icons-material";
import type { VideoItem } from "../../types";
import { TopoPattern } from "../TopoPattern/TopoPattern";
import { COLORS, FONT_DISPLAY } from "../../theme";

interface VideoCardProps {
  video: VideoItem;
  accent: string;
}

export const VideoCard = ({ video, accent }: VideoCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ overflow: "hidden" }}>
        <CardActionArea onClick={() => setOpen(true)}>
          <Box
            sx={{
              position: "relative",
              height: 150,
              backgroundColor: COLORS.ink,
              backgroundImage: `linear-gradient(135deg, ${accent}55 0%, ${COLORS.ink} 85%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TopoPattern color="#FFFFFF" opacity={0.12} />
            <Box
              sx={{
                position: "relative",
                width: 54,
                height: 54,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayArrowRoundedIcon
                sx={{ color: accent, fontSize: 32, ml: "2px" }}
              />
            </Box>
            <Chip
              size="small"
              label={video.duration}
              sx={{
                position: "absolute",
                bottom: 8,
                insetInlineStart: 8,
                backgroundColor: "rgba(0,0,0,0.55)",
                color: "#fff",
                fontSize: "0.7rem",
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, mb: 0.5 }}
            >
              {video.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {video.description}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            backgroundColor: COLORS.ink,
          }}
        >
          <Typography
            sx={{ color: "#fff", fontFamily: FONT_DISPLAY, fontWeight: 700 }}
          >
            {video.title}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ color: "#fff" }}
            aria-label="סגירה"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            pt: "56.25%",
            backgroundColor: "#000",
          }}
        >
          {video.youtubeId ? (
            <Box
              component="iframe"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          ) : (
            <Stack
              spacing={1.5}
              alignItems="center"
              justifyContent="center"
              sx={{
                position: "absolute",
                inset: 0,
                color: "rgba(255,255,255,0.75)",
                p: 3,
                textAlign: "center",
              }}
            >
              <MovieOutlinedIcon sx={{ fontSize: 40, color: accent }} />
              <Typography sx={{ fontWeight: 600 }}>
                כאן יוצג נגן הסרטון
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 420, color: "rgba(255,255,255,0.55)" }}
              >
                זהו תוכן לדוגמה. כדי להטמיע סרטון אמיתי, הוסיפו מזהה סרטון
                מיוטיוב בשדה youtubeId עבור "{video.title}" בקובץ
                src/data/units.ts.
              </Typography>
            </Stack>
          )}
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {video.description}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};
