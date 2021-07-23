import { define, Definition } from 'uce';
import './styles.css';

/**
 * Variation of the simple Counter component example.
 * The styling is set by postcss-enabled CSS, using root level CSS variables.
 */

/**
 * Attributes passed to the component:
 * `<my-counter-postcss></my-counter-postcss>`
 * `<my-counter-postcss count="10"></my-counter-postcss>`
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
  render: function () {
    this.html`
      <button onclick="${this.dec}">-</button>
      <span>${this.count}</span>
      <button onclick="${this.inc}">+</button>
    `;
  },
  // Added Definition accessors:
  onClick: (evt: Event) => console.log(evt),
};

define('my-counter-postcss-ie11', MyCounter);
