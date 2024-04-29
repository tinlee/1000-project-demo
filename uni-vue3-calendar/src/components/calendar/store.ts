import { defineStore } from "pinia";
import dayjs from "dayjs";
export const userCalendar = defineStore("calendar", {
  state: () => ({
    viewStatus: "month",
    day: new Date(),
    list: {
      "2024-05-15": {
        "10:00-12:00": [
          {
            title: "Meeting",
            startTime: "10:00",
            date: "2024-04-15",
            endTime: "12:00",
            remark: "Discuss the plan for the next quarter",
          },
          {
            title: "Interview",
            startTime: "10:00",
            endTime: "12:00",
            date: "2024-04-15",

            remark: "Interview candidate for the front-end position",
          },
        ],
      },
    },
    editInfo: null,
  }),
  actions: {
    goPreMonth() {
      this.day = dayjs(this.day).subtract(1, "month").toDate();
    },
    goNextMonth() {
      this.day = dayjs(this.day).add(1, "month").toDate();
    },
    changeEditInfo(data: any, index: number) {
      this.editInfo = {
        data,
        index,
      };
    },
    goToday() {
      this.day = new Date();
    },
    goDay({ date }) {
      console.log(date);
      this.viewStatus = "day";
      this.day = date;
    },
    setViewStatus(status: string) {
      this.viewStatus = status;
    },
    goNextWeek() {
      const day = dayjs(this.day).add(7, "day").toDate();
      this.day = day;
    },
    goPreWeek() {
      const day = dayjs(this.day).subtract(7, "day").toDate();
      this.day = day;
    },
    addList(list: any) {
      const { date, startTime, endTime } = list;
      if (!this.list[date]) {
        this.list[date] = {};
      }
      const key = `${startTime}-${endTime}`;
      if (!this.list[date][key]) {
        this.list[date][key] = [list];
      } else {
        this.list[date][key].push(list);
      }
    },
    deleteList(list: any, index: number) {
      const { date, startTime, endTime } = list;
      const key = `${startTime}-${endTime}`;
      this.list[date][key].splice(index, 1);
      if (this.list[date][key].length === 0) {
        delete this.list[date][key];
      }
    },
    changeList(list: any, index: number) {
      const { date, startTime, endTime } = list;
      const key = `${startTime}-${endTime}`;
      if (!this.list[date][key]) {
        this.list[date][key] = [];
      }
      this.list[date][key][index] = list;
    },
  },
  // 其他配置...
});
