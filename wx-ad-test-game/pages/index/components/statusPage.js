// pages/index/components/status.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gameStatus: String,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    restart() {
      this.triggerEvent("onChangeState", "start");
    },
  },
});
