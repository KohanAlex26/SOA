// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// module.exports = {

//   mode:'development',
//   devServer:{
//     port:8005,
//   },
//   plugins:[
//     new ModuleFederationPlugin({
//         name: 'Container',
//         filename:
//           'remoteEntry.js',
//         remotes:{
//             MFE1:
//             'MFE1@http://localhost:8001/remoteEntry.js',
//         },
//         shared: {
//           ...deps,
//           'react-dom': {
//             import: 'react-dom', // the "react" package will be used a provided and fallback module
//             shareKey: 'react-dom', // under this name the shared module will be placed in the share scope
//             shareScope: 'legacy', // share scope with this name will be used
//             singleton: true, // only a single version of the shared module is allowed
//           },
//           // oldReact: {
//           //   import: "react", // the "react" package will be used a provided and fallback module
//           //   shareKey: "oldReact", // under this name the shared module will be placed in the share scope
//           //   shareScope: "legacy", // share scope with this name will be used
//           //   singleton: true, // only a single version of the shared module is allowed
//           // }
//         },
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
