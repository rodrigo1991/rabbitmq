/* eslint-disable import/no-commonjs */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    defensoriaUrl: process.env.NEXT_PUBLIC_DEFENSORIA_URL || '',
    pagosUrl: process.env.NEXT_PUBLIC_PAGOS_URL || '',
    webPushKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || '',
  },
});
