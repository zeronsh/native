import { View, TextInput } from '$components/app';
import { Button } from '$components/button';
import { FontAwesome } from '$components/icon';
import { StyleSheet } from 'react-native-unistyles';
import { useState } from 'react';

export function PromptInput() {
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message..."
                multiline
                returnKeyType="send"
                uniProps={theme => ({
                    placeholderTextColor: theme.colors.mutedForeground,
                })}
            />
            <View style={styles.footer}>
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme, rt) => ({
    container: {
        flexDirection: 'column',
        width: '100%',
        maxWidth: theme.widths.md,
        backgroundColor: theme.colors.secondary,
        borderTopLeftRadius: theme.utils.radius(6),
        borderTopRightRadius: theme.utils.radius(6),
        paddingHorizontal: theme.utils.spacing(4),
        paddingTop: theme.utils.spacing(4),
        paddingBottom: {
            xs: theme.utils.spacing(10),
            md: theme.utils.spacing(4),
        },
        gap: theme.utils.spacing(4),
    },
    textInput: {
        flex: 1,
        borderRadius: 20,
        maxHeight: 120,
        minHeight: 40,
        fontSize: theme.typography.size(1),
        color: theme.colors.foreground,
        width: '100%',
        paddingHorizontal: theme.utils.spacing(2),
        paddingTop: theme.utils.spacing(2),
        _web: {
            outline: 'none',
        },
    },
    footer: {
        justifyContent: 'flex-end',
        paddingBottom: rt.insets.bottom,
    },
}));
