module.exports = {
  plugins: {path: './plugins/plugins'},
  uiflow: {path: './plugins/uiflow'},
  webshot: {path: './plugins/webshot'},
  text: {path: './plugins/text'},
  eval: {path: './plugins/eval'},
  elen: {path: './plugins/elen/elen'},
  lib: {path: './plugins/lib'},
  plot: {
    path: './plugins/plot/plot',
    lib: {
      'd3': './plugins/plot/d3.v3.min.js',
      'function-plot': './plugins/plot/function-plot.js'
    }
  }
};