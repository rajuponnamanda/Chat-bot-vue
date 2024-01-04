// bot.js

import { ref, provide, inject } from 'vue';

const isBotOpen = ref(true);

const toggleBot = () => {
  isBotOpen.value = !isBotOpen.value;
};

const provideBot = () => {
  provide('bot', { isBotOpen, toggleBot });
};

const useBot = () => {
  const bot = inject('bot');

  if (!bot) {
    throw new Error('useBot must be used within a component that provides the bot');
  }

  return bot;
};

export { provideBot, useBot };
