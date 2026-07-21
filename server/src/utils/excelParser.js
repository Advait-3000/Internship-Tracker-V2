import ExcelJS from "exceljs";

export const parseExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];
  
  const data = [];
  const headers = [];
  
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        headers[colNumber] = cell.value;
      });
    } else {
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber]] = cell.value;
      });
      data.push(rowData);
    }
  });
  
  return data;
};

export const generateExcel = async (columns, data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  
  worksheet.columns = columns;
  
  data.forEach((item) => {
    worksheet.addRow(item);
  });
  
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
