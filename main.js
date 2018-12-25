var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var eraserEnabled = false
var colorStyle = 'black'

eraser.onclick = function() {
  eraserEnabled = true
}

pen.onclick = function() {
  eraserEnabled = false
}

red.onclick = function() {
  colorStyle = 'red'
}

yellow.onclick = function () {
  colorStyle = 'yellow'
}

blue.onclick = function () {
  colorStyle = 'blue'
}

save.onclick = function() {
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'paint'
  a.click()
}

setCanvasSize(canvas)
listenToMouse(canvas)

function drawCircle(x, y, r) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 360)
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.closePath()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineWidth = 5
  ctx.strokeStyle = colorStyle
  ctx.stroke()
  ctx.closePath()
}

function clearRect(x, y) {
  ctx.clearRect(x, y, 20, 20)
}

function setCanvasSize(canvas) {
  resize()
  window.onresize = function() {
    resize()
  }

  function resize() {
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    canvas.width = width
    canvas.height = height
  }
}

function listenToMouse(canvas) {
  var using = false
  var startPoint = {
    x: undefined,
    y: undefined
  }
  if (document.body.ontouchstart === undefined) {
    canvas.onmousedown = function(e) {
      using = true
      var x = e.clientX
      var y = e.clientY
      startPoint = {
        x: x,
        y: y
      }
      if (eraserEnabled) {
        clearRect(startPoint.x, startPoint.y)
      } else {
        drawCircle(startPoint.x, startPoint.y, 20)
      }
    }
    canvas.onmousemove = function(e) {
      if (!using) {
        return
      }
      var x = e.clientX
      var y = e.clientY
      var newPoint = { x: x, y: y }

      if (eraserEnabled) {
        clearRect(newPoint.x, newPoint.y)
      } else {
        drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y)
        startPoint = newPoint
        drawCircle(newPoint.x, newPoint.y, 20)
      }
    }
    canvas.onmouseup = function() {
      using = false
    }
  } else {
    canvas.ontouchstart = function(e) {
      using = true
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      startPoint = { x: x, y: y }
      if (eraserEnabled) {
        clearRect(startPoint.x, startPoint.y)
      } else {
        // drawCircle(startPoint.x, startPoint.y, 20)
      }
    }
    canvas.ontouchmove = function(e) {
      if (!using) {
        return
      }
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      var newPoint = { x: x, y: y }

      if (eraserEnabled) {
        clearRect(newPoint.x, newPoint.y)
      } else {
        drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y)
        startPoint = newPoint
        // drawCircle(newPoint.x, newPoint.y, 20)
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  }
}
