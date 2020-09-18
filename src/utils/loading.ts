import Loading from '../components/Loading/LoadingModal';

export class LoadingHelper {
  static loading: Loading | null;
  static onClose: any;
  static message: string;
  static isVisible: boolean;

  static setLoading(loading: Loading | null) {
    this.loading = loading;
  }

  static show(message?: string) {
    if (this.loading) {
      if (message) {
        this.message = message;
      }
      this.isVisible = true;
    }
  }
  static hide() {
    if (this.loading) {
      this.message = '';
      this.isVisible = false;
    }
  }

  static toggle() {
    if (this.loading) {
      this.isVisible = !this.isVisible;
    }
  }
}
