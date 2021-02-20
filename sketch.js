/* todo
 * x draw variable circle
 * - subdivide with skewing out
 * - layer cirle's iterations of 3 subd's with diminishing opacity
 * - play with color equation
 */

let can; let canw = 800; let canh = 800;

function setup() {
    can = createCanvas(canh, canw)
    frameRate(60)
    start_circle = genCircle(10)
    start_circle = subdivideShape(start_circle, 1)
    print(start_circle)
}

let start_circle = []
function draw() {
    print(start_circle)
    drawShape(start_circle)
    fill("red")
    translate(400, 400)
    // let n = start_circle
    ellipse(start_circle[0].x, start_circle[0].y, 10, 10)
    translate(-400, -400)

    noLoop()
}

function subdivideShape(vertv, amt) {
    if(vertv.length < 2) { print("Need >2 vertices"); return false; }

    let chiseled = []
    for(let subd_i = 0; subd_i < amt; subd_i++){
        for(let edge_i = 0; edge_i < vertv.length; edge_i++) {
            let v1 = vertv[edge_i]
            let v2 = vertv[(edge_i + 1) % vertv.length]
            let vnew = subdivideEdge(v1, v2, 0.5)
            chiseled.push(v1, vnew)
        }
        // chiseled.push(vertv[vertv.length - 1])
        vertv = chiseled.slice()
    }
    return chiseled
}

function genCircle(vertc, r=100) {
    let circle = []
    for(let i = -Math.PI; i < Math.PI; i+=(2*Math.PI)/vertc) {
        circle.push(createVector(cos(i) * r, sin(i) * r))
    }
    return circle
}

// Take an array of 2D vectors and draw them
function drawShape(vertv, offx = canw/2, offy = canh/2) {
    translate(offx, offy)
    beginShape()
    for (let v_i = 0; v_i < vertv.length; v_i++) {
        let x = vertv[v_i].x
        let y = vertv[v_i].y
        vertex(x, y)
    }
    endShape(CLOSE)
    translate(-offx, -offy)
}

// return the interpolated vertex: one x-y pair
function subdivideEdge(v1, v2, lerp_ratio) {
    let v3x = lerp(v1.x, v2.x, lerp_ratio)
    let v3y = lerp(v1.y, v2.y, lerp_ratio)
    return createVector(v3x, v3y)
}
