import { ChangeEventHandler, useState } from "react";
import * as XLSX from "xlsx";

import "./Excel.css";

const Excel = () => {
  const [data, setData] = useState<string[][]>();
  const read: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.currentTarget.files;
    if (files) {
      const f = files[0];
      /* f is a File */
      const data = await f.arrayBuffer();
      /* data is an ArrayBuffer */
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets.Sheet1;
      const rows = [];
      for (let i = 1; i < 300; i++) {
        const bidCoord = ("C" + i) as keyof typeof workbook;
        const bidCell = sheet[bidCoord];
        if (!bidCell?.v) {
          break;
        }
        const rowValues = ["A", "B", "C", "D"].map((letter) => {
          const coord = (letter + i) as keyof typeof workbook;
          const cell = sheet[coord];
          if (cell) {
            return cell.v;
          } else {
            return "";
          }
        });
        rows.push(rowValues);
      }
      setData(rows);
    }
  };

  const renderRow = (row: string[]) => {
    return (
      <div className="xl-page">
        <div className="xl-name">
          {row[0]} {row[1]}
        </div>
        <div className="xl-bid-no">{row[2]}</div>
        {!!row[3] && (
          <div className="xl-table">{row[3].slice(0, row[3].length - 1)}</div>
        )}
      </div>
    );
  };

  if (data) {
    return <div>{data.map((row) => renderRow(row))}</div>;
  }

  return (
    <div>
      <input type="file" onChange={(e) => read(e)} />
    </div>
  );
};

export default Excel;
