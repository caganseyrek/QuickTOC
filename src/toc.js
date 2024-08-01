function GenerateTOC(includeH1 = false, pageContentsId = "page-contents", tocSectionId = "toc") {
  const pageContents = document.getElementById(pageContentsId);
  if (!pageContents) {
    console.error("Cannot get pageContents element");
    return;
  }
  const headings = pageContents.querySelectorAll("h1,h2,h3,h4");
  if (!headings) {
    console.error("Cannot get headings");
    return;
  }
  const tocSection = document.getElementById(tocSectionId);
  if (!tocSection) {
    console.error("Cannot get toc section");
    return;
  }

  let toclist = document.createElement("ol");

  let prevHeading = "";
  let prevSubList = 0;
  let prevDoubleSublist = 0;
  let prevTripleSublist = 0;

  for (let i = 0; i <= headings.length - 1; i++) {
    let id = headings[i].textContent.toLowerCase().replace(/ /g, "-");
    let level = headings[i].localName.replace("h", "");
    let text = headings[i].textContent;

    if (includeH1 === false) {
      let _temp = Number(level);
      _temp--;
      level = _temp.toString();
    }

    headings[i].setAttribute("id", id);
    let listitem = document.createElement("li");
    let anchor = document.createElement("a");
    anchor.setAttribute("href", "#" + id);
    anchor.textContent = text;
    listitem.appendChild(anchor);

    if (level === "1") {
      toclist.appendChild(listitem);
      prevHeading = level;
    } else if (level === "2") {
      if (prevHeading == level) {
        document.getElementsByClassName("toc-sublist")[prevSubList - 1].appendChild(listitem);
      } else {
        let sublist = document.createElement("ul");
        prevSubList++;
        sublist.setAttribute("class", "toc-sublist");
        sublist.appendChild(listitem);
        toclist.appendChild(sublist);
      }
      prevHeading = level;
    } else if (level === "3") {
      if (prevHeading == level) {
        document.getElementsByClassName("toc-doublesublist")[prevDoubleSublist - 1].appendChild(listitem);
      } else {
        let doubleSubList = document.createElement("ul");
        prevDoubleSublist++;
        doubleSubList.setAttribute("class", "toc-doublesublist");
        doubleSubList.appendChild(listitem);
        document.getElementsByClassName("toc-sublist")[prevSubList - 1].appendChild(doubleSubList);
      }
      prevHeading = level;
    } else if (level === "4") {
      if (prevHeading == level) {
        document.getElementsByClassName("toc-triplesublist")[prevTripleSublist - 1].appendChild(listitem);
      } else {
        let tripleSublist = document.createElement("ul");
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
