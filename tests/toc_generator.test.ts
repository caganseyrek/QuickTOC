import TOCGenerator from "../src/toc_generator";

describe("TOCGenerator", () => {
  let tocgenerator: TOCGenerator;
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="page-contents">
        <h1>H1 Element</h1>
        <h2>H2 Element 1</h2>
        <h3>H3 Element 1</h3>
        <h2>H2 Element 2</h2>
        <h2>H2 Element 3</h2>
        <h3>H3 Element 2</h3>
        <h4>H4 Element 1</h4>
        <h3>H3 Element 3</h3>
        <h2>H2 Element 4</h2>
      </div>
      <div id="toc-section"></div>
    `;

    tocgenerator = new TOCGenerator();
  });

  it("should create a TOC with default options", () => {
    tocgenerator.init();
    const tocSection = document.getElementById("toc-section");
    const tocItems = tocSection?.querySelector("ol, ul");

    expect(tocSection).not.toBeNull();
    expect(tocItems?.children.length).toBeGreaterThan(0);
    expect(tocSection?.querySelectorAll("li").length).toBe(8);
  });

  it("should exclude H1 elements when includeH1 option is set to false", () => {
    tocgenerator.init({ includeH1: false });
    const tocLinks = document.querySelectorAll("#toc a");
    const hasH1Element = Array.from(tocLinks).some((link) => link.textContent === "H1 Element");

    expect(hasH1Element).toBe(false);
  });

  it("should add ids to headings if they don't have one", () => {
    tocgenerator.init();
    const headings = document.querySelectorAll("#page-contents h1, h2, h3, h4");

    headings.forEach((heading) => expect(heading.id).toBeTruthy());
  });

  it("should create nested lists for subheadings", () => {
    tocgenerator.init();
    const subLists = document.querySelectorAll(
      ".toc-sublist, .toc-doublesublist, .toc-triplesublist",
    );

    expect(subLists.length).toBeGreaterThan(0);
  });

  it("should log a console error if the pageContents element is not fount", () => {
    console.error = jest.fn();
    document.getElementById("page-contents")?.remove();

    tocgenerator.init();
    expect(console.error).toHaveBeenCalledWith("Cannot get pageContents element");
  });

  it("should log a console error if the tocSection element is not fount", () => {
    console.error = jest.fn();
    document.getElementById("toc-section")?.remove();

    tocgenerator.init();
    expect(console.error).toHaveBeenCalledWith("Cannot get tocSection element");
  });

  it("should log a console error if there are no headings in the pageContents element", () => {
    console.error = jest.fn();
    const pageContents = document.getElementById("page-contents");
    if (pageContents) {
      pageContents.innerHTML = "Does not have headings";
    }

    tocgenerator.init();
    expect(console.error).toHaveBeenCalledWith("Cannot get headings");
  });
});
