import i18n from "@/languages/i18n";
import { Button, View } from "react-native";

const LanguageModal = () => {
    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
    }
    return (
        <View>
            <Button title="English" onPress={() => handleLanguageChange("en")} />
            <Button title="Arabic" onPress={() => handleLanguageChange("ar")} />
            <Button title="Urdu" onPress={() => handleLanguageChange("ur")} />
        </View>
    )
}

export default LanguageModal