import React, { FC, Fragment } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';

export interface ISidebarMenuItemProps {
  onPress?: (event: GestureResponderEvent) => void;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  title: string;
  viewStyles?: ViewStyle;
  icon?: Function;
  badge?: boolean;
  isLoading?: boolean;
}
const SidebarMenuItem: FC<ISidebarMenuItemProps> = ({
  onPress,
  iconName,
  iconColor,
  iconSize,
  title,
  viewStyles,
  icon,
  badge,
  isLoading,
}) => {
  return (
    <View style={[viewStyles]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 24 }}>
          {icon ? (
            isLoading ? (
              <ActivityIndicator animating={true} color={theme.dark.hex} />
            ) : (
              icon()
            )
          ) : isLoading ? (
            <ActivityIndicator animating={true} color={theme.dark.hex} />
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5
                name={iconName || 'cog'}
                color={iconColor}
                size={iconSize}
              />
              {badge && (
                <Badge
                  badgeStyle={{ position: 'absolute', top: -4, right: -4 }}
                  status="error"
                ></Badge>
              )}
            </View>
          )}
        </View>

        <Text
          style={{
            fontSize: 16,
            marginLeft: 5,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SidebarMenuItem;
