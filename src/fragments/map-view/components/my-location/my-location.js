import { createPopper } from '@popperjs/core'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    menuOpen: false,
    myLocationInterval: false,
    locationActive: false,
    continously: false,
    toolTipVisible: false
  }),
  watch: {
    active: function (newVal) {
      this.locationActive = newVal
    }
  },
  mounted () {
    // Run the utility that may define a more appropriate map
    // center center if appRouteData is empty
    if (this.$store.getters.appRouteData.places.length === 0) {
      this.showToolTip()
    }
  },
  methods: {
    showToolTip () {
      this.toolTipVisible = true
      this.$nextTick(() => {
        const button = document.querySelector('.my-location-btn')
        const tooltip = document.querySelector('#my-position-tooltip')

        // Pass the button, the tooltip, and some options, and Popper will do the
        // magic positioning for you:
        createPopper(button, tooltip,
          {
            placement: 'left',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8]
                }
              }
            ]
          }
        )
      })
    },
    /**
     * Handles the menu activation event
     */
    activatorClicked () {
      if (this.locationActive) {
        this.setLocationFromBrowser(false)
        this.toolTipVisible = false
      } else {
        const context = this
        setTimeout(() => {
          if (context.menuOpen) {
            context.showToolTip()
          } else {
            context.toolTipVisible = false
          }
        }, 100)
      }
    },
    /**
     * Get the browser location and store it in our store
     * If fail, shows a toaster to the user
     * @param {Boolean} continously
     */
    setLocationFromBrowser (continously = false) {
      this.toolTipVisible = false
      this.continously = continously
      // Reset the location access denied flag
      const context = this

      if (this.locationActive) {
        this.$store.commit('currentLocation', null)
        clearInterval(this.myLocationInterval)
        setTimeout(() => {
          context.locationActive = false
          context.menuOpen = false
          context.$emit('updateLocation', false)
        }, 100)
      } else {
        context.$emit('updateLocation', true)
        if (continously) {
          this.myLocationInterval = setInterval(() => {
            context.$emit('updateLocation', true)
          }, 2000)
        }
      }
    }
  }
}
