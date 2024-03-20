// pages/index/components/finnalPgae.js
import { ITEM_LIST } from "../constant";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    baseItems: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    finnal: {},
    finnalItemList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e) {
      const id = e.target.dataset.id;
      if (id === this.data.finnal.id) {
        this.triggerEvent("onChangeState", "success");
      } else {
        this.triggerEvent("onChangeState", "fail");
      }
    },
  },

  ready() {
    const number = Math.floor(Math.random() * 2);
    const finnal = this.properties.baseItems[number];
    const itemList = ITEM_LIST.find(
      (item) => item.category === finnal.category
    );
    const finnalItemList = itemList.items;
    this.setData({
      finnalItemList,
      finnal,
    });
  },
});
