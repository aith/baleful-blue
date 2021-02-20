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

function draw() {
    drawCircle(7)
    noLoop()
}

function drawCircle(verts) {
    let off = 200
    let r = 100
    translate(off, off)
    for(let i = -Math.PI; i < Math.PI; i+=(2*Math.PI)/verts) {
        ellipse(cos(i) * r, sin(i) * r, 10, 10)
        print(1)
    }
    translate(-off, -off)
}
