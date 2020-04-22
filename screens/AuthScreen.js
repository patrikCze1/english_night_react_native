import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TouchID from 'react-native-touch-id';
import firestore from '@react-native-firebase/firestore';
import * as Keychain from 'react-native-keychain';
import auth from '@react-native-firebase/auth';

export default function AuthScreen() {
  const [bioType, setBioType] = useState(null);
  const [creditialsLoaded, setCreditialsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idShowed, setIdShowed] = useState(false);

  const navigation = useNavigation();
  const iconPath = require('../static/images/icon.png');

  useEffect(() => {
    loadCredentials();

    if (creditialsLoaded) {
      authWithTouchId();
    }

    TouchID.isSupported()
      .then(bioType => {
        if (bioType === 'FaceID') {
          setBioType('FaceID');
        } else {
          setBioType('TouchID');
        }
      })
      .catch(error => {
        setBioType(null);
      });
  });

  async function loadCredentials() {
    // check if user was loged here
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      setCreditialsLoaded(true);
    } else {
      await Keychain.resetGenericPassword();
      console.log('No credentials stored');
    }
  }

  async function authWithTouchId() {
    const credentials = await Keychain.getGenericPassword();

    const optionalConfigObject = {};

    if (!idShowed) {
      TouchID.authenticate(
        'to demo this react-native component',
        optionalConfigObject,
      )
        .then(success => {
          setEmail(credentials.username);
          setPassword(credentials.password);
          checkUserCred(credentials.username, credentials.password);
        })
        .catch(error => {
          console.log(error);
        });

      setIdShowed(true);
    }
  }

  async function loadUserInfo(loginEmail = email, loginPass = password) {
    const lowerEmail = loginEmail.toLowerCase();

    const res = await firestore()
      .collection('Users')
      .where('email', '==', lowerEmail)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs[0]) {
          return {
            userId: querySnapshot.docs[0].id,
            email: querySnapshot.docs[0]._data.email,
            codes: querySnapshot.docs[0]._data.codes,
          };
        }
      })
      .catch(function(error) {
        console.log('login error', error);
      });

    return res;
  }

  async function checkUserCred(regEmail = email, regPassword = password) {
    const lowerEmail = regEmail.toLowerCase();

    auth()
      .signInWithEmailAndPassword(lowerEmail, regPassword)
      .then(() => {
        console.log('login...');
        setUserCredentials(lowerEmail, regPassword);
        login(lowerEmail, regPassword);
      })
      .catch(error => console.log(error));
  }

  async function login(email, password) {
    const userInfo = await loadUserInfo(email, password)
      .then(userInfo => {
        return userInfo;
      })
      .catch(console.log);

    navigation.navigate('Games', {userInfo});
  }

  function register() {
    const loginEmail = email.toLowerCase();

    if (loginEmail && password) {
      auth()
        .createUserWithEmailAndPassword(loginEmail, password)
        .then(() => {
          createNewUser(); //in firestore
          setUserCredentials(loginEmail);
          login();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Warning', 'That email address is already in use!', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Warning', 'That email address is invalid!', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          } else {
            console.error(error);
            Alert.alert('Error', error, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        });
    } else {
      Alert.alert('Error', 'Please fill all fields', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  async function createNewUser() {
    await firestore()
      .collection('Users')
      .add({
        email: email,
        codes: [],
      });
  }
  //save in kaychain
  async function setUserCredentials(userEmail, userPass = password) {
    await Keychain.setGenericPassword(userEmail, userPass);
  }

  function showTouchId() {
    setIdShowed(false);
    loadCredentials();
  }

  const loginText = 'Login with ' + bioType;

  return (
    <View>
      <View style={styles.imageCenter}>
        <Image source={iconPath} style={styles.image} />
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          name="email"
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          name="password"
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
        />

        <Button title="Login" onPress={() => checkUserCred()} />
        <Text style={{textAlign: 'center'}}>or</Text>
        <Button title="Register" onPress={() => register()} />
      </View>

      {bioType != null ? (
        creditialsLoaded ? (
          <Button title={loginText} onPress={showTouchId} />
        ) : (
          <Button title={loginText} disabled />
        )
      ) : (
        <Text />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 400 / 2,
  },
  imageCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  container: {
    margin: 20,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
  },
});
