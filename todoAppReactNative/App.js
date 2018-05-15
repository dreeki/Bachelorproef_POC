import React from 'react';
import Main from './app/Index';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default class App extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <Main />
      </ActionSheetProvider>
    );
  }
}
