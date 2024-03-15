const ExcelJS = require("exceljs");
const path = require("path");
const inputPath = path.resolve(__dirname, "../input");
const outputPath = path.resolve(__dirname, "../out");

const loadInput = async () => {
  const workbook = new ExcelJS.Workbook();
  const inputFile = await workbook.xlsx.readFile(inputPath + "/工资表.xlsx");
  // 基本工资
  const baseSalarySheet = inputFile.getWorksheet("基本工资");
  // 补发补扣
  const supplementSheet = inputFile.getWorksheet("补发补扣");

  const baseSalaryContent = baseSalarySheet.getRows(
    2,
    baseSalarySheet.rowCount
  );

  const baseSalary = {};

  baseSalaryContent.forEach((row) => {
    const shopName = row.getCell("B").value;
    if (!shopName) return;

    const name = row.getCell("C").value;
    const salary = row.getCell("D").value;
    if (!baseSalary[shopName]) {
      baseSalary[shopName] = [];
    }
    baseSalary[shopName].push({
      name,
      salary,
    });
  });

  // 补发补扣
  const supplement = {};
  supplementSheet.getRows(2, supplementSheet.rowCount).forEach((row) => {
    const name = row.getCell("C").value;
    const type = row.getCell("H").value;

    let count = row.getCell("D").value;
    // 如果为补扣，则金额为负数
    if (type === "补扣") {
      count = -count;
    }
    if (!supplement[name]) {
      supplement[name] = 0;
    }
    supplement[name] += count;
  });

  Object.keys(baseSalary).forEach((shopName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("工资表");

    // 添加表头
    worksheet.addRow([
      "序号",
      "门店",
      "姓名",
      "基本工资",
      "补发补扣",
      "最终工资",
    ]);

    const count = [0, 0, 0];
    baseSalary[shopName].forEach((employee, index) => {
      count[0] += +employee.salary;
      count[1] += supplement[employee.name] || 0;
      count[2] += +employee.salary + (supplement[employee.name] || 0);
      worksheet.addRow([
        index + 1,
        shopName,
        employee.name,
        +employee.salary,
        supplement[employee.name] || 0,
        {
          formula: `D${index + 2}+E${index + 2}`,
          result: +employee.salary + (supplement[employee.name] || 0),
        },
      ]);
    });
    worksheet.addRow([
      "合计",
      "",
      "",
      {
        formula: `SUM(D2:D${baseSalary[shopName].length + 1})`,
        result: count[0],
      },
      {
        formula: `SUM(E2:E${baseSalary[shopName].length + 1})`,
        result: count[1],
      },
      {
        formula: `SUM(F2:F${baseSalary[shopName].length + 1})`,
        result: count[2],
      },
    ]);
    worksheet.mergeCells(
      `A${baseSalary[shopName].length + 2}:C${baseSalary[shopName].length + 2}`
    );

    worksheet.addConditionalFormatting({
      ref: `A1:F${baseSalary[shopName].length + 2}`,
      rules: [
        {
          type: "expression",
          formulae: ["true"],
          style: {
            border: {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            },
            alignment: { vertical: "top", horizontal: "left", wrapText: true },
          },
        },
      ],
    });
    workbook.xlsx.writeFile(outputPath + `/${shopName}工资表.xlsx`);
  });
};

loadInput();
