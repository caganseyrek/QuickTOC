import QuickTOC from "../src/quicktoc";

describe("QuickTOC", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="content">
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
      <div id="toc"></div>
    `;
  });

  it("should create a TOC with default options", () => {
    QuickTOC.init();
    const tocSection = document.getElementById("toc");
    const tocItems = tocSection?.querySelector("ol, ul");

    expect(tocSection).not.toBeNull();
    expect(tocItems?.children.length).toBeGreaterThan(0);
    expect(tocSection?.querySelectorAll("li").length).toBe(8);
  });

  it("should exclude H1 elements when includeH1 option is set to false", () => {
    QuickTOC.init({ includeH1Element: false, levelQuery: "h1,h2,h3,h4,h5" });
    const tocLinks = document.querySelectorAll("#toc a");
    const hasH1Element = Array.from(tocLinks).some((link) => link.textContent === "H1 Element");

    expect(hasH1Element).toBe(false);
  });

  it("should add ids to headings if they don't have one", () => {
    QuickTOC.init();
    const headings = document.querySelectorAll("#page-contents h1, h2, h3, h4");

    headings.forEach((heading) => expect(heading.id).toBeTruthy());
  });

  it("should create nested lists for subheadings", () => {
    QuickTOC.init();
    const subLists = document.querySelectorAll(".toc-level-1,.toc-level-2,.toc-level-3,.toc-level-4,.toc-level-5");

    expect(subLists.length).toBeGreaterThan(0);
  });

  it("should log a console error if the content element is not fount", () => {
    console.error = jest.fn();
    document.getElementById("contents")?.remove();

    QuickTOC.init();
    expect(console.error);
  });
});
