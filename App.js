import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Flex, Spacer } from "native-base";
import Home from './src/components/Home';
import { Provider } from 'react-redux';
import store from './src/store/store';

function App() {
  return (
    <Provider store={store}>
        <Home />
    </Provider>
  );
}
export default App