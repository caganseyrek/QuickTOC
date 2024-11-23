import * as Types from "./types";

class QuickTOC {
  private tocRootListType: Types.TOCRootListTypes = "bulleted";
  private pageContentElementId: string = "content";
  private tocPlacementElementId: string = "toc";
  private tocLevelClasses: Types.TOCLevelClassType | undefined;
  private levelQuery: string = "h1,h2,h3,h4,h5,h6";
  private debugMode: boolean = true;

  private tocStack: Types.TOCStackInterface[] = [];
  private outerListType: string = this.tocRootListType === "numbered" ? "ol" : "ul";
  private generatedTOC: HTMLElement = document.createElement(this.outerListType);

  private log({ message, logType }: Types.LogFunctionProps): void {
    if (logType === "error") {
      console.error(`[QuickTOC_ERROR]: ${message}`);
      throw new Error(message);
    }
    if (this.debugMode) {
      // eslint-disable-next-line no-console
      return console.debug(`[QuickTOC_DEBUG]: ${message}`);
    }
  }

  private validateLevelClasses(): void {
    let previousKeyLevel: number = 0;
    for (const key in this.tocLevelClasses) {
      const keyLevel: string[] | null = this.tocLevelClasses[key].match(/\d+(\.\d+)?/g);
      if (!keyLevel) {
        this.log({ message: "An error occured tring to get key level.", logType: "error" });
        return;
      }
      const parsedKeyLevel = parseInt(keyLevel[0], 10);
      if (parsedKeyLevel - previousKeyLevel !== 1) {
        this.log({ message: "Given level classes are not valid", logType: "error" });
        return;
      }
      previousKeyLevel = parsedKeyLevel;
    }
    return;
  }

  private validateLevelQueryString(): string {
    let queryString: string = "";
    const keyLevels: string[] | null = this.levelQuery.match(/\d+(\.\d+)?/g);
    if (!keyLevels) {
      return "";
    }
    const keyLevelsAsNumber: number[] = keyLevels.map((level) => parseInt(level, 10));
    for (let i: number = 1; i < keyLevels.length; i++) {
      if (i > 0 && keyLevelsAsNumber[i] - keyLevelsAsNumber[i - 1] !== 1) {
        return "";
      }
      queryString += `h${keyLevelsAsNumber[i]}`;
      if (i < keyLevels.length - 1) {
        queryString += ",";
      }
    }
    return queryString;
  }

  private getLevelClass({ level }: { level: number }): string {
    if (this.tocLevelClasses) {
      const givenClass = this.tocLevelClasses[`toc-level-${level}`];
      if (!givenClass) {
        this.log({ message: `Cannot find correct class for heading level ${level}`, logType: "error" });
        return `toc-level-${level}`;
      }
      return givenClass;
    }
    return `toc-level-${level}`;
  }

  private newListItem({ listItemId, listItemText }: Types.NewListItemFunctionProps): HTMLLIElement {
    const anchorElement: HTMLAnchorElement = document.createElement("a");
    anchorElement.setAttribute("href", `#${listItemId}`);
    anchorElement.textContent = listItemText;

    const listItemElement: HTMLLIElement = document.createElement("li");
    listItemElement.appendChild(anchorElement);

    return listItemElement;
  }

  private organizeSublists(): void {
    const result: Types.TOCStackInterface[] = [];
    const stack: Types.TOCStackInterface[] = [];

    for (const heading of this.tocStack) {
      const newNode: Types.TOCStackInterface = {
        elementLevel: heading.elementLevel,
        elementText: heading.elementText,
        subElements: [] as Types.TOCStackInterface[],
      };
      while (stack.length > 0 && stack[stack.length - 1].elementLevel >= heading.elementLevel) {
        stack.pop();
      }
      if (stack.length === 0) {
        result.push(newNode);
      } else {
        stack[stack.length - 1].subElements.push(newNode);
      }
      stack.push(newNode);
    }
    this.tocStack = result;
  }

  private generateTable({ elements, parentElement }: Types.GenerateTableProps): void {
    elements.forEach((node) => {
      const newListItem: HTMLLIElement = this.newListItem({ listItemId: node.elementLevel, listItemText: node.elementText });
      parentElement.appendChild(newListItem);

      if (node.subElements && node.subElements.length > 0) {
        const newSublist: HTMLUListElement = document.createElement("ul");
        const newSublistClass: string = this.getLevelClass({ level: node.elementLevel });
        newSublist.setAttribute("class", newSublistClass);
        parentElement.appendChild(newSublist);

        this.generateTable({ elements: node.subElements, parentElement: newSublist });
      }
    });
  }

  public init(config: Types.QuickTOCConfigProps = {}): void {
    this.validateLevelClasses();
    this.tocRootListType = config.tocRootListType ?? this.tocRootListType;
    this.pageContentElementId = config.pageContentElementId ?? this.pageContentElementId;
    this.tocPlacementElementId = config.tocPlacementElementId ?? this.tocPlacementElementId;
    this.tocLevelClasses = config.tocLevelClasses ?? this.tocLevelClasses;
    this.levelQuery = config.levelQuery ?? this.levelQuery;
    this.debugMode = config.debugMode ?? this.debugMode;

    const pageContentsElement = document.getElementById(this.pageContentElementId);
    if (!pageContentsElement) {
      this.log({ message: "Cannot get pageContent element.", logType: "error" });
      return;
    }

    const selectors: string = this.validateLevelQueryString();
    if (!selectors) {
      this.log({ message: "Cannot validate level queries.", logType: "error" });
      return;
    }

    const headingsFromPage = pageContentsElement.querySelectorAll(selectors);
    if (!headingsFromPage.length) {
      this.log({ message: "Cannot get heading elements.", logType: "error" });
      return;
    }

    const tocPlacementElement = document.getElementById(this.tocPlacementElementId);
    if (!tocPlacementElement) {
      this.log({ message: "Cannot get tocPlacement element.", logType: "error" });
      return;
    }

    for (let i: number = 0; i < headingsFromPage.length; i++) {
      const headingText: string | null = headingsFromPage[i].textContent;
      if (!headingText) {
        this.log({ message: "Cannot get text from heading element.", logType: "error" });
        break;
      }

      const idForAnchorElement: string = headingText.toLowerCase().replace(/ /g, "-");
      const currentHeadingLevel: number = Number(headingsFromPage[i].localName.replace("h", ""));
      if (typeof currentHeadingLevel !== "number") {
        this.log({ message: "Cannot convert heading level to number", logType: "error" });
        break;
      }
      headingsFromPage[i].setAttribute("id", idForAnchorElement);
      this.tocStack.push({ elementLevel: currentHeadingLevel, elementText: headingText, subElements: [] });
    }

    this.organizeSublists();
    this.generateTable({ elements: this.tocStack, parentElement: this.generatedTOC });
    tocPlacementElement.appendChild(this.generatedTOC);
    return;
  }
}

export default new QuickTOC();
