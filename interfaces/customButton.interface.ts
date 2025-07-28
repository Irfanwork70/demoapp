import { ButtonProps } from "react-native";

export type CustomButtonVariant = 'contained' | 'outlined' | 'disabled';

export interface CustomButtonProps extends ButtonProps {
    variant?: CustomButtonVariant,
    title: string,
    loading?: boolean,
    styles?: any,
    children?: React.ReactNode,
    textColor?: string
}