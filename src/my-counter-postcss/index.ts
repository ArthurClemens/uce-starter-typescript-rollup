import { define, Definition, EventOptions } from 'uce';
import './styles.css';

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
  onClickOptions: EventOptions;
  test: number; // some getter/setter
  method: () => string; // some method
}

export const MyCounter: IMyCounter = {
  init: function () {
    this.count = this.props.count !== undefined ? parseInt(this.props.count, 10) : 0;
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
  onClickOptions: { once: true },
  get test() {
    return Math.random();
  },
  set test(value: number) {
    console.log(value);
  },
  method: () => 'some data',
};

define('my-counter-postcss', MyCounter);
