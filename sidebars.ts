import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/authentication',
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/overview',
        'api/cooperatives',
        'api/members',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/error-codes',
        'reference/rate-limits',
        'reference/changelog',
      ],
    },
  ],
};

export default sidebars;
