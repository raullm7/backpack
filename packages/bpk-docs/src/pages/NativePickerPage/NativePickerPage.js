/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import readme from 'react-native-bpk-component-picker/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-picker/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-picker/screenshots/android/default.png';

import iosScreenshotDefaultPickerOpen from 'react-native-bpk-component-picker/screenshots/ios/default-picker-open.png';
import androidScreenshotDefaultPickerOpen from 'react-native-bpk-component-picker/screenshots/android/default-picker-open.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb:
      'Picker trigger elements which display the currently selected value and can be tapped to present the actual picker.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Nudger Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Nudger Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'picker-open',
    title: 'Picker Open',
    blurb: 'Picker modal open.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefaultPickerOpen}`,
        altText: 'iOS Default Nudger Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefaultPickerOpen}`,
        altText: 'Android Default Nudger Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeNudgerPage = () => (
  <DocsPageBuilder
    title="Pickers"
    blurb={[
      <Paragraph>
        Pickers let the user pick a single option from a limited list of
        possible options in a modal context. The list item ordering should be
        logical and aid the user in finding the item they want. For large lists
        consider another option such as a fullscreen modal with search.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    showMenu
  />
);

export default NativeNudgerPage;
