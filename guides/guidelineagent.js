// 生成参考线
class GuideLineAgent {
    constructor(containerId) {
        this.container = document.getElementById(containerId)
    }

    createHorizontalLine(id, top) {
        let div = document.createElement('div')
        div.id = 'h' + id
        div.setAttribute('class', 'horizontal-line')
        // div.style.width = document.getElementsByClassName('workspace')[0].clientWidth + 'px'
        div.style.width = this.container.clientWidth + 'px'
        div.style.height = '1px'
        // div.style.left = -this.container.offsetLeft + 'px'
        div.style.top = top + 'px'

        this.container.appendChild(div)
    }

    createVerticalLine(id, left) {
        let div = document.createElement('div')
        div.id = 'v' + id
        div.setAttribute('class', 'vertical-line')
        div.style.width = '1px'
        // div.style.height = document.getElementsByClassName('workspace')[0].clientHeight + 'px'
        div.style.height = this.container.clientHeight + 'px'
        div.style.left = left + 'px'
        // div.style.top = -this.container.offsetTop + 'px'

        this.container.appendChild(div)
    }

    deleteHorizontalLine(id) {
        document.getElementById('h' + id).remove()
    }

    deleteVerticalLine(id) {
        document.getElementById('v' + id).remove()
    }

    showHorizontalLine(id) {
        document.getElementById('h' + id).style.display = 'block'
        // document.getElementById('h' + id).style.width = document.getElementsByClassName('workspace')[0].clientWidth + 'px'
        document.getElementById('h' + id).style.width = this.container.clientWidth + 'px'
        // document.getElementById('h' + id).style.left = -this.container.offsetLeft + 'px'
    }

    showVerticalLine(id) {
        document.getElementById('v' + id).style.display = 'block'
        // document.getElementById('v' + id).style.height = document.getElementsByClassName('workspace')[0].clientHeight + 'px'
        document.getElementById('v' + id).style.height = this.container.clientHeight + 'px'
        // document.getElementById('v' + id).style.top = -this.container.offsetTop + 'px'
    }

    hideHorizontalLine(id) {
        let div = document.getElementById('h' + id)
        if (div) {
            div.style.display = 'none'
        }
    }

    hideVerticalLine(id) {
        let div = document.getElementById('v' + id)
        if (div) {
            div.style.display = 'none'
        }
    }
}

// export default GuideLineAgent
