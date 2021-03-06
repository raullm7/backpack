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
import BpkBlockquote from 'bpk-component-blockquote';

import blockquotesReadme from 'bpk-component-blockquote/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import PresentationBlock from './../../components/PresentationBlock';

const blurb = [
  <Paragraph>
    The blockquote component allows the creation of a section that is quoted
    from another source.
  </Paragraph>,
  <PresentationBlock>
    <BpkBlockquote>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus.
    </BpkBlockquote>
  </PresentationBlock>,
];

const BlockquotesPage = () => (
  <DocsPageBuilder
    title="Blockquotes"
    showMenu={false}
    readme={blockquotesReadme}
    blurb={blurb}
  />
);

export default BlockquotesPage;
