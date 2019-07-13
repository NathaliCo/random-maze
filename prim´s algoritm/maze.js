function valor() {
    return Math.random() * 1
}

// function comienzo(matriz) {
//     for (i = 0; i < matriz.length; i++) {
//         if (puntoDeInicio = matriz[i].dir)
//             return matriz[i].dir
//     }
// }

// function createLaberint(puntoDeInicio, length, higth) {

//     let matriz = [];
//     let line = {};
//     for (i = 0; i < length; i++) {
//         for (j = 0; j < higth; j++) {
//             matriz.push(line = { dir: [i, j], valor: valor() })

//         }
//          console.log(matriz)
//     }

//     const firstLine = comienzo(matriz);
//     console.log(firstLine)


// for (i = 0; i < 20; i++) {
//     let lines = [];
//     let nextLine;
//     let valores = [valor(), valor(), valor(), valor(), valor(), valor(), valor(), valor()]
//     console.log(valores);

//     function direccion() {
//         let menor = 0;
//         for (i = 0; i < direcciones.length; i++)
//             if (direcciones[i] < direcciones[i + 1]) {
//                 menor = direcciones[i]
//             }
//         return menor;
//     }

//     let firstLine = puntoDeInicio
//     lines.push(firstLine);
//     nextLine = (direccion)
//     lines.push(nextLine)
//     console.log(lines);
// }

// }

// createLaberint([0, 0], 20, 20);


function createMatrix(V, G) {

    var matrix = [];

    // create N x N matrix filled with 0 edge weights between all vertices
    for (var i = 0; i < V; i++) {
        matrix.push([]);
        for (var j = 0; j < V; j++) { matrix[i].push(0); }
    }

    // populate adjacency matrix with correct edge weights
    for (var i = 0; i < G.length; i++) {
        matrix[G[i][0]][G[i][1]] = G[i][2];
        matrix[G[i][1]][G[i][0]] = G[i][2];
    }

    return matrix;

}

function prims(V, G) {

    // create adj matrix from graph
    var matrix = createMatrix(V, G);

    // arbitrarily choose initial vertex from graph
    var nodo = 0;

    // initialize empty edges array and empty MST
    var MST = [];
    var edges = [];
    var visited = [];
    var minEdge = [null, null, Infinity];

    // run prims algorithm until we create an MST
    // that contains every vertex from the graph
    while (MST.length !== V - 1) {
        console.log(visited)
            // mark this vertex as visited
        visited.push(nodo);

        // add each edge to list of potential edges
        for (var r = 0; r < V; r++) {
            if (matrix[nodo][r] !== 0) {
                edges.push([nodo, r, matrix[nodo][r]]);
            }
        }

        // find edge with the smallest weight to a vertex
        // that has not yet been visited
        for (var e = 0; e < edges.length; e++) {
            if (edges[e][2] < minEdge[2] && visited.indexOf(edges[e][1]) === -1) {
                minEdge = edges[e];
                // console.log(minEdge)
            }
        }

        // remove min weight edge from list of edges
        edges.splice(edges.indexOf(minEdge), 1);

        // push min edge to MST
        MST.push(minEdge);

        // start at new vertex and reset min edge
        nodo = minEdge[1];
        minEdge = [null, null, Infinity];

    }

    // console.log(MST);
    // console.log(edges)
}

// graph vertices are actually represented as numbers
// like so: 0, 1, 2, ... V-1
var a = 0,
    b = 1,
    c = 2,
    d = 3,
    e = 4,
    f = 5;

// graph edges with weights
// diagram of graph is shown above
var graph = [
    [a, b, valor()],
    [a, c, valor()],
    [b, d, valor()],
    [b, c, valor()],
    [b, e, valor()],
    [c, e, valor()],
    [d, e, valor()],
    [d, f, valor()],
    [e, f, valor()]
];

// pass the # of vertices and the graph to run prims algorithm 
prims(6, graph);