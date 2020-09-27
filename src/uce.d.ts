type Tag = import('uhtml').Tag;

declare module 'uce' {
  type EventOptions = { once: true } | boolean;

  type TStyle = (selector: string) => unknown;
  type TInit = (this: { props: T } & U & ProvidedDefinition<T, U>) => unknown; // "this": https://medium.com/better-programming/introduction-to-typescript-functions-this-object-and-overloads-6d03a90f1821
  type TRender = (this: U & ProvidedDefinition<T, U>) => unknown;
  type TCss = (strings: TemplateStringsArray, ...expr: unknown[]) => unknown;
  type TBound = string[];
  type TObservedAttributes = string[];
  type TExtends = string;
  type TAttributeChanged = (
    name: string,
    oldValue: unknown,
    newValue: unknown,
  ) => unknown;
  type THtml = (strings: TemplateStringsArray, ...expr: unknown[]) => unknown;
  type TAttachShadow = { mode: 'closed' | 'open' };

  /**
   * Uce provided definition.
   */
  interface ProvidedDefinition<T, U> {
    extends: TExtends;
    style: TStyle;
    init: TInit;
    render: TRender;
    bound: TBound;
    attachShadow: TAttachShadow;
    observedAttributes: TObservedAttributes;
    attributeChanged: TAttributeChanged;
    connected: () => void;
    disconnected: () => void;
    html: Tag<HTMLElement>;
  }

  /**
   * User provided definition: all entries are optional.
   */
  interface Definition<T, U> {
    extends?: TExtends;
    style?: TStyle;
    init?: TInit;
    render?: TRender;
    bound?: TBound;
    observedAttributes?: TObservedAttributes;
    attributeChanged?: TAttributeChanged;
    connected?: () => void;
    disconnected?: () => void;
    attachShadow?: TAttachShadow;
    html?: Tag<HTMLElement>;
  }

  interface Uce<T, U> extends Definition<T, U> {
    css: TCss;
    define(tagName, definition: Definition<T, U>): unknown;
  }
}

declare var uce: uce.Uce<unknown, unknown>;

declare module 'uce' {
  export = uce;
}
