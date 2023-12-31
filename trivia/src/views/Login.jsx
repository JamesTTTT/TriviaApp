import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomInput } from "../components";
// import { LoginStyles } from '../styles';
import { useAuth } from "../contexts/authProvider";
import {
  LoginStyle,
  LoginTitle,
  AuthIconContainer,
  FacebookInstagramContainer,
  googleContainer,
  TopSection,
  InnerTopSection,
  InputContainer,
  TopNav,
  ForgotPasswordStyle,
} from "../styles/Login";
import AuthIconButton from "../components/AuthIconButton";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    console.log("I happen");
    login(emailValue, passwordValue);
  };
  const Stack = createStackNavigator();

  return (
    <View style={LoginStyle}>
      <View style={TopSection}>
        <View style={TopNav}>
          <Text style={{ width: 50 }}>&#10005;</Text>
          <Text style={LoginTitle}>Log In</Text>
          <Pressable
            style={{ width: 50 }}
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            <Text style={{ textAlign: "right", color: "#7E5EFF" }}>
              Sign up
            </Text>
          </Pressable>
        </View>
        <View style={InnerTopSection}>
          <View style={InputContainer}>
            <CustomInput
              inputValue={emailValue}
              setInputValue={setEmailValue}
              type="Email"
            />
            <CustomInput
              inputValue={passwordValue}
              setInputValue={setPasswordValue}
              type="Password"
            />
          </View>
          <View style={AuthIconContainer}>
            <AuthIconButton icon="google" />
            <AuthIconButton icon="facebook" />
            <AuthIconButton icon="apple" />
          </View>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <CustomButton buttonText="Log In" press={handleLogin} />
        <Pressable>
          <Text style={ForgotPasswordStyle}>Forgot Your Password?</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
