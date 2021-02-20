/* todo
 * x draw variable circle
 * x subdivide with skewing out
 * magnitude for each edge
 * lessen over time
 * - layer cirle's iterations of 3 subd's with diminishing opacity
 * - play with color equation
 */

let can; let canw = 800; let canh = 800;

class growVec {
    constructor(vec, mag) {
        this.vec = vec
        this.mag = mag
    }
}

let start_circle = []
let edges = 10
let magnitudes_per_edge = [0.8, 0.7, .9, 1.0, 0.9]
let subd_per_layer = 6
let layers = 3
function setup() {
    can = createCanvas(canh, canw)
    frameRate(60)
    let circle_verts = genCircle(edges)
    // Create growVecs
    for(let edge_i = 0; edge_i < circle_verts.length; edge_i++) {
        let mag = 1
        let x = circle_verts[edge_i].x
        let y = circle_verts[edge_i].y
        start_circle.push(new growVec(createVector(x, y), mag));
    }
}

function draw() {
    // noStroke()
    // fill("orange")
    let off = 400

    beginShape()
    translate(off, off)
    noStroke()
    fill("red")
    for(let v_i = 0; v_i < start_circle.length; v_i++) {
        let x = start_circle[v_i].vec.x
        let y = start_circle[v_i].vec.y
        vertex(x, y)
    }
    endShape(CLOSE)
    translate(-off, -off)
    
    // DRAW
    translate(off, off)
    for(let layer_i = 0; layer_i < layers; layer_i++){
        let alpha = 220 / (layer_i + 1);

        start_circle = subdivideShape(start_circle, subd_per_layer, layer_i * subd_per_layer)

        noStroke()
        fill(255, 69, 0, alpha)
        beginShape()
        for(let v_i = 0; v_i < start_circle.length; v_i++) {
            let x = start_circle[v_i].vec.x
            let y = start_circle[v_i].vec.y
            vertex(x, y)
        }
        endShape(CLOSE)
    }
    translate(-off, -off)

    print("done")
    noLoop()
}

function findPerpAngle(v1, v2) {
    // straight up just take the vector between v1 and v2, and flip the x and y and - the y
    let vec = createVector(-(v2.y - v1.y), v2.x - v1.x).normalize()
    return vec
}

function subdivideShape(vertv, amt, start_subd_i = 0) {
    if(vertv.length < 2) { print("Need >2 vertices"); return false; }

    let chiseled = []
    for(let subd_i = 0; subd_i < amt; subd_i++){
        chiseled = []
        chiseled_mags = []
        let mag_falloff = 1 / (sqrt(start_subd_i) + 1);
        for(let edge_i = 0; edge_i < vertv.length; edge_i++) {
            let v1 = vertv[edge_i]
            let v2 = vertv[(edge_i + 1) % vertv.length]
            let mag = v1.mag
            let vnew = new growVec(subdivideEdge(v1.vec, v2.vec, 0.5), mag);

            // jut out
            let perp = findPerpAngle(v1.vec,v2.vec)
            vnew.vec = vnew.vec.sub(perp.mult(randomGaussian(9,8) * mag * mag_falloff))
            chiseled.push(v1, vnew)
        }
        // chiseled.push(vertv[vertv.length - 1])
        magv = chiseled_mags.slice()
        vertv = chiseled.slice()
    }
    return chiseled
}

// Return array of coordinates (vector struct)
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
