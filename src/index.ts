import { define } from 'uce';
import { MyCounter, tagName } from './MyCounter/MyCounter';
import { MyCounter as MyCounterPostCSS, tagName as myCounterPostCSSTagName } from './MyCounterPostCSS/MyCounterPostCSS';

define(tagName, MyCounter);
define(myCounterPostCSSTagName, MyCounterPostCSS);

