/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import type {PlatformTestComponentBaseProps} from './RNTesterPlatformTestTypes';

import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import RNTesterPlatformTestInstructions from './RNTesterPlatformTestInstructions';
import usePlatformTestHarness from './usePlatformTestHarness';
import RNTesterPlatformTestResultView from './RNTesterPlatformTestResultView';

type Props = $ReadOnly<{|
  title: string,
  description: string,
  instructions?: $ReadOnlyArray<string>,
  component: React.ComponentType<PlatformTestComponentBaseProps>,
|}>;

export default function RNTesterPlatformTest(props: Props): React.MixedElement {
  const {
    title,
    description,
    instructions,
    component: UnderTestComponent,
  } = props;

  const {harness, numPending, reset, results, testKey} =
    usePlatformTestHarness();

  return (
    <View style={styles.root}>
      <Text style={[styles.textBlock, styles.title]}>{title}</Text>
      <Text style={[styles.textBlock, styles.description]}>{description}</Text>
      <RNTesterPlatformTestInstructions
        instructions={instructions}
        style={[styles.instructions, styles.block]}
      />
      <View style={[styles.testContainer, styles.block]}>
        <UnderTestComponent key={testKey} harness={harness} />
      </View>
      <RNTesterPlatformTestResultView
        numPending={numPending}
        reset={reset}
        results={results}
        style={styles.results}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  instructions: {
    flexGrow: 0,
    flexShrink: 0,
  },
  textBlock: {
    marginBottom: 8,
    flexGrow: 0,
    flexShrink: 0,
  },
  results: {
    flex: 1,
  },
  root: {
    padding: 8,
    paddingBottom: 0,
    flex: 1,
  },
  testContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
});
