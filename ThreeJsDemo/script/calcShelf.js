var initShelf = function (shelf) {
    //// 由于 EdgesHelper 已过时
    //geometry = new THREE.CubeGeometry(shelf.rowCount * 10, shelf.floorCount * 10, shelf.columnCount * 10);
    //material = new THREE.MeshBasicMaterial();
    //mesh = new THREE.Mesh(geometry, material);
    //edges = new THREE.EdgesHelper(mesh, 0x1535f7); //设置边框，可以旋转 // ***** 已过时 *****

    //edges.position.x = shelf.rowCount * 10 / 2 + shelf.x * 10;
    //edges.position.y = shelf.floorCount * 10 / 2;
    //edges.position.z = shelf.columnCount * 10 / 2 + shelf.z * 10;

    //// scene.add(edges);
    //sceneAdd(edges);

    // 由于 EdgesHelper 已过时, 故采用以下代码进行框的绘制
    var edgesMtl = new THREE.LineBasicMaterial({ color: 0x1535f7 });

    var cubeGeometry = new THREE.BoxGeometry(shelf.rowCount * 10, shelf.floorCount * 10, shelf.columnCount * 10);
    var cubeEdges = new THREE.EdgesGeometry(cubeGeometry, 1);
    var cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);

    cubeLine.position.x = shelf.rowCount * 10 / 2 + shelf.x * 10;
    cubeLine.position.y = shelf.floorCount * 10 / 2;
    cubeLine.position.z = shelf.columnCount * 10 / 2 + shelf.z * 10;

    sceneAdd(cubeLine);

    // 绘制虚线
    // 5个面
    var dashSize = 0.5;
    var gapSize = 0.5;

    var xStart, yStart, zStart, xEnd, yEnd, zEnd;
    var lineGeometry;

    for (var floorIndex = 1; floorIndex < shelf.floorCount; floorIndex++) {
        // LineLeftRow
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10;
        xEnd = shelf.x * 10;

        yStart = floorIndex * 10;
        yEnd = floorIndex * 10;

        zStart = shelf.z * 10;
        zEnd = shelf.z * 10 + shelf.columnCount * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart)); //线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineLeftRow = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineLeftRow.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineLeftRow);
        sceneAdd(lineLeftRow);

        // lineRightRow
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10 + shelf.rowCount * 10;
        xEnd = shelf.x * 10 + shelf.rowCount * 10;

        yStart = floorIndex * 10;
        yEnd = floorIndex * 10;

        zStart = shelf.z * 10;
        zEnd = shelf.z * 10 + shelf.columnCount * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineRightRow = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineRightRow.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineRightRow);
        sceneAdd(lineRightRow);


        // lineNearRow
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10;
        xEnd = shelf.x * 10 + shelf.rowCount * 10;

        yStart = floorIndex * 10;
        yEnd = floorIndex * 10;

        zStart = shelf.z * 10;
        zEnd = shelf.z * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineNearRow = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineNearRow.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineNearRow);
        sceneAdd(lineNearRow);


        // lineFarRow
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10;
        xEnd = shelf.x * 10 + shelf.rowCount * 10;

        yStart = floorIndex * 10;
        yEnd = floorIndex * 10;

        zStart = shelf.z * 10 + shelf.columnCount * 10;
        zEnd = shelf.z * 10 + shelf.columnCount * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineFarRow = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineFarRow.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineFarRow);
        sceneAdd(lineFarRow);

    }

    for (var rowIndex = 1; rowIndex < shelf.rowCount; rowIndex++) {
        // LineTopColumn
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10 + rowIndex * 10;
        xEnd = shelf.x * 10 + rowIndex * 10;

        yStart = shelf.floorCount * 10;
        yEnd = shelf.floorCount * 10;

        zStart = shelf.z * 10;
        zEnd = shelf.z * 10 + shelf.columnCount * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineTopColumn = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineTopColumn.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineTopColumn);
        sceneAdd(lineTopColumn);


        //// LineBottomColumn (暂时不显示)
        //lineGeometry = new THREE.Geometry();
        //xStart = shelf.x * 10 + rowIndex * 10;
        //xEnd = shelf.x * 10 + rowIndex * 10;

        //yStart = 0;
        //yEnd = 0;

        //zStart = shelf.z * 10;
        //zEnd = shelf.z * 10 + shelf.columnCount * 10;

        //lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        //lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        //var lineBottomColumn = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
        //    color: 0xffffff, //线段的颜色
        //    dashSize: dashSize, //短划线的大小
        //    gapSize: gapSize //短划线之间的距离
        //}));
        //lineBottomColumn.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        //scene.add(lineBottomColumn);

        // lineNearColumn
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10 + rowIndex * 10;
        xEnd = shelf.x * 10 + rowIndex * 10;

        yStart = 0;
        yEnd = floorIndex * 10;

        zStart = shelf.z * 10;
        zEnd = shelf.z * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineNearColumn = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineNearColumn.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineNearColumn);
        sceneAdd(lineNearColumn);


        // lineNearColumn
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10 + rowIndex * 10;
        xEnd = shelf.x * 10 + rowIndex * 10;

        yStart = 0;
        yEnd = floorIndex * 10;

        zStart = shelf.z * 10 + shelf.columnCount * 10;
        zEnd = shelf.z * 10 + shelf.columnCount * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineFarColumn = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineFarColumn.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineFarColumn);
        sceneAdd(lineFarColumn);
    }

    for (var columnIndex = 1; columnIndex < shelf.columnCount; columnIndex++) {
        // lineTopRow
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10;
        xEnd = shelf.x * 10 + shelf.rowCount * 10;

        yStart = shelf.floorCount * 10;
        yEnd = shelf.floorCount * 10;

        zStart = shelf.z * 10 + columnIndex * 10;
        zEnd = shelf.z * 10 + columnIndex * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineTopRow = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineTopRow.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        // scene.add(lineTopRow);
        sceneAdd(lineTopRow);


        //// lineBottomRow (暂时不显示)
        //lineGeometry = new THREE.Geometry();
        //xStart = shelf.x * 10;
        //xEnd = shelf.x * 10 + shelf.rowCount * 10;

        //yStart = 0;
        //yEnd = 0;

        //zStart = shelf.z * 10 + columnIndex * 10;
        //zEnd = shelf.z * 10 + columnIndex * 10;

        //lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        //lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        //var lineBottomRow = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
        //    color: 0xffffff, //线段的颜色
        //    dashSize: dashSize, //短划线的大小
        //    gapSize: gapSize //短划线之间的距离
        //}));
        //lineBottomRow.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        ////scene.add(lineBottomRow);
        //sceneAdd(lineBottomRow);


        // lineLeftColumn
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10;
        xEnd = shelf.x * 10;

        yStart = 0;
        yEnd = shelf.floorCount * 10;

        zStart = shelf.z * 10 + columnIndex * 10;
        zEnd = shelf.z * 10 + columnIndex * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineLeftColumn = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineLeftColumn.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        //scene.add(lineLeftColumn);
        sceneAdd(lineLeftColumn);

        // lineRightColumn
        lineGeometry = new THREE.Geometry();
        xStart = shelf.x * 10 + shelf.rowCount * 10;
        xEnd = shelf.x * 10 + shelf.rowCount * 10;

        yStart = 0;
        yEnd = shelf.floorCount * 10;

        zStart = shelf.z * 10 + columnIndex * 10;
        zEnd = shelf.z * 10 + columnIndex * 10;

        lineGeometry.vertices.push(new THREE.Vector3(xStart, yStart, zStart));//线段的两个顶点
        lineGeometry.vertices.push(new THREE.Vector3(xEnd, yEnd, zEnd));

        var lineRightColumn = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
            color: 0xffffff, //线段的颜色
            dashSize: dashSize, //短划线的大小
            gapSize: gapSize //短划线之间的距离
        }));
        lineRightColumn.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
        //scene.add(lineRightColumn);
        sceneAdd(lineRightColumn);
    }

    // 画格子
    for (var indexX = 0; indexX < shelf.rowCount; indexX++) {
        for (var indexZ = 0; indexZ < shelf.columnCount; indexZ++) {
            for (var indexY = 0; indexY < shelf.floorCount; indexY++) {

                var randColor;
                var rand = Math.random();

                if (0 < rand && rand <= 0.2) {
                    randColor = colorArray[0];
                } else if (0.2 < rand && rand <= 0.4) {
                    randColor = colorArray[1];
                } else if (0.4 < rand && rand <= 0.6) {
                    randColor = colorArray[2];
                } else if (0.6 < rand && rand <= 0.8) {
                    randColor = colorArray[3];
                } else if (0.8 < rand && rand <= 1) {
                    randColor = colorArray[4];
                }

                geometry = new THREE.CubeGeometry(10, 10, 10);
                material = new THREE.MeshPhongMaterial({
                    color: randColor
                    , wireframe: false // wireframe 空心材质
                    , transparent: true
                    , opacity: 0.7
                });
                mesh = new THREE.Mesh(geometry, material);
                mesh.Name = "S:X" + shelf.x + ";Z" + shelf.z + "|L:X" + indexX + ";Y" + indexY + ";Z" + indexZ;

                mesh.position.x = 5 + shelf.x * 10 + indexX * 10;
                mesh.position.y = 5 + indexY * 10;
                mesh.position.z = 5 + shelf.z * 10 + indexZ * 10;

                mesh.direction = shelf.direction;
                console.log(mesh.direction);

                sceneAddLocation(mesh);
            }
        }
    }
};

// 仓库格子集合
var objectLocations = new Array();

var colorArray =
    [
        "#fecbcb",
        "#fea5a5",
        "#fe8080",
        "#ff5959",
        "#ff1a1a"
    ];

// 添加 场景 & 仓库格子集合中
var sceneAddLocation = function (obj) {
    scene.add(obj);
    objectLocations.push(obj);
};

