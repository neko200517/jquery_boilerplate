/**
 * ローカルストレージの管理
 */
export class _localStorage {
  static config = {
    confirmState: 'currentConfirmState',
  };
  // 初回登録状態の取得
  static getConfirmState() {
    return localStorage.getItem(this.config.confirmState);
  }
  // 初回登録状態の設定
  static setConfirmState(value) {
    localStorage.setItem(this.config.confirmState, value);
  }
  // すべての値を削除
  static removeAll() {
    localStorage.removeItem(this.config.confirmState);
  }
}
