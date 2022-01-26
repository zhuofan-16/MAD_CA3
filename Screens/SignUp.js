/* eslint-disable react-native/no-inline-styles  */

import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';

import * as Animatable from 'react-native-animatable';

// Custom buttons and Text Inputs
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';

import CheckBox from '@react-native-community/checkbox';

// import firebase
import {auth} from '../firebase';

export default function SignUp({navigation}) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [passwordRepeat, setPasswordRepeat] = useState('');

  // const initialValues = {
  //   username,
  //   email,
  //   password,
  //   passwordRepeat,
  // };

  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidRepeatpassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        isValidUser: false,
      });
    }
  };

  const handleEmailChange = val => {
    if (val.trim().length >= 12) {
      setData({
        ...data,
        email: val,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleRepeatPasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        passwordRepeat: val,
        isValidRepeatpassword: true,
      });
    } else {
      setData({
        ...data,
        passwordRepeat: val,
        isValidRepeatpassword: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleSubmit = e => {
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  // };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors, formValues, isSubmit]);

  // const validate = values => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\@]{2,}$/i;
  //   if (!values.username) {
  //     errors.username = 'Username is required!';
  //   }
  //   if (!values.email) {
  //     errors.email = 'Email is required!';
  //   }
  //   if (!values.password) {
  //     errors.password = 'Password is required!';
  //   }
  //   return errors;
  // };

  const [isSelected, setSelection] = useState(false);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with: ', user.email);
      })
      .catch(error => Alert.alert(error.message));
  };

  const onSigninPressed = () => {
    console.warn('onSignUpPressed');
    navigation.navigate('LoginScreen');
  };

  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Text>Sign up</Text>
    //   <Button
    //     title="Login after Sign Up"
    //     onPress={() => navigation.navigate('LoginScreen')}>
    //     Login after Sign Up
    //   </Button>
    // </View>
    <ScrollView>
      <ImageBackground
        source={require('../image/background.png')}
        imageStyle={{
          opacity: 0.2,
          resizeMode: 'cover',
        }}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={{...styles.textInputName, marginTop: 20}}>Username</Text>
          <CustomInput
            placeholder="(e.g) Abby "
            setValue={val => textInputChange(val)}
            onEndEditing={e => {
              handleValidUser(e.nativeEvent.text);
            }}
          />
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text style={{...styles.textInputName, marginTop: 20}}>Email</Text>
          <CustomInput
            placeholder="example@email.com"
            setValue={val => handleEmailChange(val)}
          />
          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Email format.</Text>
            </Animatable.View>
          )}

          <Text style={{...styles.textInputName, marginTop: 20}}>Password</Text>
          <CustomInput
            placeholder="Consists of Uppercase and Lowercase"
            secureTextEntry={true}
            setValue={val => handlePasswordChange(val)}
          />
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text style={{...styles.textInputName, marginTop: 20}}>
            Repeat Password
          </Text>
          <CustomInput
            placeholder="Repeat Password"
            secureTextEntry={true}
            setValue={val => handleRepeatPasswordChange(val)}
          />
          {data.isValidRepeatpassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Password does not match.</Text>
            </Animatable.View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              marginHorizontal: 30,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              require="required"
              style={{marginRight: 10}}
            />
            <Text style={styles.text}>
              By registering, you confirm that you accept to our
              <Text style={styles.link}> Terms of Use</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>

          <View style={{marginTop: 30, marginBottom: 30}}>
            <CustomButton
              text="Register"
              onPress={handleSignUp}
              type="PRIMARY"
            />
          </View>

          <TouchableOpacity
            style={{marginLeft: 80, marginBottom: 100, alignContent: 'center'}}
            onPress={onSigninPressed}>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                color: 'grey',
                fontSize: 17,
              }}>
              Have an account? <Text style={{color: 'red'}}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  textInputName: {
    color: '#f76d76',
    fontFamily: 'Quicksand-Bold',
    marginLeft: 23,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    margin: 10,
    color: 'black',
  },
  text: {
    color: 'grey',
    marginVertical: 10,
    fontFamily: 'Quicksand-SemiBold',
  },
  link: {
    color: 'red',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginLeft: 21,
  },
});
