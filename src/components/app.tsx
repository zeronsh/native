import {
    Text as RNText,
    TextProps,
    TextInput as RNTextInput,
    View as RNView,
    ViewProps,
} from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { LoaderKitView } from 'react-native-loader-kit';

export const View = ({ style, ...props }: ViewProps) => {
    return <RNView {...props} style={[styles.view, style]} />;
};

export const Text = ({ style, ...props }: TextProps) => {
    return <RNText {...props} style={[styles.text, style]} />;
};

export const TextInput = withUnistyles(RNTextInput);

export const Loader = withUnistyles(LoaderKitView);

const styles = StyleSheet.create(theme => ({
    view: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        color: theme.colors.foreground,
        fontSize: theme.typography.size(1),
        fontFamily: theme.typography.fontFamily,
    },
}));
