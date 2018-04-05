import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import '../styles/index.css';

setDefaults({
  inline: true,
  source: false,
});

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);