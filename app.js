// Framework documentation:
// https://vuejs.org/guide/introduction.html
const app = Vue.createApp({
  data() {
    return {
      page: null,
      event: null,
      events: []
    }
  },
  async mounted() {
    // Load events from CSV file
    this.events = csv2json(
      await (await fetch('events.csv')).text()
    ).filter(function(ev) {
      // Needed since newline in CSV files results in an extra entry
      return ev.content !== undefined
    });
    // Select first event from events
    this.event = this.events[0] || null;
    // Get page name from query parameters, default to events
    this.page = (new URLSearchParams(window.location.search)).get('page') || 'events';
    // If page shown is 'events', initialize timeline
    if (this.page == 'events') {
      this.initTimeLine();
    }
  },
  methods: {
    initTimeLine: async function() {
      var container = document.getElementById('visualization');
      container.innerHTML = '';
      var items = new vis.DataSet(this.events);
      var options = {};
      var timeline = new vis.Timeline(container, items, options);
      // Handle selection for time line
      timeline.on('select', properties => {
        this.event = this.events.filter(function(event) {
          // Compare .id since it is the only unique piece of information per event
          return String(event.id) == properties.items[0];
        })[0];
      });
    },
  }
});
app.mount('#app');
