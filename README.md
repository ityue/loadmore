#js-loadmore 下滑加载更多组件

### 1.1 使用
#### 1.1.1 commonJs规范
    1 安装  npm install js-loadmore
    2 引用  import Loadmore from 'js-loadmore'
    3 使用  
            Loadmore.setOptions({
                pageCount,
                ajaxFN: (currentPage) => {}
            })
            Loadmore.toLoadFn()
    
#### 1.1.2 引用 dist下js

### 1.2 参数
<table>
    <tr>
        <th>名称</th>
        <th>类型</th>
        <th>描述</th>
        <th>必选</th>
        <th>默认值</th>
    </tr>
    <tr>
        <th>pageCount</th>
        <th>Number</th>
        <th>总页数</th>
        <th>Y</th>
        <th>''</th>
    </tr>
    <tr>
        <th>ajaxFN</th>
        <th>Function</th>
        <th>加载时的调取接口，获取数据</th>
        <th>Y</th>
        <th>''</th>
    </tr>
    <tr>
        <th>lock</th>
        <th>Booleans</th>
        <th>滚动的开关，防止连续加载</th>
        <th>N</th>
        <th>true</th>
    </tr>
    <tr>
        <th>throttleTime</th>
        <th>Number </th>
        <th>函数节流时间</th>
        <th>N</th>
        <th>30</th>
    </tr>
    <tr>
        <th>toLoadHeight</th>
        <th>Number</th>
        <th>离底部滚动点距离</th>
        <th>N</th>
        <th>150</th>
    </tr>
    <tr>
        <th>page</th>
        <th>Number</th>
        <th>当前页</th>
        <th>N</th>
        <th>1</th>
    </tr>
    <tr>
        <th>page</th>
        <th>Number</th>
        <th>当前页</th>
        <th>N</th>
        <th>1</th>
    </tr>
    <tr>
        <th>toLoadNum</th>
        <th>Number</th>
        <th>满足条件可加载数</th>
        <th>N</th>
        <th>20</th>
    </tr>
    <tr>
        <th>lockTime</th>
        <th>Number</th>
        <th>加载后多少秒打开开关让页面可继续加载-</th>
        <th>N</th>
        <th>0</th>
    </tr>
    <tr>
        <th>rectHeightDom</th>
        <th>Dom</th>
        <th>要滚动区域,默认body</th>
        <th>N</th>
        <th>document.body</th>
    </tr>
    <tr>
        <th>appendHTMLNode</th>
        <th>Dom</th>
        <th>页面中加入 加载中，没有更多的dom</th>
        <th>N</th>
        <th>document.body</th>
    </tr>
    <tr>
        <th>offsetHeight</th>
        <th>Dom</th>
        <th>可见区域高度</th>
        <th>N</th>
        <th> document.documentElement.offsetHeight || 0</th>
    </tr>
    <tr>
        <th>loadText</th>
        <th>String</th>
        <th>加载文案</th>
        <th>N</th>
        <th>'加载中'</th>
    </tr>
    <tr>
        <th>noMoreText</th>
        <th>String</th>
        <th>没有更多文案</th>
        <th>N</th>
        <th>'没有更多内容'</th>
    </tr>
</table>  

#### 1.3 示例

```javascript

    <!-- vue下 需要在 this.$nextTick下使用，其他可正常使用 -->
    
    this.$nextTick(function(){
        let loadParams = {
            pageCount,
            ajaxFN: (currentPage) => {
                <!-- 需要执行的回调 -->
                var params = {
                    currentPage
                }
                this.$store.dispatch('init', params)
                },
                lockTime: 30, 
        }
        Loadmore.setOptions(loadParams)
        Loadmore.toLoadFn()
    })
    
    ```