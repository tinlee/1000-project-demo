// pages/index/components/mathPage.js
const operatorList = ["+", "-", "x"];

let timer;
let operatorIndex = 0;
let successCount = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    downTime: 5,
    mathFirtNumber: Math.floor(Math.random() * 10) + 1,
  },
  ready() {
    this.createMath();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createMath: function () {
      // 生成随机数
      let mathFirtNumber = this.data.mathFirtNumber;
      let successNumber = Math.floor(Math.random() * 99) + 1;
      // 测试加减乘除，得到第一个数字
      const operator = operatorList[operatorIndex % 3];
      let mathSecondNumber;
      if (operator === "+") {
        mathSecondNumber = successNumber - mathFirtNumber;
        if (mathSecondNumber < 0) {
          mathSecondNumber = -mathSecondNumber;
          mathOperator = "-";
        }
      } else if (operator === "-") {
        mathSecondNumber = mathFirtNumber - successNumber;
        if (mathSecondNumber < 0) {
          mathSecondNumber = -mathSecondNumber;
          mathOperator = "+";
        }
      } else if (operator === "x") {
        mathSecondNumber = Math.floor(Math.random() * 4) + 1;
        successNumber = mathFirtNumber * mathSecondNumber;
      }
      // 生成五个随机数,其中一个是正确答案
      const newNumberList = [successNumber];
      for (let i = 0; i < 5; i++) {
        newNumberList.push(Math.floor(Math.random() * 99) + 1);
      }
      const numberList = newNumberList.sort(() => Math.random() - 0.5);
      this.setData({
        downTime: 5,
        numberList,

        mathSecondNumber,
        operator,
        successNumber,
      });

      clearInterval(timer);

      timer = setInterval(() => {
        this.setData({
          downTime: this.data.downTime - 1,
        });
        if (this.data.downTime <= 0) {
          clearInterval(timer);

          this.triggerEvent("onChangeState", "fail");
        }
      }, 1000);
    },
    onSelect(e) {
      const number = e.target.dataset.item;
      if (number === this.data.successNumber) {
        successCount++;
        operatorIndex++;
        this.setData({
          mathFirtNumber: this.data.successNumber,
        });
        if (successCount === 10) {
          this.triggerEvent("onChangeState", "finnal");
        }
        this.createMath();
      } else {
        this.triggerEvent("onChangeState", "fail");
      }
    },
  },
});
