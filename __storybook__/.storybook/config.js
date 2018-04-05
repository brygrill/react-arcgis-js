import { configure } from '@storybook/react';
import '../styles/index.css';

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);