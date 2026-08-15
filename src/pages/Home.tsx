import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, Stack, Paper } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeroBanner from '../components/HeroBanner';
import UnitCard from '../components/UnitCard';
import { units } from '../data/units';
import { COLORS, FONT_DISPLAY } from '../theme';

const features = [
  {
    Icon: PlayCircleOutlineIcon,
    title: 'סרטוני הסבר',
    text: 'כל יחידה נפתחת בסרטונים קצרים שמניחים את התשתית לנושא.',
    color: COLORS.teal,
  },
  {
    Icon: MenuBookOutlinedIcon,
    title: 'טקסטים לקריאה',
    text: 'פסקאות תמציתיות עם מונחי מפתח מודגשים, לחזרה ולמידה עצמית.',
    color: COLORS.forest,
  },
  {
    Icon: AssignmentOutlinedIcon,
    title: 'מטלות לתרגול',
    text: 'שאלות עם תשובות לדוגמה חשופות בלחיצה, לבדיקה עצמית מיידית.',
    color: COLORS.brass,
  },
];

export default function Home() {
  return (
    <Box>
      <HeroBanner
        eyebrow="6 יחידות · חינם לחלוטין"
        title="קורס גאוגרפיה מקוון"
        subtitle="לומדים לקרוא את העולם - מהמפה שבידיים ועד לתהליכים שמעצבים אותו"
        description="שישה פרקים המסודרים כמו עמודים באטלס: יסודות, מפות, אקלים, תבליט, אוכלוסייה וכלכלה. בכל יחידה סרטונים, קריאה ומטלות תרגול - הכול פתוח וללא עלות."
        Icon={units[0].icon}
        actions={
          <Button
            component={RouterLink}
            to={`/unit/${units[0].slug}`}
            variant="contained"
            size="large"
            color="primary"
            endIcon={<ArrowBackIcon />}
          >
            צלילה ליחידה הראשונה
          </Button>
        }
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }}>
          {features.map((f) => (
            <Grid item xs={12} sm={4} key={f.title}>
              <Paper variant="outlined" sx={{ p: 3, height: '100%', borderColor: COLORS.line }}>
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${f.color}1F`,
                    }}
                  >
                    <f.Icon sx={{ color: f.color }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.text}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800 }}>
            יחידות הלימוד
          </Typography>
          <Typography variant="body1" color="text.secondary">
            שש יחידות עצמאיות - אפשר להתקדם לפי הסדר, או לקפוץ ישר לנושא שמעניין אתכם.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {units.map((unit) => (
            <Grid item xs={12} sm={6} md={4} key={unit.slug}>
              <UnitCard unit={unit} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
