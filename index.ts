import { z } from "zod";
import { getMaxPage, getPage, parsePage } from "~/utils/fetch";
import { toCSV, toJSON } from "~/utils/save";

const dataSchema = z.object({
  no: z.string(),
  judul: z.string(),
  pengarang: z.string(),
  penerbit: z.string(),
  viewLink: z.string(),
  previewLink: z.string(),
});

const main = async () => {
  const maxPage = await getMaxPage();

  console.log("[+] Done, max page is " + maxPage);

  const bucket = [] as z.infer<typeof dataSchema>[];

  console.log("[+] Scraping data...");
  for (let page = 1; page <= maxPage; page++) {
    console.log("[+] Scraping page " + page + " of " + maxPage);
    const html = await getPage(page);
    const data = parsePage(html);

    data.forEach((item) => {
      dataSchema.parse(item);
    });

    bucket.push(...data);
  }

  console.log("[+] Success scraping data!");

  toJSON({ data: bucket });
  toCSV({ data: bucket });
};

main();
