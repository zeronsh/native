import { Text, View } from '$components/app';
import { Button } from '$components/button';
import { FontAwesome, ModelIcon } from '$components/icon';
import { BottomSheet } from '$components/bottom-sheet';
import { StyleSheet } from 'react-native-unistyles';
import { ScrollView } from 'react-native';
import { useSettings } from '$hooks/use-settings';
import { useModels } from '$hooks/use-models';
import { useDatabase } from '$zero/context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

export function ModelSwitcher() {
    const settings = useSettings();
    const models = useModels();
    const db = useDatabase();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    return (
        <BottomSheet
            ref={bottomSheetRef}
            TriggerComponent={props => (
                <Button
                    {...props}
                    variant="secondary"
                    style={styles.button}
                    children={
                        <View style={styles.modelTitle}>
                            <ModelIcon
                                name={settings?.model?.icon}
                                // @ts-expect-error
                                uniProps={theme => ({
                                    color: theme.colors.foreground,
                                    size: theme.typography.size(1),
                                })}
                            />
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{ flexShrink: 1 }}>
                                {settings?.model?.name}
                            </Text>
                            <View style={{ flex: 1 }} />
                            <FontAwesome
                                name="angle-down"
                                // @ts-expect-error
                                uniProps={theme => ({
                                    color: theme.colors.foreground,
                                    size: theme.typography.size(0.75),
                                })}
                            />
                        </View>
                    }
                />
            )}
        >
            <ScrollView
                style={styles.modelListContainer}
                contentContainerStyle={styles.modelList}
                showsVerticalScrollIndicator={true}
            >
                {models.map(model => (
                    <Button
                        key={model.id}
                        variant={model.id === settings?.model?.id ? 'secondary' : 'ghost'}
                        style={styles.modelItem}
                        onPress={() => {
                            if (settings) {
                                db.mutate.setting.update({
                                    id: settings.id,
                                    modelId: model.id,
                                });
                            }
                            bottomSheetRef.current?.dismiss();
                        }}
                        children={
                            <View style={styles.modelItemContent}>
                                <View style={styles.modelTitle}>
                                    <ModelIcon
                                        name={model.icon}
                                        // @ts-expect-error
                                        uniProps={theme => ({
                                            color: theme.colors.foreground,
                                            size: theme.typography.size(1),
                                        })}
                                    />
                                    <Text>{model.name}</Text>
                                    <View style={{ flex: 1 }} />
                                    {[...(model?.capabilities || [])]
                                        .sort((a, b) => a.localeCompare(b))
                                        .map(capability => {
                                            switch (capability) {
                                                case 'vision':
                                                    return (
                                                        <View
                                                            key={capability}
                                                            style={[
                                                                styles.capability,
                                                                styles.capabilityVision,
                                                            ]}
                                                        >
                                                            <FontAwesome
                                                                key={capability}
                                                                name="image"
                                                                // @ts-expect-error
                                                                uniProps={theme => ({
                                                                    color: theme.colors.blue[300],
                                                                    size: theme.typography.size(1),
                                                                })}
                                                            />
                                                        </View>
                                                    );
                                                case 'tools':
                                                    return (
                                                        <View
                                                            key={capability}
                                                            style={[
                                                                styles.capability,
                                                                styles.capabilityTools,
                                                            ]}
                                                        >
                                                            <FontAwesome
                                                                key={capability}
                                                                name="wrench"
                                                                // @ts-expect-error
                                                                uniProps={theme => ({
                                                                    color: theme.colors.pink[300],
                                                                    size: theme.typography.size(1),
                                                                })}
                                                            />
                                                        </View>
                                                    );
                                                case 'reasoning':
                                                    return (
                                                        <View
                                                            key={capability}
                                                            style={[
                                                                styles.capability,
                                                                styles.capabilityReasoning,
                                                            ]}
                                                        >
                                                            <FontAwesome
                                                                key={capability}
                                                                name="lightbulb"
                                                                // @ts-expect-error
                                                                uniProps={theme => ({
                                                                    color: theme.colors.purple[300],
                                                                    size: theme.typography.size(1),
                                                                })}
                                                            />
                                                        </View>
                                                    );
                                            }
                                        })}
                                </View>
                                <Text
                                    style={styles.modelDescription}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {model.description}
                                </Text>
                            </View>
                        }
                    />
                ))}
            </ScrollView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create((theme, rt) => ({
    button: {
        flex: 1,
        minWidth: 180,
        maxWidth: 180,
        justifyContent: 'space-between',
        borderRadius: theme.utils.radius(3),
    },
    modelItem: {
        justifyContent: 'flex-start',
        height: 'auto',
        paddingHorizontal: theme.utils.spacing(2),
    },
    modelItemContent: {
        flexDirection: 'column',
        gap: theme.utils.spacing(2),
    },
    modelDescription: {
        fontSize: theme.typography.size(0.8),
        color: theme.colors.foreground,
        opacity: 0.75,
    },
    modelTitle: {
        alignItems: 'center',
        gap: theme.utils.spacing(2),
    },
    modelListContainer: {
        maxHeight: 400,
    },
    modelList: {
        flexDirection: 'column',
        gap: theme.utils.spacing(2),
        paddingHorizontal: theme.utils.spacing(2),
        paddingBottom: rt.insets.bottom,
    },
    capability: {
        padding: theme.utils.spacing(1),
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.utils.radius(2),
    },
    capabilityVision: {
        backgroundColor: theme.colors.blue[700],
    },
    capabilityTools: {
        backgroundColor: theme.colors.pink[700],
    },
    capabilityReasoning: {
        backgroundColor: theme.colors.purple[700],
    },
}));
