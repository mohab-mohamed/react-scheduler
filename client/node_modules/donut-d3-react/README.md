# donut-d3-react
> responsive, highlight-able donut vis with key using d3 and react

![Demo](/example/donut-d3-react.gif)

## Install

```bash
npm install --save harryli0088/donut-d3-react
```

## Usage

```jsx
import React, { Component } from 'react'

import Donut from 'donut-d3-react'

let data = [
  {"title":"A","value":4},
  {"title":"B","value":7},
  {"title":"C","value":6},
  {"title":"D","value":8},
  {"title":"E","value":1},
  {"title":"F","value":5}
];


export default class App extends Component {
  render () {
    return (
      <Donut
        data={data} //data: [ {value: number, title: string}, ... ]

        //optional props
        //colorScale defaults to d3.scaleOrdinal(d3.schemeCategory10)
        onArcMouseOverHandler={function(e, d) {}}
        onArcMouseOutHandler={function(e, d) {}}
        onArcClickHandler={function(e, d) {}}
        maxDiameter={500}
        outerToInnerRadiiRatio={2}
        showKey={true}
        keyTextOffsetX={20}
        keyTextOffsetY={14}
        keyFontSize={16}
        keyRowSeparation={20}
        keyRectSize={16}
      />
    )
  }
}
```

### Props
- `data` {Array} Required in the format `[ {value: number, title: string}, ... ]`

Optional props
- `colorScale` {Function} defaults to `d3.scaleOrdinal(d3.schemeCategory10)`
- `onArcMouseOverHandler` {Function} defaults to `function(e, d) {}`
- `onArcMouseOutHandler` {Function} defaults to `function(e, d) {}`
- `onArcClickHandler` {Function} defaults to `function(e, d) {}`
- `maxDiameter` {Number} defaults to `500`
- `outerToInnerRadiiRatio` {Number} defaults to `2`
- `showKey` {Boolean} defaults to `true`
- `keyTextOffsetX` {Number} defaults to `20`
- `keyTextOffsetY` {Number} defaults to `14`
- `keyFontSize` {Number} defaults to `16`
- `keyRowSeparation` {Number} defaults to `20`
- `keyRectSize` {Number} defaults to `16`


## License

MIT © [harryli0088](https://github.com/harryli0088)
