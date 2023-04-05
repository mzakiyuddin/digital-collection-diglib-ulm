import cheerio from "~/lib/cheerio";
import fetch from "cross-fetch";

export const getPage = async (page: number) => {
  const url = `http://digilib.ulm.ac.id/archive/digital/catalogue.php?page=${page}&key=ALL`;
  const response = await fetch(url);
  const html = await response.text();
  return html;
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
