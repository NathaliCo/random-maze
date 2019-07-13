const control_labyrinth = {
    /* Dimension of labyrinth */
    width: 92,
    heigth: 40,
    init: function() {
        /* Init space for three js, the timer time, and load the marked saved */

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        let zone_canvas = document.getElementById("scene");
        let canvas = renderer.domElement;
        zone_canvas.appendChild(canvas);

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
        geometry.vertices.push(new THREE.Vector3(-50, -20, 0));
        geometry.vertices.push(new THREE.Vector3(-50, 20, 0));

        var line = new THREE.Line(geometry, material);

        labery = new Laberinto([control_labyrinth.width, control_labyrinth.heigth], [-(control_labyrinth.width / 2), -(control_labyrinth.heigth / 2)]);
        labery.draw(scene);
        // let cube = [];
        // cube[1] = new THREE.Mesh( geometry, material );
        // cube[2] = new THREE.Mesh( geometry, material );
        // cube[3] = new THREE.Mesh( geometry, material );
        // cube[4] = new THREE.Mesh( geometry, material );
        // cube[1].position.x = -50
        // cube[1].position.y = -20

        // cube[2].position.x = -50
        // cube[2].position.y = 20

        // cube[3].position.x = 50
        // cube[3].position.y = 20

        // cube[4].position.x = 50
        // cube[4].position.y = -20

        // scene.add( cube[1] );
        // scene.add( cube[2] );
        // scene.add( cube[3] );
        // scene.add( cube[4] );
        // scene.add(line);

        /* Distance of the camera */
        camera.position.z = 30;

        let animate = function() {
            requestAnimationFrame(animate);

            renderer.render(scene, camera);
        };

        animate();
    },

};



window.addEventListener("load", control_labyrinth.init);