const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "userFollowers",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "userFollowers",
      filename: "remoteEntry.js",
      exposes: {
        "./FollowersModule": "./src/app/followers/followers.module.ts",
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "16.2.12",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "16.2.12",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "16.2.12",
        },
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
