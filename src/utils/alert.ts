import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';

export class AlertHelper {
  static dropDown: DropdownAlert | null;
  static onClose: any;
  static onTap: any;

  static setDropDown(dropDown: DropdownAlert | null) {
    this.dropDown = dropDown;
  }

  static show(type: DropdownAlertType, title: string, message: string) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static setOnTap(onTap: any) {
    this.onTap = onTap;
  }
  static setOnClose(onClose: any) {
    this.onClose = onClose;
  }

  static invokeOnClose() {
    if (typeof this.onClose === 'function') {
      this.onClose();
      this.onClose = undefined;
      this.onTap = undefined;
    }
  }

  static invokeOnTap() {
    if (typeof this.onTap === 'function') {
      this.onTap();
      this.onTap = undefined;
    }
  }
}
