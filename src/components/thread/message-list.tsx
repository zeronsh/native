import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useMessageIds } from '$thread/context';
import { Message } from '$components/thread/message';

export function MessageList() {
    const messageIds = useMessageIds();

    const renderItem = ({ item, index }: ListRenderItemInfo<string>) => {
        const hasNextMessage = messageIds[index + 1] !== undefined;
        const hasPreviousMessage = messageIds[index - 1] !== undefined;

        return (
            <View style={styles.messageStyle}>
                <Message
                    id={item}
                    hasNextMessage={hasNextMessage}
                    hasPreviousMessage={hasPreviousMessage}
                />
            </View>
        );
    };

    return (
        <View style={styles.list}>
            <FlashList
                data={messageIds}
                renderItem={renderItem}
                keyExtractor={item => item}
                scrollEventThrottle={16}
                maintainVisibleContentPosition={{
                    autoscrollToBottomThreshold: 0.1,
                    startRenderingFromBottom: true,
                }}
                estimatedItemSize={10000}
            />
        </View>
    );
}

const styles = StyleSheet.create((theme, rt) => ({
    list: {
        width: '100%',
        flex: 1,
    },
    messageStyle: {
        width: '100%',
        maxWidth: theme.widths.md,
        marginHorizontal: 'auto',
        paddingHorizontal: theme.utils.spacing(4),
    },
}));
