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
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-ticket.scss';

const getClassName = cssModules(STYLES);

const isIE9 = () => {
  if (typeof window === 'undefined') return false;
  return (window.navigator.appVersion.indexOf('MSIE 9.') !== -1);
};

const BpkTicket = (props) => {
  const {
    children, href, padded, stub, vertical, className, stubClassName, stubProps, ...rest
  } = props;
  const classNames = [getClassName('bpk-ticket')];
  const mainClassNames = ['bpk-ticket__paper', 'bpk-ticket__main'].map(getClassName);
  const stubClassNames = ['bpk-ticket__paper', 'bpk-ticket__stub'].map(getClassName);
  const punchlineClassNames = [getClassName('bpk-ticket__punchline')];
  const startNotchClassNames = [getClassName('bpk-ticket__notch')];
  const endNotchClassNames = [getClassName('bpk-ticket__notch')];
  const fallback = isIE9();

  if (className) { classNames.push(className); }
  if (stubClassName) { stubClassNames.push(stubClassName); }
  if (padded) {
    mainClassNames.push(getClassName('bpk-ticket__main--padded'));
    stubClassNames.push(getClassName('bpk-ticket__stub--padded'));
  }
  if (vertical) {
    classNames.push(getClassName('bpk-ticket--vertical'));
    mainClassNames.push(getClassName('bpk-ticket__main--vertical'));
    stubClassNames.push(getClassName('bpk-ticket__stub--vertical'));
    punchlineClassNames.push(getClassName('bpk-ticket__punchline--horizontal'));
    startNotchClassNames.push(getClassName('bpk-ticket__notch--left'));
    endNotchClassNames.push(getClassName('bpk-ticket__notch--right'));
  } else {
    mainClassNames.push(getClassName('bpk-ticket__main--horizontal'));
    stubClassNames.push(getClassName('bpk-ticket__stub--horizontal'));

    if (!fallback) {
      punchlineClassNames.push(getClassName('bpk-ticket__punchline--vertical'));
      startNotchClassNames.push(getClassName('bpk-ticket__notch--top'));
      endNotchClassNames.push(getClassName('bpk-ticket__notch--bottom'));
    } else {
      classNames.push(getClassName('bpk-ticket--fallback'));
      mainClassNames.push(getClassName('bpk-ticket__paper--fallback'));
      stubClassNames.push(getClassName('bpk-ticket__paper--fallback'), getClassName('bpk-ticket__stub--fallback'));
      punchlineClassNames.push(getClassName('bpk-ticket__punchline--fallback'));
    }
  }

  const classNameFinal = classNames.join(' ');

  const contents = [
    <div
      key="main"
      className={mainClassNames.join(' ')}
    >
      {children}
    </div>,
    <div
      key="punchline"
      className={punchlineClassNames.join(' ')}
      role="presentation"
      aria-hidden="true"
    >
      <div className={startNotchClassNames.join(' ')} />
      <div className={endNotchClassNames.join(' ')} />
    </div>,
    <div
      key="stub"
      className={stubClassNames.join(' ')}
      {...stubProps}
    >
      {stub}
    </div>,
  ];

  if (href) {
    return (
      <a href={href} className={classNameFinal} {...rest}>
        { contents }
      </a>
    );
  }

  return (
    <div role="button" className={classNameFinal} {...rest}>
      { contents }
    </div>
  );
};

BpkTicket.propTypes = {
  children: PropTypes.node.isRequired,
  stub: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  padded: PropTypes.bool,
  vertical: PropTypes.bool,
  stubClassName: PropTypes.string,
  stubProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkTicket.defaultProps = {
  className: null,
  href: null,
  padded: true,
  vertical: false,
  stubClassName: null,
  stubProps: {},
};

export default BpkTicket;
