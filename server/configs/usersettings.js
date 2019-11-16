// These are the default setttings 

const userSettings = {
    type: Object,
    default: {
      Design: { 
        boxShadow: {
          val: false, name: "Box Shadow"
        },
        theme: {
          val: "light", name: "Theme"
        }
      },
      Performance: {
        numberOfNewsToDisplay: {
          val: 10, name: "Number of News to display"
        },
      }
    }
}

module.exports = userSettings;