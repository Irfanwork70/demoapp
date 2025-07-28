import AuthHeader from "@/components/shared/AuthHeader";
import CustomButton from "@/components/shared/CustomButton";
import CustomInput from "@/components/shared/CustomInput";
import { Screen } from "@/components/shared/Screen";
import { useTheme } from "@/context/ThemeContext";
import { getLoginValidationSchema } from "@/schemas/authSchema";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useLoginScreenStyles } from "@/styles/loginScreenStyles";
import { devLog } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Formik, FormikHelpers } from 'formik';
import React from "react";
import { Text, View } from "react-native";

type LoginFormValues = {
    email: string;
    password: string;
};

const LoginScreen: React.FC = () => {
    const { colors } = useTheme();
    const router = useRouter();

    const loginSchema = getLoginValidationSchema();
    const globalStyles = useGlobalStyles();
    const loginStyles = useLoginScreenStyles();

    const handleLogin = (user: LoginFormValues): void => {
        devLog("Logged in user is :: ", user);
        router.replace('/(tabs)')
    }
    return (
        <Screen withSafeArea={false} withScrollView={false}>
            <LinearGradient
                colors={colors.backgroundGradientColors as [string, string, ...string[]]}
                style={[globalStyles.flex1, globalStyles.justifyBetween]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <AuthHeader />
                <View style={loginStyles.cardContainer}>
                    <Formik<LoginFormValues>
                        initialValues={{ password: '123456', email: 'abc@gmail.com' }}
                        validationSchema={loginSchema}
                        onSubmit={(values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
                            setTimeout(() => {
                                handleLogin(values);
                            }, 1000);
                        }}
                    >
                        {props => (
                            <View style={loginStyles.cardContent}>
                                <View style={loginStyles.cardTop}>
                                    <CustomInput
                                        variant="outlined"
                                        label="Email"
                                        isRequired={true}
                                        placeholder="enter your email"
                                        value={props.values.email}
                                        onChangeText={props.handleChange('email')}
                                        onBlur={props.handleBlur('email')}
                                        error={
                                            props.touched.email && props.errors.email ? props.errors.email : ""
                                        }
                                    />
                                    <CustomInput
                                        variant="outlined"
                                        label="Password"
                                        isRequired={true}
                                        placeholder="enter your password"
                                        value={props.values.password}
                                        onChangeText={props.handleChange('password')}
                                        onBlur={props.handleBlur('password')}
                                        error={
                                            props.touched.password && props.errors.password ? props.errors.password : ""
                                        }
                                    />
                                </View>
                                <View style={loginStyles.cardBottom}>
                                    <CustomButton
                                        title="Submit"
                                        variant="contained"
                                        disabled={props.isSubmitting || props.isValidating}
                                        loading={props.isSubmitting}
                                        onPress={() => props.handleSubmit()}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                    <Text style={loginStyles.linkText}>Don't have an account <Link href='/(auth-screens)/signup' style={loginStyles.link}>Signup</Link></Text>
                </View>
            </LinearGradient>
        </Screen>
    )
}

export default LoginScreen;