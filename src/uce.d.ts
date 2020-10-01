type Tag = import('uhtml').Tag;

declare function render<T extends Node>(
  node: T,
  renderer: (() => Renderable) | Renderable,
): T;

declare module 'uce' {
  // T: Attributes passed to the component.
  // U: Internal state and functions.
  type HTML = Tag<HTMLElement>;
  type SVG = Tag<SVGElement>;
  type CSS = (strings: TemplateStringsArray, ...values: unknown[]) => string;
  type Render<T, U> = (
    this: T & U & { html: HTML; render: Render<T, U> },
  ) => unknown;
  type EventOptions = { once: true } | boolean;

  /**
   * User provided definition: all entries are optional.
   */
  interface Definition<T = void, U = void> {
    /**
     * Element to extend.
     * Default: 'element' as HTMLElement.
     */
    extends?: string;

    /**
     * Injects a `<style>` element in the document `<head>`, once per class definition.
     */
    style?: (selector: string) => string;

    /**
     * like the constructor but granted to be invoked *only once* on bootstrap
     * and *always* before connected/attributeChanged/props.
     */
    init?: (
      this: { props: T } & U & { html: HTML; render: Render<T, U> },
    ) => unknown;
    render?: Render<T, U>;
    props?: T;
    bound?: string[];
    observedAttributes?: string[];
    attributeChanged?: (
      name: string,
      oldValue: unknown,
      newValue: unknown,
    ) => unknown;
    connected?: () => void;
    disconnected?: () => void;
    attachShadow?: { mode: 'closed' | 'open' };

    // Additional options that cannot be typed and need to be written in the component's interface extend,
    // for example:
    // onClick?: (event) => unknown; // events
    // onClickOptions?: EventOptions; // event listener settings
    // test?: unknown; // variables to access by getter/setter function: get test() and set test(value)
    // method?: (args?: unknown) => unknown;
  }

  interface Uce {
    css: CSS;
    html: HTML;
    svg: SVG;
    define<T, U>(tagName: string, definition: Definition<T, U>): unknown;
    render<T extends Node>(
      node: T,
      renderer: (() => Renderable) | Renderable,
    ): T;
  }
}

declare var uce: uce.Uce;

declare module 'uce' {
  export = uce;
}
