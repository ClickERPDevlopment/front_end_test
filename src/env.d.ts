/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}
declare module "react-window" {
  import * as React from "react";

  export interface ListChildComponentProps {
    index: number;
    style: React.CSSProperties;
    data: any;
  }

  export interface FixedSizeListProps {
    height: number;
    width: number | string;
    itemSize: number;
    itemCount: number;
    itemData?: any;
    children: React.ComponentType<ListChildComponentProps>;
  }

  export class FixedSizeList extends React.Component<FixedSizeListProps> {}
}
