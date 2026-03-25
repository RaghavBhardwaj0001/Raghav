/* Vercel Speed Insights Integration */
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights
injectSpeedInsights({
  debug: process.env.NODE_ENV === 'development'
});
