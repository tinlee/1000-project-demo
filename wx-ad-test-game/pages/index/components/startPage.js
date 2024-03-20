// pages/index/components/startPage.js
Component({
  methods: {
    onStart() {
      this.triggerEvent("onChangeState", "playing");
    },
  },
});
