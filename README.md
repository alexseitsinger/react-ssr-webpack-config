<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [index][1]
    -   [Examples][2]
-   [exclude][3]
-   [localIdentName][4]

## index

The config objects to use for Webpack.

### Examples

```javascript
// webpack.config.development.js

const webpackConfig = require("@alexseitsinger/react-ssr-webpack-config")

module.exports = webpackConfig.client.development

// or

const webpackConfig = require("@alexseitsinger/react-ssr-webpack-config")
const merge = require("webpack-merge")

module.exports = merge.smart(webpackConfig.client.development, {
  plugins: [
    // Add some more plugins here...
  ]
})
```

Returns **[object][5]** A collection of objects that can be used for Webpack.

## exclude

Use babel for for all javascript files we create.

Dont use the compiler for already compiled modules found in the
node_modules folder.

## localIdentName

Use a more verbose name in development for CSS classes for easy
debugging. They should match the same pattern used in
server-side rendering classNames.

(eg: Note the third '\_' in the second set of underscores)

[1]: #index

[2]: #examples

[3]: #exclude

[4]: #localidentname

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
