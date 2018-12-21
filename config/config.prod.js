'use strict';

module.exports = () => {
  const config = exports = {};

  config.mongoose = {
    url: 'mongodb://118.178.228.47:27017/max_less',
    options: { useNewUrlParser: true },
  };

  return config;
};
