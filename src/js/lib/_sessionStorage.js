/**
 * セッションストレージの管理
 */
export default class AppSessionStorage {
  static config = {
    user: 'currentUser',
    formatDate: 'currentFormatDate',
    keyword: 'currentKeyword',
  };
  // ユーザ名の取得
  static getUser() {
    return sessionStorage.getItem(this.config.user);
  }
  // ユーザ名の設定
  static setUser(value) {
    sessionStorage.setItem(this.config.user, value);
  }
  // 日付の取得
  static getFormatDate() {
    return sessionStorage.getItem(this.config.formatDate);
  }
  // 日付の設定
  static setFormatDate(value) {
    sessionStorage.setItem(this.config.formatDate, value);
  }
  // 検索キーワードの取得
  static getKeyword() {
    return sessionStorage.getItem(this.config.keyword);
  }
  // 検索キーワードの設定
  static setKeyword(value) {
    sessionStorage.setItem(this.config.keyword, value);
  }
  // 検索キーワードの削除
  static removeKeyword() {
    sessionStorage.removeItem(this.config.keyword);
  }
  // すべての値を削除
  static removeAll() {
    sessionStorage.removeItem(this.config.user);
    sessionStorage.removeItem(this.config.formatDate);
    sessionStorage.removeItem(this.config.keyword);
  }
}
