import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ["vue", "uni-app"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      // dts: 'src/auto-import.d.ts'
      // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
      eslintrc: {
        enabled: true,
      },
    }),
  ],
});
