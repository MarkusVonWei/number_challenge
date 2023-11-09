// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
// import App from './App.vue'
import NumberChallenge from './components/NumberChallenge.vue'

createApp(NumberChallenge).mount('#app')
