// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'

export default createVuetify({
  display: {
    mobileBreakpoint: 'xs, sm, md, lg, lg, xl',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
})
