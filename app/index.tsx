import AuthHeader from "@/components/shared/AuthHeader";
import CustomButton from "@/components/shared/CustomButton";
import GradientButton from "@/components/shared/GradientButton";
import GradientText from "@/components/shared/GradientText";
import { Screen } from "@/components/shared/Screen";
import { useTheme } from "@/context/ThemeContext";
import { useTextListOnFocus } from "@/hooks/useTextListOnFocus";
import { useGetStartedScreenStyles } from "@/styles/getStartedScreenStyles";
import { useGlobalStyles } from "@/styles/globalStyles";
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { Text, View } from "react-native";


export default function MainScreen() {
    const { colors, toggleTheme } = useTheme();
    const router = useRouter();
    const TextList = useTextListOnFocus();
    const globalStyles = useGlobalStyles();
    const getStartedStyles = useGetStartedScreenStyles();

    return (
        <Screen withSafeArea={false} withScrollView={false}>
            <LinearGradient
                colors={colors.backgroundGradientColors as [string, string, ...string[]]}
                style={[globalStyles.flex1, globalStyles.justifyBetween]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <AuthHeader/>
                <View style={getStartedStyles.cardContainer}>
                    <View>
                        <Text style={getStartedStyles.title}>Welcome !</Text>
                        <Text style={[getStartedStyles.title, getStartedStyles.subTitle]}>Login To Get Started</Text>
                    </View>
                    <View style={getStartedStyles.cardBottom}>
                        <GradientButton
                            title="Create Account"
                            gradientColors={colors.buttonGradientColors as [string, string, ...string[]]}
                            textColor={colors.text}
                            onPress={() => router.navigate('/(auth-screens)/signup')}
                        />
                        <CustomButton
                            title="Login"
                            variant="outlined"
                            textColor={colors.primary}
                            onPress={() =>router.navigate('/(auth-screens)/login')}
                        />
                        <View style={getStartedStyles.socialContainer}>
                            {/* Placeholder icons */}
                            <Entypo name="facebook-with-circle" style={getStartedStyles.socialIcon} />
                            <Entypo name="linkedin-with-circle" style={getStartedStyles.socialIcon} />
                            <Entypo name="google--with-circle" style={getStartedStyles.socialIcon} />
                            <Entypo name="twitter-with-circle" style={getStartedStyles.socialIcon} />
                        </View>
                        <GradientText showTextGradient={true} style={{ textAlign: "center" }}>Sign in with another account</GradientText>
                    </View>
                </View>
            </LinearGradient>
        </Screen>
    );
};