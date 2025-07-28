import { useGlobalStyles } from "@/styles/globalStyles";
import { useSharedComponentStyles } from "@/styles/sharedComponentsStyles";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import Logo from '../../assets/images/yellow_car.png';
import WaveAnimation from '../../assets/lottie/Wave Animation.json';

interface AuthHeaderProps {
    showAnimation?: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
    showAnimation = true
}) => {
    const sharedStyles = useSharedComponentStyles();
    const globalStyles = useGlobalStyles();
    return (
        <View style={sharedStyles.logoContainer}>
            {/* Placeholder for logo */}
            <Image source={Logo} style={sharedStyles.logoImage} />
            <View>
                <Text style={sharedStyles.logoText}>CARS</Text>
                <Text style={sharedStyles.logoText}>Where ideas meet reality!</Text>
                {
                    showAnimation && (
                        <View style={globalStyles.verticalAlignment}>
                            <LottieView
                                source={WaveAnimation}
                                autoPlay
                                loop
                                style={sharedStyles.lottieAnimationStyle}
                            />
                        </View>
                    )
                }

            </View>
        </View>
    )
}

export default AuthHeader