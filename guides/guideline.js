// import GuideLineAgent from './guidelineagent.js'

class GuideLine {
    constructor(containerId) {
        // 横向参考线集合
        this.horizontal = {}

        // 纵向参考线集合
        this.vertical = {}

        // 需要隐藏的参考线
        this.preMatchHorizontal = []
        this.preMatchVertical = []

        // 需要显示的参考线
        this.matchHorizontal = []
        this.matchVertical = []

        this.agent = new GuideLineAgent(containerId)

        let container = document.getElementById(containerId)
        let t = 0
        let l = 0
        let w = parseFloat(container.clientWidth)
        let h = parseFloat(container.clientHeight)
        this.addLines([t, t + h / 2, t + h], [l, l + w / 2, l + w])
    }

    // 添加参考线
    addLines(horizontal, vertical) {
        for (let key in horizontal) {
            let value = Math.round(horizontal[key])
            if (this.horizontal.hasOwnProperty(value)) {
                ++this.horizontal[value]
            } else {
                this.horizontal[value] = 1
                this.agent.createHorizontalLine(value, horizontal[key])
            }
        }

        for (let key in vertical) {
            let value = Math.round(vertical[key])
            if (this.vertical.hasOwnProperty(value)) {
                ++this.vertical[value]
            } else {
                this.vertical[value] = 1
                this.agent.createVerticalLine(value, vertical[key])
            }
        }
    }

    // 删除参考线
    deleteLines(horizontal, vertical) {
        for (let key in horizontal) {
            let value = Math.round(horizontal[key])
            if (this.horizontal.hasOwnProperty(value)) {
                if (this.horizontal[value] > 1) {
                    --this.horizontal[value]
                } else {
                    delete this.horizontal[value]
                    this.agent.deleteHorizontalLine(value)
                }
            }
        }

        for (let key in vertical) {
            let value = Math.round(vertical[key])
            if (this.vertical.hasOwnProperty(value)) {
                if (this.vertical[value] > 1) {
                    --this.vertical[value]
                } else {
                    delete this.vertical[value]
                    this.agent.deleteVerticalLine(value)
                }
            }
        }
    }

    // 隐藏参考线
    hideLines() {
        for (let key in this.preMatchHorizontal) {
            this.agent.hideHorizontalLine(this.preMatchHorizontal[key])
        }
        this.preMatchHorizontal = []

        for (let key in this.preMatchVertical) {
            this.agent.hideVerticalLine(this.preMatchVertical[key])
        }
        this.preMatchVertical = []
    }

    adsorbHorizontal(horizontal) {
        let adsorb = false
        let adsorbH

        for (let index in horizontal) {
            let value = Math.round(horizontal[index])
            for (let h in this.horizontal) {
                if (Math.abs(value - h) < 5) {
                    adsorb = true
                    adsorbH = h
                    break
                }
            }
            if (adsorb) {
                return {
                    'key': index,
                    'h': adsorbH
                }
            }
        }
    }

    adsorbVertical(vertical) {
        let adsorb = false
        let adsorbV

        for (let index in vertical) {
            let value = Math.round(vertical[index])
            for (let v in this.vertical) {
                if (Math.abs(value - v) < 5) {
                    adsorb = true
                    adsorbV = v
                    break
                }
            }
            if (adsorb) {
                return {
                    'key': index,
                    'v': adsorbV
                }
            }
        }
    }

    match(horizontal, vertical) {
        this.hideLines()
        this.matchHorizontal = []
        this.matchVertical = []

        // 匹配拖动物体的位置和参考线
        for (let key in horizontal) {
            let value = Math.round(horizontal[key])
            if (this.horizontal.hasOwnProperty(value)) {
                this.matchHorizontal.push(value)
            }
        }

        for (let key in vertical) {
            let value = Math.round(vertical[key])
            if (this.vertical.hasOwnProperty(value)) {
                this.matchVertical.push(value)
            }
        }

        // 如果匹配，则显示参考线
        for (let key in this.matchHorizontal) {
            this.agent.showHorizontalLine(this.matchHorizontal[key])
        }

        for (let key in this.matchVertical) {
            this.agent.showVerticalLine(this.matchVertical[key])
        }

        // 待隐藏参考线
        if (this.matchHorizontal.length > 0) {
            this.preMatchHorizontal = this.matchHorizontal
        }

        if (this.matchVertical.length > 0) {
            this.preMatchVertical = this.matchVertical
        }
    }
}

// export default GuideLine
