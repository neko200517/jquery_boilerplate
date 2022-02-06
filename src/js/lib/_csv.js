// import { Encoding } from 'encoding-japanese';
const DEBUG = false;

export default class CSV {
  constructor(data, keys = false) {
    this.ARRAY = Symbol('ARRAY');
    this.OBJECT = Symbol('OBJECT');

    this.data = data;

    if (CSV.isArray(data)) {
      if (0 == data.length) {
        this.dataType = this.ARRAY;
      } else if (CSV.isObject(data[0])) {
        this.dataType = this.OBJECT;
      } else if (CSV.isArray(data[0])) {
        this.dataType = this.ARRAY;
      } else {
        throw Error('Error: 未対応のデータ型です');
      }
    } else {
      throw Error('Error: 未対応のデータ型です');
    }

    this.keys = keys;
  }

  toString() {
    if (this.dataType === this.ARRAY) {
      return this.data
        .map((record) => record.map((field) => CSV.prepare(field)).join(','))
        .join('\n');
    } else if (this.dataType === this.OBJECT) {
      const keys = this.keys || Array.from(this.extractKeys(this.data));

      const arrayData = this.data.map((record) =>
        keys.map((key) => record[key])
      );

      if (DEBUG) console.log([].concat([keys], arrayData));

      return []
        .concat([keys], arrayData)
        .map((record) => record.map((field) => CSV.prepare(field)).join(','))
        .join('\n');
    }
  }

  save(filename = 'data.csv') {
    if (!filename.match(/\.csv$/i)) {
      filename = filename + '.csv';
    }

    if (DEBUG) {
      console.info('filename:', filename);
      console.table(this.data);
    }

    const csvStr = this.toString();

    const blob = this.createUnicodeBlob(csvStr);
    const url = window.URL || window.webkitURL;
    const blobURL = url.createObjectURL(blob);

    let a = document.createElement('a');
    a.download = decodeURI(filename);
    a.href = blobURL;
    a.type = 'text/csv';

    a.click();
  }

  // CSVをShiftJisで生成
  createSjisBlob(csvStr) {
    const detected = Encoding.detect(csvStr);
    const unicodeList = [];
    for (let i = 0; i < csvStr.length; i++) {
      unicodeList.push(csvStr.charCodeAt(i));
    }

    // 変換処理の実施
    const shiftJisCodeList = Encoding.convert(unicodeList, {
      to: 'SJIS',
      from: detected,
    });
    const uInt8List = new Uint8Array(shiftJisCodeList);

    // csv書き込みの実装
    return new Blob([uInt8List], { type: 'text/csv' });
  }

  // CSVをUnicodeで生成
  createUnicodeBlob(csvStr) {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    return new Blob([bom, csvStr], { type: 'text/csv' });
  }

  extractKeys(data) {
    return new Set(
      [].concat(...this.data.map((record) => Object.keys(record)))
    );
  }

  static prepare(field) {
    return '"' + ('' + field).replace(/"/g, '""') + '"';
  }

  static isObject(obj) {
    return '[object Object]' === Object.prototype.toString.call(obj);
  }

  static isArray(obj) {
    return '[object Array]' === Object.prototype.toString.call(obj);
  }
}
