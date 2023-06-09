import type { Preview } from '@storybook/react';
import '../src/styles/_index.scss';
import React from 'react';
const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ margin: '1.5rem 2rem' }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
