import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'COPA API Documentation',
  tagline: 'Build powerful cooperative management integrations',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.copa.rw',
  baseUrl: '/',

  organizationName: 'copa-platform',
  projectName: 'copa-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/copa-platform/copa-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        pages: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/copa-social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'COPA Docs',
      logo: {
        alt: 'COPA Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://copa.rw',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://app.copa.rw',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/copa-platform',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/introduction',
            },
            {
              label: 'API Reference',
              to: '/api/overview',
            },
            {
              label: 'Error Codes',
              to: '/reference/error-codes',
            },
          ],
        },
        {
          title: 'API Endpoints',
          items: [
            {
              label: 'Cooperatives',
              to: '/api/cooperatives',
            },
            {
              label: 'Members',
              to: '/api/members',
            },
            {
              label: 'Rate Limits',
              to: '/reference/rate-limits',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'COPA Website',
              href: 'https://copa.rw',
            },
            {
              label: 'Support',
              href: 'mailto:api-support@copa.rw',
            },
            {
              label: 'Partnership',
              href: 'mailto:partners@copa.rw',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} COPA Platform. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'php'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
