import { Button } from '$components/button';
import { Text, View } from '$components/app';
import { FontAwesome } from '$components/icon';
import { PromptInput } from '$components/thread/prompt-input';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native-unistyles';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <StatusBar style="auto" />
            <View style={{ gap: 8, flex: 1, flexDirection: 'column' }}>
                <Button
                    size="icon"
                    icon={
                        <FontAwesome
                            name="arrow-up"
                            uniProps={theme => ({
                                color: theme.colors.primaryForeground,
                            })}
                        />
                    }
                />
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
            <PromptInput />
        </View>
    );
}

const styles = StyleSheet.create((_, rt) => ({
    container: {
        flex: 1,
        gap: 16,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: rt.insets.top,
    },
}));
