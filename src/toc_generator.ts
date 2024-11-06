interface TOCGeneratorProps {
  includeH1?: boolean;
  pageContentsId?: string;
  tocSectionId?: string;
}

export default class TOCGenerator {
  private includeH1?: boolean;
  private pageContentsId?: string;
  private tocSectionId?: string;

  public init({ includeH1 = false, pageContentsId = "page-contents", tocSectionId = "toc-section" }: TOCGeneratorProps = {}): void {
    this.includeH1 = includeH1;
    this.pageContentsId = pageContentsId;
    this.tocSectionId = tocSectionId;

    const pageContents: HTMLElement | null = document.getElementById(this.pageContentsId);
    if (!pageContents) {
      console.error("Cannot get pageContents element");
      return;
    }

    const headings = pageContents.querySelectorAll("h1,h2,h3,h4");
    if (!headings.length) {
      console.error("Cannot get headings");
      return;
    }

    const tocSection: HTMLElement | null = document.getElementById(this.tocSectionId);
    if (!tocSection) {
      console.error("Cannot get tocSection element");
      return;
    }

    const toclist: HTMLOListElement = document.createElement("ol");

    let prevHeading: string = "";
    let prevSubList: number = 0;
    let prevDoubleSublist: number = 0;
    let prevTripleSublist: number = 0;

    for (let i: number = 0; i <= headings.length - 1; i++) {
      const headingText: string | null = headings[i].textContent;
      if (!headingText) {
        console.error("Cannot get heading text");
        break;
      }

      const id: string = headingText.toLowerCase().replace(/ /g, "-");
      let level: string = headings[i].localName.replace("h", "");

      if (!this.includeH1) {
        let _temp = Number(level);
        _temp--;
        level = _temp.toString();
      }

      headings[i].setAttribute("id", id);
      const listitem: HTMLLIElement = document.createElement("li");
      const anchor: HTMLAnchorElement = document.createElement("a");

      anchor.setAttribute("href", "#" + id);
      anchor.textContent = headingText;
      listitem.appendChild(anchor);

      if (level === "1") {
        toclist.appendChild(listitem);
        prevHeading = level;
      } else if (level === "2") {
        if (prevHeading === level) {
          document.getElementsByClassName("toc-sublist")[prevSubList - 1].appendChild(listitem);
        } else {
          const sublist = document.createElement("ul");
          prevSubList++;
          sublist.setAttribute("class", "toc-sublist");
          sublist.appendChild(listitem);
          toclist.appendChild(sublist);
        }
        prevHeading = level;
      } else if (level === "3") {
        if (prevHeading === level) {
          document.getElementsByClassName("toc-doublesublist")[prevDoubleSublist - 1].appendChild(listitem);
        } else {
          const doubleSubList = document.createElement("ul");
          prevDoubleSublist++;
          doubleSubList.setAttribute("class", "toc-doublesublist");
          doubleSubList.appendChild(listitem);
          document.getElementsByClassName("toc-sublist")[prevSubList - 1].appendChild(doubleSubList);
        }
        prevHeading = level;
      } else if (level === "4") {
        if (prevHeading === level) {
          document.getElementsByClassName("toc-triplesublist")[prevTripleSublist - 1].appendChild(listitem);
        } else {
          const tripleSublist = document.createElement("ul");
          prevTripleSublist++;
          tripleSublist.setAttribute("class", "toc-triplesublist");
          tripleSublist.appendChild(listitem);
          document.getElementsByClassName("toc-doublesublist")[prevSubList - 1].appendChild(tripleSublist);
        }
        prevHeading = level;
      }
      tocSection.appendChild(toclist);
    }
  }
}
