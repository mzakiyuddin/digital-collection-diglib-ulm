import { z } from "zod";
import { getPage, parsePage } from "~/utils/fetch";
import * as fs from "fs";

const dataSchema = z.object({
  no: z.string(),
  judul: z.string(),
  pengarang: z.string(),
  penerbit: z.string(),
  viewLink: z.string(),
});

const main = async () => {
  const maxPage = 257;

  const bucket = [] as z.infer<typeof dataSchema>[];

  for (let page = 1; page <= maxPage; page++) {
    console.log("[+] Scraping page " + page + " of " + maxPage);
    const html = await getPage(page);
    const data = parsePage(html);

    data.forEach((item) => {
      dataSchema.parse(item);
    });

    bucket.push(...data);
  }

  fs.writeFileSync("data.json", JSON.stringify(bucket, null, 2));
};

main();
