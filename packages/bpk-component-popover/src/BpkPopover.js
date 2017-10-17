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
import { BpkButtonLink } from 'bpk-component-link';
import BpkCloseButton from 'bpk-component-close-button';
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';

import STYLES from './bpk-popover.scss';
import { ARROW_ID } from './constants';

const getClassName = cssModules(STYLES);

const EVENT_SOURCES = {
  CLOSE_BUTTON: 'CLOSE_BUTTON',
  CLOSE_LINK: 'CLOSE_LINK',
};

const bindEventSource = (source, callback) => (event) => {
  if (event.persist) {
    event.persist();
  }

  callback(event, { source });
};

const BpkPopover = (props) => {
  const {
    id,
    onClose,
    label,
    closeButtonText,
    children,
    className,
    padded,
    labelAsTitle,
    closeButtonIcon,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-popover')];
  const bodyClassNames = [];

  // outer classNames
  if (className) { classNames.push(className); }

  // inner classNames
  if (padded) { bodyClassNames.push(getClassName('bpk-popover__body--padded')); }

  const labelId = `bpk-popover-label-${id}`;

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-popover--appear')}
      appearActiveClassName={getClassName('bpk-popover--appear-active')}
      transitionTimeout={200}
    >
      <section
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={labelId}
        className={classNames.join(' ')}
        {...rest}
      >
        <span id={ARROW_ID} className={getClassName('bpk-popover__arrow')} role="presentation" />
        <div className={getClassName('bpk-popover__inner')}>
          {labelAsTitle
            ? (
              <header className={getClassName('bpk-popover__header')}>
                <h2 id={labelId} className={getClassName('bpk-popover__heading')}>{label}</h2>
                &nbsp;
                {closeButtonIcon ?
                  <BpkCloseButton
                    className={getClassName('bpk-popover__close-button')}
                    label={closeButtonText}
                    onClick={bindEventSource(EVENT_SOURCES.CLOSE_BUTTON, props.onClose)}
                  />
                :
                  <BpkButtonLink
                    onClick={bindEventSource(EVENT_SOURCES.CLOSE_LINK, props.onClose)}
                  >
                    {closeButtonText}
                  </BpkButtonLink>
                }
              </header>
            ) : (
              <span id={labelId} className={getClassName('bpk-popover__label')}>{label}</span>
            )
          }
          <div className={bodyClassNames.join(' ')}>{children}</div>
          {!labelAsTitle && (
            <footer className={getClassName('bpk-popover__footer')}>
              <BpkButtonLink
                onClick={bindEventSource(EVENT_SOURCES.CLOSE_LINK, props.onClose)}
              >
                {closeButtonText}
              </BpkButtonLink>
            </footer>
          )}
        </div>
      </section>
    </TransitionInitialMount>
  );
};

BpkPopover.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  closeButtonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
  labelAsTitle: PropTypes.bool,
  closeButtonIcon: PropTypes.bool,
};

BpkPopover.defaultProps = {
  className: null,
  padded: true,
  labelAsTitle: false,
  closeButtonIcon: true,
};

export default BpkPopover;
