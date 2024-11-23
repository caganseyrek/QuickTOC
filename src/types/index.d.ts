declare interface QuickTOCConfigProps {
  includeH1Element?: boolean;
  pageContentElementId?: string;
  tocPlacementElementId?: string;
  tocLevelClasses?: TOCLevelClassType;
  levelQuery?: string;
  debugMode?: boolean;
}

declare type TOCRootListTypes = "numbered" | "dotted";

declare interface TOCStackInterface {
  elementLevel: number;
  elementText: string;
  subElements: TOCStackInterface[];
}

declare interface AppendToListProps {
  newListItem: HTMLLIElement;
  currentHeadingLevel: number;
}

declare interface LogFunctionProps {
  message: string;
  logType: "error" | "debug";
}

declare interface NewListItemFunctionProps {
  listItemId: number;
  listItemText: string;
}

declare interface GenerateTableProps {
  elements: TOCStackInterface[];
  parentElement: HTMLElement;
}

declare interface TOCLevelClassType {
  [key: string]: string;
}

export type {
  QuickTOCConfigProps,
  TOCRootListTypes,
  TOCStackInterface,
  AppendToListProps,
  LogFunctionProps,
  NewListItemFunctionProps,
  GenerateTableProps,
  TOCLevelClassType,
};
