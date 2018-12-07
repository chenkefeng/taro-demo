import Taro, { Component } from '@tarojs/taro'
import { Button, View, ScrollView } from '@tarojs/components'
import { SDBody, SDText, SDLoading, SDSlide, SDPopup, SDQuantity } from 'sudao-ui'
import SDUtils from 'sudao-utils'

import './index.less'

type IState = {
  line: number
}


export default class Index extends Component<{}, IState> {

  preSlideCompsId: string = ''

  constructor () {
    super()
    this.state = {
      line: 1
    }
  }

  render () {
    return (
      <SDBody sd-class='container'>
        <SDText sd-class='main-txt' line={this.state.line}> 注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。注意即使属性未有任何改变，Taro 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。 </SDText>
        <Button onClick={this.onBtnTaped}>点击我</Button>
        <SDLoading loading={true} hasMore={false} hasData={true} hideLoading={false}>
          <View className='main-txt'>暂无数据..</View>
        </SDLoading>
        <Button onClick={this.onMaskBtnTaped}>弹窗</Button>

        <View className='cell-list'>
          {
            [1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => {
              return (
                <View className='cell-item' key={index}>
                  {/** 在循环中 getSlideRef 不执行 */}
                  <SDSlide id={`comps_${index}`} slideWidth={150} height={200}
                           renderSlide={
                             <View className='cell-right' onClick={this.onCellDeleteTaped.bind(this, item, index)}>删除</View>
                           }
                           onWillEditing={this.cellWillEditing.bind(this, index)}>
                    <View className='cell-content' onClick={this.onCellTaped.bind(this, item, index)}>
                      <View>====={index}</View>
                      <SDQuantity value={8} max={10} min={4} extData={index} onValueChange={this.onQuantityValueChange} onBoundary={this.onQuantityBoundary} />
                    </View>
                  </SDSlide>
                </View>
              )
            })
          }
        </View>

        <SDPopup ref='compsPopup'>
          <ScrollView style={'height:700rpx; width:100%; background-color:#fff;'} scrollY>
            <View style={'height:1400rpx; width:100%; background-color:#fff;'}>
              <View>DDDDDDD</View>
              <Button onClick={this.closePopup}>关闭弹窗</Button>
            </View>
          </ScrollView>
        </SDPopup>
      </SDBody>
    )
  }

  onCellTaped = (_, index, e) => {
    e.stopPropagation()
    let comps = (this.$scope.selectComponent(`#comps_${index}`) || {}).$component
    if (comps && comps.isInEditing()) {
      comps.endEditing()
      return
    }
    comps = (this.$scope.selectComponent(this.preSlideCompsId) || {}).$component
    comps && comps.endEditing()
    SDUtils.showMsg(`点击了${index}行`)
  }

  onCellDeleteTaped = (item, index, e) => {
    e.stopPropagation()
    console.log(item)
    SDUtils.showMsg(`点击了删除${index}行`)
  }

  onBtnTaped = () => {
    let { line } = this.state
    this.setState({
      line: ++line
    })
  }

  onMaskBtnTaped = () => {
    let comps = this.refs.compsPopup
    comps && comps.show()
  }

  closePopup = () => {
    let comps = this.refs.compsPopup
    comps && comps.dismiss()
  }

  cellWillEditing = (extData: any): void => {
    const currentSlideCompsId = `#comps_${extData}`
    if (this.preSlideCompsId && currentSlideCompsId != this.preSlideCompsId) {
      const comps = (this.$scope.selectComponent(this.preSlideCompsId) || {}).$component
      comps && comps.endEditing()
    }
    this.preSlideCompsId = currentSlideCompsId
  }

  onQuantityValueChange = (value, extData) => {
    console.log(value, extData, 'onQuantityValueChange')
  }

  onQuantityBoundary = (value, type, extData) => {
    console.log(value, type, extData, 'onQuantityBoundary')
    SDUtils.showMsg(`已达到${type == 'plus' ? '最大' : '最小'}值：${value}`)
  }
}
