// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '~': './src',
            '@Components': './src/Components',
            '@common': './src/common',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            'types': './@types',
          },
        },
      ],
    ],
  };
};
