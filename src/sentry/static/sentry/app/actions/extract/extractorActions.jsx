/**
 * Title: ExtractorActions
 * Author: bold
 * Date: 1/21/16.
 * Description: Reflux Actions File。
 */

import Reflux from 'reflux';
import _ from 'underscore';

const ExtractorActions = Reflux.createActions({
  run: {
    children: ['success', 'failed']
  }
});

ExtractorActions.run.listen(function (streamId, action) {

  // return all template
  // todo: 高亮
  // todo: 返回太多了怎么办 ?

  let mockData = [];
  let i = 0;
  while (i++ < 9) {
    const event_len = _.random(1, 6);
    let template = {
      action: action,
      stream_id: streamId,
      template: 'xxxxxx|xxxxxx|xxxxxx|xxxxxx|xxxxxx|xxxxxx|xxxxxx|xxxxxx|xxxxxx',
      matched_total: _.random(event_len, 100),
      events: (() => {
        let events = [];
        let event_i = 0;
        while (event_i++ < event_len) {
          let logObj = [
            `1.33.129.19`,
            `- - `, `[25/Mar/2015:09:59:02 +0800]`,
            `"GET /drupal7/?q=forum/56 HTTP/1.1"`,
            `200 `,
            `7552 `,
            `"http://221.176.36.22/drupal7/?q=forum"`,
            `"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.2)"`
          ];
          //events.push(`<em>${logObj.join('</em><em>')}</em>`);
          events.push(logObj);
        }
        return events;
      })()
    };
    mockData.unshift(template);
  }

  setTimeout(()=> {
    this.success(mockData);
  }, 200);

});

export default ExtractorActions;