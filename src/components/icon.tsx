import { withUnistyles } from 'react-native-unistyles';
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome6';
import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';
import modelIconConfig from './icon-config.json';

export const AntDesign = withUnistyles(AntDesignIcon);
export const FontAwesome = withUnistyles(FontAwesomeIcon);

export const ModelIcon = withUnistyles(
    createIconSetFromFontello(modelIconConfig, 'model-icons', 'model-icons.ttf')
);
