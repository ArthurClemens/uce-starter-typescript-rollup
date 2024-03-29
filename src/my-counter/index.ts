import { css, define, Definition } from 'uce';

/**
 * Simple Counter component example.
 * The styling is set by the `style` function.
 */

/**
 * Attributes passed to the component:
 * `<my-counter></my-counter>`
 * `<my-counter count="10"></my-counter>`
 */
type Props = {
  count?: string;
};

/**
 * Internal state and functions.
 */
type OwnProps = {
  count: number;
  inc: () => unknown;
  dec: () => unknown;
};

/**
 * Added Definition accessors.
 */
interface IMyCounter extends Definition<Props, OwnProps> {
  onClick: (event: Event) => void;
}

export const MyCounter: IMyCounter = {
  init: function () {
    this.count =
      this.props.count !== undefined ? parseInt(this.props.count, 10) : 0;
    this.dec = () => {
      this.count--;
      this.render();
    };
    this.inc = () => {
      this.count++;
      this.render();
    };
    this.classList.add('my-prefix');
    this.render();
  },
  style: (selector: string) => {
    const size = '64px';
    return css`
      ${selector} {
        display: block;
        margin: 10px;
        font-weight: bold;
        font-size: calc(${size} / 2);
      }
      ${selector} span {
        width: 2em;
        display: inline-block;
        text-align: center;
      }
      ${selector} button {
        width: ${size};
        height: ${size};
        line-height: calc(${size} - 10px);
        border: none;
        padding: 0;
        display: inline-block;
        border-radius: 10px;
        background-color: LightSeaGreen;
        color: white;
        font-size: inherit;
      }
      ${selector}:before {
        content: 'my-counter';
        display: block;
        font-size: 14px;
        font-weight: normal;
        margin: 20px 0 10px 0;
      }
    `;
  },
  render: function () {
    this.html`
      <button onclick="${this.dec}">-</button>
      <span>${this.count}</span>
      <button onclick="${this.inc}">+</button>
    `;
  },
  observedAttributes: ['count'],
  attributeChanged(name, oldValue, newValue) {
    if (oldValue === null) {
      console.log('attributeChanged (initial)', name, oldValue, newValue);
    } else {
      console.log('attributeChanged (updated)', name, oldValue, newValue);
    }
  },
  // Added Definition accessors:
  onClick: (evt: Event) => console.log(evt),
};

define('my-counter', MyCounter);
