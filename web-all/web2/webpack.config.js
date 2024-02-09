// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// module.exports = {

//   mode:'development',
//   devServer:{
//     port:8000,
//   },
//   plugins:[
//     new ModuleFederationPlugin({
//         name: 'Container',
//         filename:
//           'remoteEntry.js',
//         remotes:{
//             MFE1:
//             'MFE1@http://localhost:8001/remoteEntry.js',
//         }
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
