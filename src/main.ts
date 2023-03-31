import { setupApp } from './app';
import './assets/styles.css';


export const APP_ROOT = '#app';

export const app = setupApp({ storage: localStorage });

app.mount(APP_ROOT);
