import { TextInputProps } from "react-native";

export type CustomInputVariant = 'contained' | 'outlined' | 'underlined'

export interface CustomInputProps extends TextInputProps {
 variant: CustomInputVariant,
 label: string,
 isRequired?: Boolean,
 error? : string
}