class Cell {
    constructor() {
        this.visited = false;
        this.neighbors = [];
    }
}
/* labyrinth program */
let width = 92;
let heigth = 40;
class Laberinto {

    constructor(dimension, reference_point = [0, 0], dimension3D = false) {
        this.reference_point = reference_point;
        this.dimension = dimension;
        this.init_point = [reference_point[0] + Math.random() * dimension[0], reference_point[1]];
        this.cellData = [];
        /* Margin 5*/
        if (this.init_point[0] >= this.reference_point[0] - 5)
            this.init_point[0] -= 5;

        this.end_point = []; // The definition of end point is in the generateLabyrinth function 
        this.dimension3D = dimension3D;
        this.generateLabyrinth();
        for (var i = 0; i < this.dimension[0]; ++i) {
            this.cellData[i] = [];
            for (var j = 0; j < this.dimension[1]; ++j) {
                this.cellData[i][j] = new Cell();
            }
        }
    }

    draw(scene, material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 })) {

        /* Draw contour */
        this.contour.forEach(element => {
            scene.add(new THREE.Line(element, material))
        });



























        /*Draw content */
        const VAL_Z = this.dimension3D == true ? 5 : 0;
        this.line = [];
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(this.init_point[0], -18, 0));
        geometry.vertices.push(new THREE.Vector3(this.init_point[0], this.reference_point[1], 0));
        this.line.push(geometry);
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(this.init_point[0] + 5, -18, 0));
        geometry.vertices.push(new THREE.Vector3(this.init_point[0] + 5, this.reference_point[1], 0));
        this.line.push(geometry);

        console.log(this.init_point[0], this.init_point[1], this.reference_point[1])

        this.line.forEach(element => {
            scene.add(new THREE.Line(element, material))
        });
        // -------------------------------------------------------------------------
        var root = { i: 0, j: 0 };
        var start = { i: this.init_point[0], j: this.init_point[1] }
        this.recurseDescend(root, start);


    }

    veirificateCollisions(pos) {
        if (pos.length != 2)
            throw "";
        else {

        }
    }

    generateLabyrinth() {
        /* Make aleatory labyrinth */

        const VAL_Z = this.dimension3D == true ? 5 : 0;
        this.contour = [];
        this.content = [];
        let geometry = new THREE.Geometry();

        /* Draw contour of Labyrinth */
        /* Bottom Line */
        geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1], VAL_Z));
        geometry.vertices.push(new THREE.Vector3(this.init_point[0], this.reference_point[1], VAL_Z));
        this.contour.push(geometry);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(this.init_point[0] + 5, this.reference_point[1], VAL_Z));
        geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1], VAL_Z));
        this.contour.push(geometry);

        let side_of_end = Math.random() * 3;
        /* Generate end point  */

        this.end_point = [];

        /* Other Lines */
        if (side_of_end < 1) {
            this.end_point = [this.reference_point[0], this.reference_point[1] + Math.random() * this.dimension[1]];
            if (this.end_point[1] >= this.reference_point[1] + this.dimension[1] - 5)
                this.end_point[1] -= 5;

            /* Side --> Left */
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.end_point[1], VAL_Z));
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.end_point[1] + 2, VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);

            /* Others */
            /*Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);
            /*Rigth*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1] + this.dimension[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1], VAL_Z))
            this.contour.push(geometry);
            geometry = new THREE.Geometry();



        } else if (side_of_end < 2) {
            this.end_point = [this.reference_point[0] + Math.random() * (this.dimension[0]), this.reference_point[1]];
            if (this.end_point[0] >= this.reference_point[0] + this.dimension[0] - 5)
                this.end_point[0] -= 5;

            /* Side --> Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.end_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.end_point[0] + 5, this.reference_point[1] + this.dimension[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);

            /* Others */
            /*Rigth*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1] + this.dimension[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1], VAL_Z))
            this.contour.push(geometry);
            /*Left*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);

        } else {
            this.end_point = [this.reference_point[0] + this.dimension[0], this.reference_point[1] + Math.random() * this.dimension[1]];
            if (this.end_point[1] >= this.reference_point[1] + this.dimension[1] - 5)
                this.end_point[1] -= 5;

            /* Side --> Rigth */
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.end_point[1], VAL_Z))
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.end_point[1] + 2, VAL_Z))
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1] + this.dimension[1], VAL_Z))
            this.contour.push(geometry);

            /* Others */
            /*Left*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);
            /*Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            geometry.vertices.push(new THREE.Vector3(this.reference_point[0] + this.dimension[0], this.reference_point[1] + this.dimension[1], VAL_Z));
            this.contour.push(geometry);

        }



    }
    recurseDescend(curr, prev) {
        console.log(this.reference_point[0])
        console.log(this.cellData)
        console.log("Visiting node:", prev.i, prev.j);
        // this.cellData[Math.floor(prev.i)][Math.floor(prev.j)].visited = true;
        // var next = [{ i: curr.i - 1, j: curr.j }, { i: curr.i, j: curr.j - 1 },
        //     { i: curr.i + 1, j: curr.j }, { i: curr.i, j: curr.j + 1 }
        // ];
        // while (next.length > 0) {
        //     var idx = Math.floor(next.length * Math.random());
        //     if (next[idx].i == prev.i && next[idx].j == prev.j) {
        //         // console.log("Not building wall between(", curr.i, curr.j,
        //         //             ") and (", next[idx].i, next[idx].j, ").");
        //     } else if (next[idx].i < 0 || next[idx].i > this.ni - 1 ||
        //         next[idx].j < 0 || next[idx].j > this.nj - 1 ||
        //         this.cellData[next[idx].i][next[idx].j].visited) {
        //         // Create a wall between curr and next.
        //         // console.log("Building wall between (", curr.i, curr.j,
        //         //             ") and (", next[idx].i, next[idx].j, ").");
        //         var di = next[idx].i - curr.i;
        //         var dj = next[idx].j - curr.j;
        //         var p0 = this.geometry.vertices.length;
        //         if (di > 0) {
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.45, curr.j - 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.45, curr.j - 0.55, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.45, curr.j + 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.45, curr.j + 0.55, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.50, curr.j - 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.50, curr.j - 0.55, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.50, curr.j + 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.50, curr.j + 0.55, 1));
        //         } else if (di < 0) {
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.45, curr.j - 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.45, curr.j - 0.55, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.45, curr.j + 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.45, curr.j + 0.55, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.50, curr.j - 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.50, curr.j - 0.55, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.50, curr.j + 0.55, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.50, curr.j + 0.55, 1));
        //         } else if (dj > 0) {
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j + 0.45, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j + 0.45, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j + 0.45, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j + 0.45, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j + 0.50, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j + 0.50, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j + 0.50, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j + 0.50, 1));
        //         } else if (dj < 0) {
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j - 0.45, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j - 0.45, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j - 0.45, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j - 0.45, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j - 0.50, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i - 0.55, curr.j - 0.50, 1));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j - 0.50, 0));
        //             this.geometry.vertices.push(new THREE.Vector3(curr.i + 0.55, curr.j - 0.50, 1));
        //         }
        //         this.geometry.faces.push(new THREE.Face3(p0, p0 + 1, p0 + 3));
        //         this.geometry.faces.push(new THREE.Face3(p0, p0 + 3, p0 + 2));
        //         this.geometry.faces.push(new THREE.Face3(p0, p0 + 4, p0 + 5));
        //         this.geometry.faces.push(new THREE.Face3(p0, p0 + 5, p0 + 1));
        //         this.geometry.faces.push(new THREE.Face3(p0 + 1, p0 + 5, p0 + 7));
        //         this.geometry.faces.push(new THREE.Face3(p0 + 1, p0 + 7, p0 + 3));
        //         this.geometry.faces.push(new THREE.Face3(p0 + 3, p0 + 7, p0 + 6));
        //         this.geometry.faces.push(new THREE.Face3(p0 + 3, p0 + 6, p0 + 2));
        //     } else {
        //         // Mark this node as visited and proceed to the next
        //         this.recurseDescend(next[idx], curr);
        //         // console.log("Returned to node:", curr.i, curr.j);
        //     }
        //     next.splice(idx, 1);
        // }
    }

}



function lab() {
    const _WALL = '█';
    const _PATH = ' ';
    const _COLS = 60;
    const _ROWS = 60;

    let maze = [];
    for (let i = 0; i < _COLS; i++) {
        maze.push([]);
        for (let j = 0; j < _ROWS; j++)
            maze[i][j] = _WALL;
    }

    // 2. Pick a cell, mark it as part of the maze. 

    let cell = { x: Math.floor(Math.random() * _COLS), y: Math.floor(Math.random() * _ROWS) };
    maze[cell.x][cell.y] = _PATH;

    // 2.1 Add the walls of the cell to the wall list.

    let walls = [];
    if (cell.x + 1 < _COLS) walls.push({ x: cell.x + 1, y: cell.y });
    if (cell.x - 1 >= 0) walls.push({ x: cell.x - 1, y: cell.y });
    if (cell.y + 1 < _ROWS) walls.push({ x: cell.x, y: cell.y + 1 });
    if (cell.y - 1 >= 0) walls.push({ x: cell.x, y: cell.y - 1 });

    // 3. While there are walls in the list:

    while (walls.length > 0) {

        // 3.1 Pick a random wall from the list.

        let wallIndex = Math.floor(Math.random() * walls.length);
        let wall = walls[wallIndex];

        // 3.2 If only one of the two cells that the wall divides is visited, then:

        let uc = []; // uc will be short for 'unvisited cell'

        if (wall.x + 1 < _COLS && maze[wall.x + 1][wall.y] === _PATH) uc.push({ x: wall.x - 1, y: wall.y });
        if (wall.x - 1 >= 0 && maze[wall.x - 1][wall.y] === _PATH) uc.push({ x: wall.x + 1, y: wall.y });
        if (wall.y + 1 < _ROWS && maze[wall.x][wall.y + 1] === _PATH) uc.push({ x: wall.x, y: wall.y - 1 });
        if (wall.y - 1 >= 0 && maze[wall.x][wall.y - 1] === _PATH) uc.push({ x: wall.x, y: wall.y + 1 });

        if (uc.length === 1) {

            // 3.2.1 Make the wall a passage and mark the unvisited cell as part of the maze.

            maze[wall.x][wall.y] = _PATH;
            if (uc[0].x >= 0 && uc[0].x < _COLS && uc[0].y >= 0 && uc[0].y < _ROWS) {
                maze[uc[0].x][uc[0].y] = _PATH;

                // 3.2.2 Add the neighboring walls of the cell to the wall list.

                if (uc[0].x + 1 < _COLS && maze[uc[0].x + 1][uc[0].y] === _WALL) walls.push({ x: uc[0].x + 1, y: uc[0].y });
                if (uc[0].x - 1 >= 0 && maze[uc[0].x - 1][uc[0].y] === _WALL) walls.push({ x: uc[0].x - 1, y: uc[0].y });
                if (uc[0].y + 1 < _ROWS && maze[uc[0].x][uc[0].y + 1] === _WALL) walls.push({ x: uc[0].x, y: uc[0].y + 1 });
                if (uc[0].y - 1 >= 0 && maze[uc[0].x][uc[0].y - 1] === _WALL) walls.push({ x: uc[0].x, y: uc[0].y - 1 });
            }
        }

        // 3.3 Remove the wall from the list.

        walls.splice(wallIndex, 1);
    }

    console.table(maze);

    function setup() {
        createCanvas(400, 400);
        fill(0);
        let widthUnit = width / _COLS;
        let heightUnit = height / _ROWS;

        for (let i = 0; i < _COLS; i++)
            for (let j = 0; j < _ROWS; j++)
                if (maze[i][j] === _WALL) {
                    //rect(i*widthUnit, j*heightUnit, widthUnit, heightUnit);
                    if (i - 1 >= 0 && i + 1 < _COLS) {
                        if (maze[i - 1][j] === _WALL) line((i + 0.5) * widthUnit, (j + 0.5) * heightUnit, i * widthUnit, (j + 0.5) * heightUnit);
                        if (maze[i + 1][j] === _WALL) line((i + 0.5) * widthUnit, (j + 0.5) * heightUnit, (i + 1) * widthUnit, (j + 0.5) * heightUnit);
                    }
                    if (j - 1 >= 0 && j + 1 < _ROWS) {
                        if (maze[i][j - 1] === _WALL) line((i + 0.5) * widthUnit, (j + 0.5) * heightUnit, (i + 0.5) * widthUnit, j * heightUnit);
                        if (maze[i][j + 1] === _WALL) line((i + 0.5) * widthUnit, (j + 0.5) * heightUnit, (i + 0.5) * widthUnit, (j + 1) * heightUnit);
                    }
                }
    }
}