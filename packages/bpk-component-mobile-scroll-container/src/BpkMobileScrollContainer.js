/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-mobile-scroll-container.scss';

const getClassName = cssModules(STYLES);

const computeScrollBarAwareHeight = (scrollerEl, innerEl) => {
  if (!(scrollerEl && innerEl)) {
    return null;
  }

  const scrollBarVisibile = (scrollerEl.offsetHeight - innerEl.offsetHeight) > 0;
  return scrollBarVisibile ? `${innerEl.offsetHeight / 16}rem` : 'auto';
};

const computeScrollIndicatorClassName = (scrollerEl) => {
  if (!scrollerEl) {
    return null;
  }

  const classNames = [];
  const { scrollLeft, scrollWidth, offsetWidth } = scrollerEl;

  if (scrollLeft > 0) { classNames.push(getClassName('bpk-mobile-scroll-container--left-indicator')); }
  if (scrollLeft < (scrollWidth - offsetWidth)) {
    classNames.push(getClassName('bpk-mobile-scroll-container--right-indicator'));
  }

  return classNames;
};

class BpkMobileScrollContainer extends Component {
  constructor() {
    super();

    this.state = {
      computedHeight: 'auto',
      scrollIndicatorClassName: '',
    };

    this.setScrollBarAwareHeight = this.setScrollBarAwareHeight.bind(this);
    this.setScrollIndicatorClassName = this.setScrollIndicatorClassName.bind(this);
    this.onWindowResize = debounce(this.onWindowResize.bind(this), 100);
  }

  componentDidMount() {
    this.setScrollBarAwareHeight();
    this.setScrollIndicatorClassName();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    this.setScrollBarAwareHeight();
    this.setScrollIndicatorClassName();
  }

  setScrollIndicatorClassName() {
    const classNames = computeScrollIndicatorClassName(this.scrollerEl);

    if (!classNames) {
      return;
    }

    this.setState(() => ({
      scrollIndicatorClassName: classNames.join(' '),
    }));
  }

  setScrollBarAwareHeight() {
    const computedHeight = computeScrollBarAwareHeight(this.scrollerEl, this.innerEl);

    if (!computedHeight) {
      return;
    }

    this.setState(() => ({ computedHeight }));
  }

  render() {
    const classNames = [getClassName('bpk-mobile-scroll-container')];
    const {
      children, innerContainerTagName, className, style, ...rest
    } = this.props;

    if (className) { classNames.push(className); }
    if (this.state.scrollIndicatorClassName) { classNames.push(this.state.scrollIndicatorClassName); }

    const InnerContainer = innerContainerTagName;

    return (
      <div
        {...rest}
        className={classNames.join(' ')}
        style={{ ...style, height: this.state.computedHeight }}
      >
        <div
          ref={(el) => { this.scrollerEl = el; }}
          onScroll={this.setScrollIndicatorClassName}
          className={getClassName('bpk-mobile-scroll-container__scroller')}
        >
          <InnerContainer
            ref={(el) => { this.innerEl = el; }}
            className={getClassName('bpk-mobile-scroll-container__inner')}
          >
            {children}
          </InnerContainer>
        </div>
      </div>
    );
  }
}

BpkMobileScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
  innerContainerTagName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkMobileScrollContainer.defaultProps = {
  innerContainerTagName: 'div',
  className: null,
  style: null,
};

export default BpkMobileScrollContainer;
export { computeScrollBarAwareHeight, computeScrollIndicatorClassName };
