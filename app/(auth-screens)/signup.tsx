import AuthHeader from "@/components/shared/AuthHeader";
import CustomButton from "@/components/shared/CustomButton";
import CustomInput from "@/components/shared/CustomInput";
import { Screen } from "@/components/shared/Screen";
import { useTheme } from "@/context/ThemeContext";
import { getSignupSchema } from "@/schemas/authSchema";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useSignupScreenStyles } from "@/styles/signupScreenStyles";
import { devLog } from "@/utils/helper";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import { Formik, FormikHelpers } from 'formik';
import React from "react";
import { Text, View } from "react-native";

type SignupFormValues = {
    name: string,
    age: string,
    city: string,
    email: string;
    password: string;
};
const SignUp: React.FC = () => {
    const { colors } = useTheme();
    const router = useRouter();
    const signupSchema = getSignupSchema();
    const globalStyles = useGlobalStyles();
    const signupStyled = useSignupScreenStyles();

    const handleSignUp = (user: SignupFormValues): void => {
        devLog("Signed up user is :: ", user);
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
                <AuthHeader showAnimation={false} />
                <View style={signupStyled.cardContainer}>
                    <Screen withSafeArea={false} style={{flex: 1}}>
                        <Formik<SignupFormValues>
                            initialValues={{ name: '', age: '', city: '', password: '', email: '' }}
                            validationSchema={signupSchema}
                            onSubmit={(values: SignupFormValues, actions: FormikHelpers<SignupFormValues>) => {
                                setTimeout(() => {
                                    handleSignUp(values)
                                }, 1000);
                            }}
                        >
                            {props => (
                                <View style={signupStyled.cardContent}>
                                    <View style={signupStyled.cardTop}>
                                        <CustomInput
                                            variant="outlined"
                                            label="Name"
                                            isRequired={true}
                                            placeholder="enter your name"
                                            value={props.values.name}
                                            onChangeText={props.handleChange('name')}
                                            onBlur={props.handleBlur('name')}
                                            error={
                                                props.touched.name && props.errors.name ? props.errors.name : ""
                                            }
                                        />
                                        <CustomInput
                                            variant="outlined"
                                            label="Age"
                                            isRequired={true}
                                            placeholder="enter your age"
                                            value={props.values.age}
                                            onChangeText={props.handleChange('age')}
                                            onBlur={props.handleBlur('age')}
                                            error={
                                                props.touched.age && props.errors.age ? props.errors.age : ""
                                            }
                                        />
                                        <CustomInput
                                            variant="outlined"
                                            label="City"
                                            isRequired={true}
                                            placeholder="enter your city"
                                            value={props.values.city}
                                            onChangeText={props.handleChange('city')}
                                            onBlur={props.handleBlur('city')}
                                            error={
                                                props.touched.city && props.errors.city ? props.errors.city : ""
                                            }
                                        />
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
                                    <View style={signupStyled.cardBottom}>
                                        <CustomButton
                                            title="Signup"
                                            variant="contained"
                                            disabled={props.isSubmitting || props.isValidating}
                                            loading={props.isSubmitting}
                                            onPress={() => props.handleSubmit()}
                                        />
                                    </View>
                                    <Text style={signupStyled.linkText}>Already have an account <Link href='/(auth-screens)/login' style={signupStyled.link}>Login</Link></Text>
                                </View>
                            )}
                        </Formik>
                    </Screen>
                </View>
            </LinearGradient>
        </Screen>
    );
};

export default SignUp;