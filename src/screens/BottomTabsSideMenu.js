import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up

  }

  onNavigatorEvent(event) {
    console.log('SideMenu', 'Unhandled event ' + event.id);
  }

  render() {
    return (
      <View style={styles.sideMenu}>
        <Text style={styles.title}>Side Menu</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
    width: 260,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
  },
});

export default connect()(SideMenu);
