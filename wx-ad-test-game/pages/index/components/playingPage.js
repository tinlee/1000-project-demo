// pages/index/components/playingPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    baseItems: Array,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      this.triggerEvent("onChangeState", "math");
    },
  },
});
