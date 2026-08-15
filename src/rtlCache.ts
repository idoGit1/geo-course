import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Emotion cache that flips the generated CSS to RTL so MUI's
// default (LTR-authored) component styles render correctly in Hebrew.
export const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
