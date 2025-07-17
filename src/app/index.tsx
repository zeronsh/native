import { Button } from '$components/button';
import { Text, View } from '$components/app';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native-unistyles';
import { AntDesign, FontAwesome } from '$components/icon';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <StatusBar style="auto" />
            <Button
                title="Click me"
                rightIcon={
                    <FontAwesome
                        name="plus"
                        uniProps={theme => ({
                            color: theme.colors.primaryForeground,
                        })}
                    />
                }
            />
            <Button
                title="Click me"
                variant="secondary"
                rightIcon={
                    <FontAwesome
                        name="plus"
                        uniProps={theme => ({
                            color: theme.colors.secondaryForeground,
                        })}
                    />
                }
            />
            <Button
                title="Click me"
                variant="outline"
                rightIcon={
                    <FontAwesome
                        name="plus"
                        uniProps={theme => ({
                            color: theme.colors.foreground,
                        })}
                    />
                }
            />
            <Button
                title="Click me"
                variant="destructive"
                rightIcon={
                    <FontAwesome
                        name="plus"
                        uniProps={theme => ({
                            color: theme.colors.destructiveForeground,
                        })}
                    />
                }
            />
            <Button
                title="Click me"
                variant="ghost"
                rightIcon={
                    <FontAwesome
                        name="plus"
                        uniProps={theme => ({
                            color: theme.colors.foreground,
                        })}
                    />
                }
            />
            <Button
                title="Click me"
                variant="link"
                rightIcon={
                    <FontAwesome
                        name="plus"
                        uniProps={theme => ({
                            color: theme.colors.primary,
                        })}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        flex: 1,
        gap: 16,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
