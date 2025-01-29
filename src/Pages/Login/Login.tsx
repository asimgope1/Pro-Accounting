import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { storeObjByKey } from '../../utils/Storage'
import { checkuserToken } from '../../redux/actions/auth'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

const Login = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buttonOpacity] = useState(new Animated.Value(0))

  useEffect(() => {
    if (email && password) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [email, password])

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
          <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.gradientHeader}
            />

            {/* Bottom Corner Polygons */}
            <View style={styles.polygonsContainer}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.polygon1}
              />
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.polygon2}
              />
            </View>

            {/* Main Content */}
            <View style={styles.formContainer}>
              <Text style={styles.headerText}>Log In</Text>

              {/* Email Label and Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Label and Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Animated Log In Button */}
              <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    const Token = 'Token'
                    console.log('Login', Token)
                    storeObjByKey('loginResponse', Token)
                    dispatch(checkuserToken())
                  }}
                >
                  <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
    backgroundColor: '#f8f9fa',

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  gradientHeader: {
    width: '100%',
    height: '30%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygonsContainer: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    right: -50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  polygon1: {
    width: 150,
    height: 150,
    transform: [{ rotate: '45deg' }],
    borderTopRightRadius: 10,
  },
  polygon2: {
    width: 150,
    height: 150,
    transform: [{ rotate: '-45deg' }],
    borderTopLeftRadius: 10,
  },
  formContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: -100,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowColor: 'black',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default Login
