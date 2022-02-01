import $ from './_jquery-with-plugins';
import { getApiAsync, loading } from './_utiltity';
import { _config } from './_config';
import { ChartBase } from './_graph_base';

//------------------------------------------------------------------//

// 月グラフ
export class ChartMonth extends ChartBase {
  // コンストラクタ
  constructor() {
    super();
    $('.date-wrapper').hide();
  }

  // データの用意
  async getData(username, value, tag = null) {
    let results = null;
    const url = _config.api.getGraphMonth;
    const json = {
      username: username,
      index: value,
      max: this.chartMaxValue,
    };
    await getApiAsync(url, json).then((x) => (results = x.results));

    let lblWeeks = [];
    let dataWeight = [];
    let dataBp1 = [];
    let dataBp2 = [];
    let dataBp3 = [];
    let dataBp4 = [];
    let dataStep = [];

    let oi = 0;
    if (tag) {
      oi = (Number(this.getCurrentPage(tag)) - 1) * this.chartMaxValue;
    }

    const digit = 100;
    const defaultValue = null;
    results.forEach((xx, i) => {
      const x = xx[0];
      let weight = x.weight ? x.weight : defaultValue;
      let bp1 = x.bp1 ? x.bp1 : defaultValue;
      let bp2 = x.bp2 ? x.bp2 : defaultValue;
      let bp3 = x.bp3 ? x.bp3 : defaultValue;
      let bp4 = x.bp4 ? x.bp4 : defaultValue;
      let step = x.step ? x.step : defaultValue;
      weight = Math.round(weight * digit) / digit;
      bp1 = Math.round(bp1 * digit) / digit;
      bp2 = Math.round(bp2 * digit) / digit;
      bp3 = Math.round(bp3 * digit) / digit;
      bp4 = Math.round(bp4 * digit) / digit;
      step = Math.round(step * digit) / digit;
      dataWeight.push(weight);
      dataBp1.push(bp1);
      dataBp2.push(bp2);
      dataBp3.push(bp3);
      dataBp4.push(bp4);
      dataStep.push(step);
      lblWeeks.push(`${oi + i + 1}週`);
    });

    return {
      lblWeeks: lblWeeks,
      dataWeight: dataWeight,
      dataBp1: dataBp1,
      dataBp2: dataBp2,
      dataBp3: dataBp3,
      dataBp4: dataBp4,
      dataStep: dataStep,
    };
  }
}
