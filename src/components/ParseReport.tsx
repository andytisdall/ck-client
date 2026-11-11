import { ChangeEventHandler, useState } from "react";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  Title,
  LinearScale,
  //@ts-ignore
} from "chart.js";
import randomColor from "randomcolor";

import "./cbo/cbo.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
);

const sortKeys = (obj: Record<string, number>) => {
  return Object.entries(obj)
    .sort(([, valueA], [, valueB]) => (valueA > valueB ? -1 : 1))
    .map(([key]) => key);
};

const sortValues = (obj: Record<string, number>) => {
  return Object.values(obj).sort((a, b) => (a > b ? -1 : 1));
};

const ParseReport = () => {
  const [data, setData] = useState<Record<string, Record<string, number>>>({});

  const read: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.currentTarget.files;
    if (files) {
      const f = files[0];
      /* f is a File */
      const buffer = await f.arrayBuffer();
      /* data is an ArrayBuffer */
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets.survey_0;

      const cols = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
      ];

      const questions: Record<string, Record<string, number>> = {};

      for (let i = 0; i < cols.length; i++) {
        const questionCoord = cols[i] + 1;
        const question: string = sheet[questionCoord].v;
        questions[question] = {};
      }

      for (let i = 2; i < 1000; i++) {
        const firstCell = sheet["A" + i];
        if (!firstCell?.v) {
          break;
        }

        cols.forEach((letter) => {
          const questionCoord = letter + 1;
          const question: string = sheet[questionCoord].v;
          const coord = letter + i;
          const cell = sheet[coord];
          if (cell) {
            const obj = questions[question];
            if (obj[cell.v]) {
              obj[cell.v]++;
            } else {
              obj[cell.v] = 1;
            }
            questions[question] = obj;
          }
        });
      }
      setData(questions);
    }
  };

  const dataKeys = Object.keys(data).filter((key) => key !== "ObjectID");

  if (!dataKeys.length) {
    return (
      <div className="cbo">
        <input type="file" onChange={read} />
      </div>
    );
  }

  return (
    <div className="cbo">
      {dataKeys.map((question) => {
        const responses = data[question];
        const responseOptions = sortKeys(responses);
        const responseValues = sortValues(responses);

        const colors = [];

        for (let i = 0; i < responseOptions.length; i++) {
          colors.push(randomColor());
        }

        return (
          <div key={question} className="pie">
            <h3>{question}</h3>
            <Bar
              data={{
                labels: responseOptions,
                datasets: [{ data: responseValues, backgroundColor: colors }],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ParseReport;
