import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/PreAuth/OnboardingScreen";
import LoginScreen from "../screens/PreAuth/LoginScreen";
import RegistrationScreen from "../screens/PreAuth/RegistrationScreen";
import ForgotPasswordScreen from "../screens/PreAuth/ForgotPassword";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Onbaording"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Registration"
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
