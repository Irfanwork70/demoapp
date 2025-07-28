import { useTheme } from "@/context/ThemeContext";
import { CustomInputProps } from "@/interfaces/customInput.interface";
import { useSharedComponentStyles } from "@/styles/sharedComponentsStyles";
import React from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput: React.FC<CustomInputProps> = ({
    variant = 'contained',
    label,
    isRequired = false,
    error,
    ...props
}) => {
    const inputBaseStyles = useSharedComponentStyles();
    const { colors } = useTheme();

    const variantStyles: any = variant === 'contained' ?
        inputBaseStyles.inputContained : variant === "outlined" ?
            inputBaseStyles.inputOutlined : inputBaseStyles.inputUnderLined;

    const errorStyles: any = error ? (variant === "contained" || variant === "outlined") ?
        inputBaseStyles.outlinedError : inputBaseStyles.underLinedError : {};

    const carrotColor = error ? colors.alert : colors.tint;

    return (
        <View>
            {
                (label || isRequired) && (
                    <View style={inputBaseStyles.inputTop}>
                        {label && (<Text style={inputBaseStyles.inputLabel}>{label}</Text>)}
                        {isRequired && (<Text style={inputBaseStyles.isRequired}>*</Text>)}
                    </View>
                )
            }
            <TextInput
                style={[inputBaseStyles.baseInput, variantStyles, errorStyles]}
                placeholderTextColor={colors.placeholderText}
                selectionColor={carrotColor}
                {...props}
            />
            {
                error && (
                    <>
                        <Text style={inputBaseStyles.inputError}>{error}</Text>
                    </>
                )
            }
        </View>
    );
};

export default CustomInput;
