import { json2csv } from "json-2-csv";
import * as fs from "fs";

export const toCSV = async ({ data }: { data: any }) => {
  try {
    const csv = await json2csv(data);
    fs.writeFileSync("data.csv", csv);

    console.log("[+] Success convert to CSV!");
  } catch (error) {
    console.log("[!] Error: " + error);
  }
};

export const toJSON = async ({ data }: { data: any }) => {
  try {
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    console.log("[+] Success convert to JSON!");
  } catch (error) {
    console.log("[!] Error: " + error);
  }
};
