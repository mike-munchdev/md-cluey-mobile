import React, { Fragment, FC, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../constants/theme';
import { Badge } from 'react-native-elements';
import { AppContext } from '../../config/context';

export interface INotificationsIconProps {
  onPress: () => void;
}
const NotificationsIcon: FC<INotificationsIconProps> = ({ onPress }) => {
  const { state } = useContext(AppContext);
  return (
    <Fragment>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
        <FontAwesome5 name="bell" size={28} color={theme.dark.hex} />
        {state.notifications?.length > 0 ? (
          <Badge
            badgeStyle={{ position: 'absolute', top: -4, right: -4 }}
            status="error"
            value={state.notifications.length}
          ></Badge>
        ) : null}
      </TouchableOpacity>
    </Fragment>
  );
};
export default NotificationsIcon;
