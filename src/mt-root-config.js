import { registerApplication, start } from "single-spa";
import './index.css'
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const routes = constructRoutes(document.querySelector("#single-spa-layout"),{
  loaders: {
    topNav: "<h1>Loading topnav</h1>",
  },
  errors: {
    topNav: "<h1>Failed to load topnav</h1>",
  },
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});


const layoutEngine = constructLayoutEngine({ 
    routes, 
    applications,
    active: false,
   });

applications.forEach(registerApplication);

System.import("@mt/styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});


// import * as isActive from './activityFns.js'
// import * as singleSpa from 'single-spa'

// singleSpa.registerApplication('navbar', () => SystemJS.import('@mt/navbar'),location => location.pathname.startsWith('/navbar'))
// singleSpa.registerApplication('oppReact', () => SystemJS.import('@mt/oppReact'), location => location.pathname.startsWith('/oppReact'))
// singleSpa.registerApplication('testSingle', () => SystemJS.import('@mt/testSingle'), location => location.pathname.startsWith('/testSingle'))

// singleSpa.start()
