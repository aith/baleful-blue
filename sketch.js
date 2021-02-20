/* todo
 * - draw variable circle
 * - subdivide with skewing out
 * - layer cirle's iterations of 3 subd's with diminishing opacity
 * - play with color equation
 */

let can; let canw = 800; let canh = 800;

function setup() {
    can = createCanvas(canh, canw)
    frameRate(60)
}

let start_circle = []
function draw() {
    start_circle = genCircle(10)
    print(start_circle)
    drawShape(start_circle)
    noLoop()
}

function genCircle(vertc, r=100) {
    let circle = []
    for(let i = -Math.PI; i < Math.PI; i+=(2*Math.PI)/vertc) {
        circle.push([cos(i) * r, sin(i) * r])
    }
    return circle
}

// Take an array of 2D vectors and draw them
function drawShape(vertv, offx = canw/2, offy = canh/2) {
    translate(offx, offy)
    beginShape()
    for (let v_i = 0; v_i < vertv.length; v_i++) {
        let x = vertv[v_i][0]
        let y = vertv[v_i][1]
        vertex(x, y)
    }
    endShape(CLOSE)
    translate(-offx, -offy)
}
