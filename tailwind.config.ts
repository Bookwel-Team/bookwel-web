import theme from 'daisyui/src/theming/themes';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...theme['light'],
          primary: '#F3BB3C',
          secondary: '#080E46',
          accent: '#F3BB3C',
          neutral: '#F3F3F2',
          'base-100': '#F3F3F2',
          info: '#00ccff',
          success: '#aded00',
          warning: '#b24100',
          error: '#da0000',
        },
        dark: {
          ...theme['dark'],
          primary: '#080E46',
          secondary: '#F3BB3C',
          accent: '#080E46',
          neutral: '#F3F3F2',
          'base-100': '#f0ffff',
          info: '#00ccff',
          success: '#aded00',
          warning: '#b24100',
          error: '#da0000',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};
export default config;
