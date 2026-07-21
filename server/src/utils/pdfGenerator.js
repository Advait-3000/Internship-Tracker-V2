import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (data, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Example standard format
      doc.fontSize(20).text("Report", { align: "center" });
      doc.moveDown();

      if (typeof data === "string") {
        doc.fontSize(12).text(data);
      } else {
        doc.fontSize(12).text(JSON.stringify(data, null, 2));
      }

      doc.end();

      stream.on("finish", () => {
        resolve(outputPath);
      });

      stream.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
