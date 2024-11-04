const ExcelJs = require("exceljs");
const filepath = "download.xlsx";

async function WriteExcel(SearchText, replaceText, Change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");

  let Output = await readExcel(worksheet, SearchText);

  const cell = worksheet.getCell(
    Output.row + Change.rowChange,
    Output.column + Change.colChange
  );
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, SearchText) {
  let Output = { row: -1, column: -1 };
  await worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, cellNumber) => {
      //Searching Value in the cell and getting  row and column number
      if (cell.value === SearchText) {
        Output.row = rowNumber;
        Output.column = cellNumber;
        console.log("Row: " + rowNumber + " Column: " + cellNumber);
      }
    });
  });

  return Output;
}

WriteExcel("Aman", "6790", { rowChange: 0, colChange: 2 }, filepath);
