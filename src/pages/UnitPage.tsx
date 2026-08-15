import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, Navigate } from 'react-router-dom';
import { Box, Container, Tabs, Tab, Grid, Stack, Typography, Button, Divider } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import ParagraphBlock from '../components/ParagraphBlock';
import AssignmentCard from '../components/AssignmentCard';
import TabPanel, { tabA11yProps } from '../components/TabPanel';
import { units, getUnitBySlug } from '../data/units';
import { FONT_DISPLAY } from '../theme';

export default function UnitPage() {
  const { slug } = useParams<{ slug: string }>();
  const unit = slug ? getUnitBySlug(slug) : undefined;
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!unit) {
    return <Navigate to="/404" replace />;
  }

  const index = units.findIndex((u) => u.slug === unit.slug);
  const prevUnit = index > 0 ? units[index - 1] : null;
  const nextUnit = index < units.length - 1 ? units[index + 1] : null;

  return (
    <Box>
      <HeroBanner
        eyebrow={`יחידה ${String(unit.id).padStart(2, '0')}`}
        title={unit.title}
        subtitle={unit.subtitle}
        description={unit.description}
        accent={unit.accent}
        Icon={unit.icon}
        chips={[`קנ״מ ${unit.scale}`]}
        compact
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: unit.accent } }}
          sx={{ mb: 1, borderBottom: '1px solid', borderColor: 'divider' }}
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
            label={`קריאה (${unit.paragraphs.length})`}
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
            color={unit.accent}
          />
          <Grid container spacing={3}>
            {unit.videos.map((video) => (
              <Grid item xs={12} sm={6} key={video.id}>
                <VideoCard video={video} accent={unit.accent} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <SectionHeader
            Icon={MenuBookOutlinedIcon}
            title="חומרי קריאה"
            description="פסקאות תמציתיות עם מונחי מפתח מודגשים. לחצו על כותרת כדי להרחיב."
            color={unit.accent}
          />
          <Stack spacing={2}>
            {unit.paragraphs.map((paragraph, i) => (
              <ParagraphBlock key={paragraph.id} paragraph={paragraph} accent={unit.accent} defaultExpanded={i === 0} />
            ))}
          </Stack>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <SectionHeader
            Icon={AssignmentOutlinedIcon}
            title="מטלות תרגול"
            description="ענו על השאלות במחברת שלכם, ואז חשפו את התשובה לדוגמה כדי לבדוק את עצמכם."
            color={unit.accent}
          />
          <Stack spacing={2.5}>
            {unit.assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} accent={unit.accent} />
            ))}
          </Stack>
        </TabPanel>

        <Divider sx={{ my: { xs: 5, md: 6 } }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          {prevUnit ? (
            <Button
              component={RouterLink}
              to={`/unit/${prevUnit.slug}`}
              startIcon={<ArrowForwardIcon />}
              sx={{ color: 'text.secondary' }}
            >
              <Stack sx={{ textAlign: 'end' }}>
                <Typography variant="caption" color="text.secondary">
                  היחידה הקודמת
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{prevUnit.title}</Typography>
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
              sx={{ borderColor: unit.accent, color: unit.accent }}
            >
              <Stack sx={{ textAlign: 'start' }}>
                <Typography variant="caption" sx={{ color: unit.accent, opacity: 0.8 }}>
                  היחידה הבאה
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{nextUnit.title}</Typography>
              </Stack>
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
