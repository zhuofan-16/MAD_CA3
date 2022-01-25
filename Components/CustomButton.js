/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f76d76',
    width: '90%',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_PRIMARY: {},
  container_TERTIARY: {backgroundColor: null},
  text_TERTIARY: {
    fontSize: 15,
    color: 'grey',
  },
  container_SECONDARY: {},
  text_SECONDARY: {fontSize: 17, color: 'red'},
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 22,
    color: 'white',
    paddingBottom: 6,
  },
});

export default CustomButton;