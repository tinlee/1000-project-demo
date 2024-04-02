import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import articels from "@/database/articel.json";
import fs from "fs";
type Params = {
  team: string;
};

function getPromise({ url }: { url: string }): Promise<AxiosResponse> {
  const itemId = url.split("/").pop();
  return axios.post("https://api.juejin.cn/interact_api/v1/comment/list", {
    item_id: itemId,
    item_type: 2,
    cursor: "0",
    limit: 999,
    sort: 0,
    client_type: 2608,
  });
}

export async function GET(request: Request, context: { params: Params }) {
  const promise = articels.map(getPromise);
  const res = await Promise.all(promise);
  const user = {};
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
          bradges: [{ icon, name }],
        };
      } else {
        console.log(user_name, "多次回复");
        user[user_id].bradges.push({ icon, name });
      }
    });
  });
  fs.writeFileSync(
    "./public/database/user.json",
    JSON.stringify(Object.values(user).sort((a, b) => b.ctime - a.ctime))
  );

  return NextResponse.json(
    { data: res.map((item) => item.data) },
    { status: 200 }
  );
}
