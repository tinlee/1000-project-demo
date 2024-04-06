import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import articels from "../../../public/database/articel.json";
import fs from "fs";

function getPromise({ url }) {
  const itemId = url.split("/").pop(); // 获取文章itemId
  return axios.post("https://api.juejin.cn/interact_api/v1/comment/list", {
    item_id: itemId,
    item_type: 2,
    cursor: "0",
    limit: 999,
    sort: 0,
    client_type: 2608,
  });
}

export async function GET(request, context) {
  const promise = articels.map(getPromise); // 构建所有文章的请求
  const res = await Promise.all(promise);

  // 因为一个用户可以存在多个徽章，所以这里用一个map接收
  const user = {};
  // 遍历请求数据并将结果和徽章信息绑定
  res.forEach((item, index) => {
    const { icon, name } = articels[index];
    item.data.data.forEach((subitem) => {
      const { user_info, comment_info } = subitem;
      const { ctime } = comment_info;
      const { user_name, user_id, job_title, company, avatar_large } =
        user_info;

      if (!user[user_id]) {
        user[user_id] = {
          user_name,
          ctime,
          user_id,
          job_title,
          company,
          avatar_large,
          badges: [{ icon, name }],
        };
      } else {
        user[user_id].badges.push({ icon, name });
      }
    });
  });

  // 在写入的时候，对用户进行排序
  fs.writeFileSync(
    "./public/database/user.json",
    JSON.stringify(Object.values(user).sort((a, b) => b.ctime - a.ctime))
  );

  return NextResponse.json({ data: "获取成功" }, { status: 200 });
}
