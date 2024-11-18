import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities }) => {
  addUtilities({
    '.center': {
      '@apply flex items-center justify-center': {},
    },
  });
});
