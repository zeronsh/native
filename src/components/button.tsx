import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

type ButtonProps = {
    title?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & TouchableOpacityProps &
    UnistylesVariants<typeof styles>;

export const Button = forwardRef<View, ButtonProps>(
    ({ title, leftIcon, rightIcon, variant, size, ...touchableProps }, ref) => {
        styles.useVariants({ variant, size });
        return (
            <TouchableOpacity
                ref={ref}
                {...touchableProps}
                style={[styles.button, touchableProps.style]}
                accessibilityRole="button"
            >
                {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
                {title && <Text style={styles.text}>{title}</Text>}
                {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
            </TouchableOpacity>
        );
    }
);

Button.displayName = 'Button';

const styles = StyleSheet.create(theme => ({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.utils.radius(1.5),
        backgroundColor: theme.colors.primary,
        height: 36,
        paddingHorizontal: theme.utils.spacing(4),
        paddingVertical: theme.utils.spacing(2),
        gap: theme.utils.spacing(3),
        borderWidth: 0,
        borderColor: 'transparent',
        variants: {
            variant: {
                default: {
                    backgroundColor: theme.colors.primary,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                },
                destructive: {
                    backgroundColor: theme.colors.destructive,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                },
                outline: {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                },
                secondary: {
                    backgroundColor: theme.colors.secondary,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                },
                ghost: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                link: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingHorizontal: 0,
                    height: 'auto',
                },
            },
            size: {
                default: {
                    height: 36,
                    paddingHorizontal: theme.utils.spacing(4),
                    paddingVertical: theme.utils.spacing(2),
                },
                sm: {
                    height: 32,
                    borderRadius: theme.utils.radius(1.5),
                    gap: theme.utils.spacing(1.5),
                    paddingHorizontal: theme.utils.spacing(3),
                },
                lg: {
                    height: 40,
                    borderRadius: theme.utils.radius(1.5),
                    paddingHorizontal: theme.utils.spacing(6),
                },
                icon: {
                    width: 36,
                    height: 36,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                },
            },
        },
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: theme.colors.primaryForeground,
        variants: {
            variant: {
                default: {
                    color: theme.colors.primaryForeground,
                },
                destructive: {
                    color: theme.colors.destructiveForeground,
                },
                outline: {
                    color: theme.colors.foreground,
                },
                secondary: {
                    color: theme.colors.secondaryForeground,
                },
                ghost: {
                    color: theme.colors.foreground,
                },
                link: {
                    color: theme.colors.primary,
                    textDecorationLine: 'underline',
                },
            },
            size: {
                default: {
                    fontSize: 14,
                },
                sm: {
                    fontSize: 14,
                },
                lg: {
                    fontSize: 14,
                },
                icon: {
                    fontSize: 14,
                },
            },
        },
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
