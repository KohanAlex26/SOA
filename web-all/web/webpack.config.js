// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// module.exports = {
//   entry: './src/index',
//   mode:'development',
//   devServer:{
//     port:8001,
//   },
//   output: {
//     publicPath: 'auto',
//   },
//   plugins:[
//     new ModuleFederationPlugin({
//         name: 'MFE1',
//         filename:
//           'remoteEntry.js',
//         exposes: {
//           './App' : './src/App.js',
//           './Dashboard': './src/Dashboard.js',
//           './newReact': require.resolve('react'),
//           './newReactDOM': require.resolve('react-dom'),
//         },
//         shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
//     }),
//     new HtmlWebpackPlugin({
//       template:
//       './public/index.html',
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
// };
