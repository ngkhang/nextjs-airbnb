import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities }) => {
  addUtilities({
    '.center': {
      '@apply flex items-center justify-center': {},
    },
    '.bg-dot-pattern': {
      'background-color': '#fff',
      'background-image':
        'radial-gradient(#c4c4c4 0.09rem, transparent 0.09rem), radial-gradient(#c4c4c4 0.09rem, #fff 0.09rem)',
      'background-size': '2rem 2rem',
      'background-position': '0 0, 1rem 1rem',
    },
  });
});
