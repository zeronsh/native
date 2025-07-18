import { View } from '$components/app';
import { Button } from '$components/button';
import { FontAwesome } from '$components/icon';
import { SpinningLoader } from '$components/loaders/spinning-loader';
import { useThreads } from '$hooks/use-threads';
import { Thread } from '$zero/types';
import { Link } from 'expo-router';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function SidebarContent() {
    const threads = useThreads();
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={SidebarHeader}
                contentContainerStyle={styles.content}
                data={threads}
                renderItem={SidebarItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

function SidebarItem({ item }: { item: Thread }) {
    return (
        <Link href={`/${item.id}`} asChild>
            <Button
                size="xl"
                variant="ghost"
                style={styles.threadItem}
                title={item.title ?? ''}
                rightIcon={
                    item.status === 'streaming' || item.status === 'submitted' ? (
                        <SpinningLoader size={16} />
                    ) : null
                }
            />
        </Link>
    );
}

function SidebarHeader() {
    return (
        <View>
            <Link href="/" asChild>
                <Button
                    size="xl"
                    variant="ghost"
                    style={styles.menuItem}
                    title="New Thread"
                    leftIcon={
                        <FontAwesome
                            name="pen-to-square"
                            // @ts-expect-error
                            uniProps={theme => ({
                                color: theme.colors.foreground,
                                size: theme.typography.size(1),
                            })}
                        />
                    }
                />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create((theme, rt) => ({
    container: {
        flex: 1,
        padding: theme.utils.spacing(2),
        backgroundColor: theme.colors.background,
    },
    content: {
        paddingTop: rt.insets.top,
        paddingBottom: rt.insets.bottom,
    },
    menuItem: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    threadItem: {
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));
