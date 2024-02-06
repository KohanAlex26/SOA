// root.js
import { registerApplication, start } from 'single-spa';

// Define your micro frontend applications
registerApplication(
'microfrontend1',
  () => import('microfrontend1'),
  () => location.pathname.startsWith('/microfrontend1')
);
registerApplication(
'microfrontend2',
  () => import('microfrontend2'),
  () => location.pathname.startsWith('/microfrontend2')
);

// Start single-spa
start();