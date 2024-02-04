module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: require("core-js/package.json").version,
      },
    ],
  ],
  plugins: ["babel-plugin-istanbul", { extensions: [".ts", ".vue"] }],
};
