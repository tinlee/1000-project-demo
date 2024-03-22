import { ITEM_LIST } from "./constant";

const shareInof = {
  title: "听说你最近经常熬夜，我很担心你",
  path: "/pages/index/index",
  imageUrl: "./share.png",
  success: function (res) {
    // 转发成功
  },
  fail: function (res) {
    // 转发失败
  },
};

Page({
  data: {
    gameStatus: "start",
    baseItems: [],
  },
  onChangeState(e) {
    const status = e.detail;
    if (status === "start") {
      this.reset();
    }
    this.setData({
      gameStatus: e.detail,
    });
  },
  onLoad() {
    this.reset();
  },
  reset() {
    const randomNums = new Set();
    while (randomNums.size < 3) {
      randomNums.add(Math.floor(Math.random() * 5));
    }
    const baseItems = Array.from(randomNums).map((i) => {
      // 获取0-4的随机数
      const items = ITEM_LIST[i];
      const index = Math.floor(Math.random() * 5);

      return {
        category: items.category,
        id: items.items[index].id,
        name: items.items[index].name,
      };
    });

    this.setData({
      baseItems,
    });
  },

  onShareAppMessage: (res) => {
    // 来自页面内分享按
    return shareInof;
  },
  onShareTimeline: () => {
    return shareInof;
  },

  onShow: () => {
    wx.updateShareMenu({
      withShareTicket: true,
      success() {},
    });
  },
});
