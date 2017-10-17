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

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BpkThemeProvider from 'react-native-bpk-theming';

import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';

import BpkButton, { BUTTON_TYPES } from './src/BpkButton';

import ArrowImageSrc from './long-arrow-right-3x.png';

const tokens = Platform.OS === 'ios' ?
  require('bpk-tokens/tokens/ios/base.react.native.common.js') :
  require('bpk-tokens/tokens/android/base.react.native.common.js');

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    height: 15,
    width: 17,
    tintColor: tokens.colorWhite,
  },
  imageLarge: {
    height: 22,
    width: 26,
    tintColor: tokens.colorWhite,
  },
  imageSecondary: {
    tintColor: tokens.colorBlue500,
  },
  imageDestructive: {
    tintColor: tokens.colorRed500,
  },
  buttonStyles: {
    marginBottom: tokens.spacingMd,
    marginRight: tokens.spacingMd,
  },
});

// Utility for creating arrow icons to show in the buttons.
const ArrowImage = ({ large, type }) => {
  const style = [large ? styles.imageLarge : styles.image];
  if (type === 'destructive') {
    style.push(styles.imageDestructive);
  }
  if (type === 'secondary') {
    style.push(styles.imageSecondary);
  }
  return <Image source={ArrowImageSrc} style={style} />;
};

ArrowImage.propTypes = {
  large: PropTypes.bool,
  type: PropTypes.string,
};

ArrowImage.defaultProps = {
  large: false,
  type: '',
};

const theme = {
  contentColor: '#2d244c',
  backgroundColor: '#fff',
  brandColors: {
    gradientStart: '#fce134',
    gradientEnd: '#f8c42d',
  },
};

const themeAttributes = {
  buttonPrimaryGradientStartColor: theme.brandColors.gradientStart,
  buttonPrimaryGradientEndColor: theme.brandColors.gradientEnd,
  buttonPrimaryTextColor: theme.contentColor,
  buttonSecondaryBackgroundColor: theme.backgroundColor,
  buttonSecondaryTextColor: theme.contentColor,
  buttonSecondaryBorderColor: theme.contentColor,
};

const generateButtonStoryForType = type => (
  <View key={type}>
    <StorySubheading>Default</StorySubheading>
    <View style={styles.btnContainer}>
      <BpkButton
        type={type}
        title="Button"
        onPress={action(`${type} pressed`)}
        style={styles.buttonStyles}
      />
      <BpkButton
        type={type}
        disabled
        title="Disabled"
        onPress={action(`${type} disabled pressed, somehow`)}
        style={styles.buttonStyles}
      />
      <BpkButton
        type={type}
        title="Icon only"
        icon={<ArrowImage type={type} />}
        iconOnly
        onPress={action(`${type} icon only button clicked`)}
        style={styles.buttonStyles}
      />
    </View>

    <StorySubheading>Large</StorySubheading>
    <View style={styles.btnContainer}>
      <BpkButton
        large
        type={type}
        title="Button"
        onPress={action(`${type} pressed`)}
        style={styles.buttonStyles}
      />
      <BpkButton
        large
        type={type}
        disabled
        title="Disabled"
        onPress={action(`${type} disabled pressed, somehow`)}
        style={styles.buttonStyles}
      />
      <BpkButton
        large
        type={type}
        title="Icon only"
        icon={<ArrowImage large type={type} />}
        iconOnly
        onPress={action(`${type} icon only button clicked`)}
        style={styles.buttonStyles}
      />
    </View>
  </View>
);

const allButtonStories = BUTTON_TYPES.map(generateButtonStoryForType);

storiesOf('BpkButton', module)
  .add('docs:primary', () => (
    <View>
      {generateButtonStoryForType('primary')}
    </View>
  ))
  .add('docs:secondary', () => (
    <View>
      {generateButtonStoryForType('secondary')}
    </View>
  ))
  .add('docs:destructive', () => (
    <View>
      {generateButtonStoryForType('destructive')}
    </View>
  ))
  .add('docs:featured', () => (
    <View>
      {generateButtonStoryForType('featured')}
    </View>
  ))
  .add('docs:withTheme', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <View>
        <StoryHeading>Primary</StoryHeading>
        {generateButtonStoryForType('primary')}
        <StoryHeading>Secondary</StoryHeading>
        {generateButtonStoryForType('secondary')}
      </View>
    </BpkThemeProvider>
  ))
  .add('All Button Types', () => (
    <ScrollView>
      <StoryHeading>All Types</StoryHeading>
      {allButtonStories}
    </ScrollView>
  ))
  .add('Edge Cases', () => (
    <View>
      <StoryHeading>Edge Cases</StoryHeading>

      <StorySubheading>Long button titles</StorySubheading>
      <BpkButton
        type="primary"
        title="I have a really long title"
        onPress={action('Button with long title pressed')}
        style={styles.buttonStyles}
      />
      <BpkButton
        large
        type="primary"
        title="I also have a really long title"
        onPress={action('Large button with long title pressed')}
        style={styles.buttonStyles}
      />
    </View>
  ));
