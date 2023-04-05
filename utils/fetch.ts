import cheerio from "~/lib/cheerio";
import fetch from "cross-fetch";

export const getPage = async (page: number) => {
  const url = `http://digilib.ulm.ac.id/archive/digital/catalogue.php?page=${page}&key=ALL`;
  const response = await fetch(url);
  const html = await response.text();
  return html;
};

export const getMaxPage = () => {
  const INITIAL_PAGE = 1;

  console.log("[+] Getting max page...");

  type RecursiveGetMax = (page: number) => Promise<number>;

  const recursiveGetMax: RecursiveGetMax = async (page: number) => {
    console.log("[+] Testing max page: " + page);

    const html = await getPage(page);
    const $ = cheerio.load(html);

    const div = $(
      "#perspective > div > div > section > div > div:nth-child(3)",
    );

    const pages = div
      .find("a")
      .map((i, el) => {
        return $(el).text();
      })
      .get();

    const resultMaxPage = parseInt(pages[0]);

    if (resultMaxPage === page) {
      return page;
    }

    return recursiveGetMax(resultMaxPage);
  };

  return recursiveGetMax(INITIAL_PAGE);
};

export const parsePage = (html: string) => {
  const $ = cheerio.load(html);
  const trs = $("tr");
  const trsFiltered = trs.slice(1);

  const data = trsFiltered
    .map((i, el) => {
      const tds = $(el).find("td");

      const [no, judul, pengarang, penerbit, viewLink, previewLink] = tds
        .map((i, el) => {
          if (i === 4 || i === 5) {
            return $(el).find("a").attr("href");
          }

          return $(el).text();
        })
        .get();

      return {
        no,
        judul,
        pengarang,
        penerbit,
        viewLink,
        previewLink: `http://digilib.ulm.ac.id/archive/digital/${previewLink.slice(
          2,
        )}`,
      };
    })
    .get();

  return data;
};
