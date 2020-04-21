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

    const userInfo = await loadUserInfo(
      credentials.username,
      credentials.password,
    ).then(userInfo => {
      if (userInfo) {
        return {
          userId: userInfo.userId,
          email: userInfo.email,
          codes: userInfo.codes,
        };
      } else {
        return null;
      }
    });
    console.log(userInfo);
    const optionalConfigObject = {
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      //passcodeFallback: true,
    };
    console.log('77 ', credentials);

    if (!idShowed) {
      TouchID.authenticate(
        'to demo this react-native component',
        optionalConfigObject,
      )
        .then(success => {
          setEmail(credentials.username);
          setPassword(credentials.password);
          checkUserCred(credentials.username, credentials.password);
          //navigation.navigate('Games', {userInfo});
        })
        .catch(error => {
          console.log(error);
        });

      setIdShowed(true);
    }
  }

  async function loadUserInfo(loginEmail = email, loginPass = password) {
    const lowerEmail = loginEmail.toLowerCase();
    console.log('lowerEmail',lowerEmail);
    console.log('loginPass', loginPass); //nic

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
          console.log('User account created & signed in!');
          createNewUser();
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

  async function successLogin() {
    await loadUserInfo()
      .then(userInfo => {
        console.log(userInfo);
        navigation.navigate('Games', {userInfo});
      })
      .catch(console.log);
  }

  async function setUserCredentials(userEmail, userPass = password) {
    console.log('setting creditials ' + userEmail + ' ' + userPass);
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
