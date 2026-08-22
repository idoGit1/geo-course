import * as Icons from "@mui/icons-material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AssignmentOutlined as AssignmentOutlinedIcon,
  MenuBookOutlined as MenuBookOutlinedIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { useUnit } from "../api/useUnit";
import { useUnitsOverview } from "../api/useUnitsOverview";
import AssignmentCard from "../components/AssignmentCard";
import HeroBanner from "../components/HeroBanner";
import ParagraphBlock from "../components/ParagraphBlock";
import SectionHeader from "../components/SectionHeader";
import TabPanel, { tabA11yProps } from "../components/TabPanel";
import VideoCard from "../components/VideoCard";
import { FONT_DISPLAY, UNIT_ACCENTS } from "../theme";

export default function UnitPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: unit, isLoading: isUnitLoading } = slug
    ? useUnit(slug)
    : { data: undefined, isLoading: false };
  const { data: unitsMetadata, isLoading: isUnitsMetadataLoading } =
    useUnitsOverview();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (isUnitLoading || isUnitsMetadataLoading) {
    return <></>;
  }

  if (!unit || !unitsMetadata) {
    return <Navigate to="/404" replace />;
  }

  const prevUnit = unitsMetadata.find(
    (unitMetadata) => unitMetadata.number === unit.number - 1,
  );
  const nextUnit = unitsMetadata.find(
    (unitMetadata) => unitMetadata.number === unit.number + 1,
  );

  return (
    <Box>
      <HeroBanner
        eyebrow={`יחידה ${String(unit.number).padStart(2, "0")}`}
        title={unit.title}
        subtitle={unit.subtitle}
        description={unit.description}
        accent={UNIT_ACCENTS[unit.number - 1]}
        Icon={Icons[unit.iconName as keyof typeof Icons]}
        chips={[`קנ״מ ${unit.scale}`]}
        compact
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: UNIT_ACCENTS[unit.number - 1] },
          }}
          sx={{ mb: 1, borderBottom: "1px solid", borderColor: "divider" }}
        >
          <Tab
            icon={<PlayCircleOutlineIcon />}
            iconPosition="start"
            label={`סרטונים (${unit.videos.length})`}
            sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, minHeight: 56 }}
            {...tabA11yProps(0)}
          />
          <Tab
            icon={<MenuBookOutlinedIcon />}
            iconPosition="start"
            label={`קריאה (${unit.readingParts.length})`}
            sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, minHeight: 56 }}
            {...tabA11yProps(1)}
          />
          <Tab
            icon={<AssignmentOutlinedIcon />}
            iconPosition="start"
            label={`מטלות (${unit.assignments.length})`}
            sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, minHeight: 56 }}
            {...tabA11yProps(2)}
          />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <SectionHeader
            Icon={PlayCircleOutlineIcon}
            title="סרטוני היחידה"
            description="צפו בסרטונים הבאים כדי להכיר את הרעיונות המרכזיים לפני המעבר לקריאה ולמטלות."
            color={UNIT_ACCENTS[unit.number - 1]}
          />
          <Grid container spacing={3}>
            {unit.videos.map((video) => (
              <Grid item xs={12} sm={6} key={video.youtubeId}>
                <VideoCard
                  video={{
                    description: video.description,
                    youtubeId: video.youtubeId,
                    duration: video.duration,
                    title: video.title,
                    id: video.id.toString(),
                  }}
                  accent={UNIT_ACCENTS[unit.number - 1]}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <SectionHeader
            Icon={MenuBookOutlinedIcon}
            title="חומרי קריאה"
            description="פסקאות תמציתיות עם מונחי מפתח מודגשים. לחצו על כותרת כדי להרחיב."
            color={UNIT_ACCENTS[unit.number - 1]}
          />
          <Stack spacing={2}>
            {unit.readingParts.map((readingPart, i) => (
              <ParagraphBlock
                key={readingPart.id}
                paragraph={{
                  content: readingPart.content,
                  title: readingPart.title,
                  id: readingPart.id.toString(),
                  keyTerms: readingPart.tags.map((tag) => tag.value),
                }}
                accent={UNIT_ACCENTS[unit.number - 1]}
                defaultExpanded={i === 0}
              />
            ))}
          </Stack>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <SectionHeader
            Icon={AssignmentOutlinedIcon}
            title="מטלות תרגול"
            description="ענו על השאלות במחברת שלכם, ואז חשפו את התשובה לדוגמה כדי לבדוק את עצמכם."
            color={UNIT_ACCENTS[unit.number - 1]}
          />
          <Stack spacing={2.5}>
            {unit.assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={{
                  description: assignment.description,
                  difficulty: assignment.difficulty,
                  id: assignment.id.toString(),
                  title: assignment.title,
                  questions: assignment.questions.map((question) => ({
                    id: question.id.toString(),
                    text: question.text,
                    type: question.type,
                    options:
                      question.options?.map((option) => option.text) ?? null,
                  })),
                }}
                accent={UNIT_ACCENTS[unit.number - 1]}
              />
            ))}
          </Stack>
        </TabPanel>

        <Divider sx={{ my: { xs: 5, md: 6 } }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          {prevUnit ? (
            <Button
              component={RouterLink}
              to={`/unit/${prevUnit.slug}`}
              startIcon={<ArrowForwardIcon />}
              sx={{ color: "text.secondary" }}
            >
              <Stack sx={{ textAlign: "end" }}>
                <Typography variant="caption" color="text.secondary">
                  היחידה הקודמת
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {prevUnit.title}
                </Typography>
              </Stack>
            </Button>
          ) : (
            <Box />
          )}

          {nextUnit && (
            <Button
              component={RouterLink}
              to={`/unit/${nextUnit.slug}`}
              endIcon={<ArrowBackIcon />}
              variant="outlined"
              sx={{
                borderColor: UNIT_ACCENTS[unit.number - 1],
                color: UNIT_ACCENTS[unit.number - 1],
              }}
            >
              <Stack sx={{ textAlign: "start" }}>
                <Typography
                  variant="caption"
                  sx={{ color: UNIT_ACCENTS[unit.number - 1], opacity: 0.8 }}
                >
                  היחידה הבאה
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {nextUnit.title}
                </Typography>
              </Stack>
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
