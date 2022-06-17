<?php
$images = array_reverse(glob("*.jpg"));
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painter</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
</head>
<body>

<div class="container p-4">
    <div class="row">
        <div class="col d-flex justify-content-between align-items-center mb-2">
            <div class="group-tools">
                <div class="btn-tool">
                    <div class="input-color-container">
                        <input id="color-picker" type="color" value="#000000">
                    </div>
                    <label for="color-picker" class="form-label">Цвет кисти</label>
                </div>

                <div class="btn-tool">
                    <input type="range" class="form-range" min="2" max="5" id="size-picker" value="2">
                    <div class="brush-size-label">
                        <label for="size-picker" class="form-label">Размер кисти</label>
                        <span id="brush-size"></span>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="group-tools">
                <div class="btn-tool">
                    <button id="brash" class="btn-brush btn-tool-item btn-tool-active"></button>
                    Кисть
                </div>

                <div class="btn-tool">
                    <button id="eraser" class="btn-eraser btn-tool-item"></button>
                    Ластик
                </div>
            </div>
            <div class="divider"></div>
            <div class="group-tools">
                <div class="btn-tool btn-tool-rounded">
                    <button class="bg-image btn-bg-cell" value="cell"></button>
                    Фон в клетку
                </div>

                <div class="btn-tool btn-tool-rounded">
                    <button class="bg-image btn-bg-line" value="line"></button>
                    Фон в линейку
                </div>

                <div>
                    <input id="image-insert" type="file" accept="image/*" class="form-control">
                    <label for="image-insert" class="form-label m-0">
                        <div class="btn-tool">
                            <img class="btn-tool-item" src="assets/icons/add-icon.svg" alt="">
                            Добавить свой
                        </div>
                    </label>
                </div>
            </div>
            <div class="divider"></div>
            <div class="group-tools">
                <div class="btn-tool">
                    <a id="image-downloader" download="image.jpg" href="" class="btn-tool-item btn-download-image"></a>
                    Скачать картинку
                </div>

                <div class="btn-tool">
                    <button class="btn-uploader btn-tool-item" id="image-upload"></button>
                    Добавить в галерею
                </div>
            </div>
            <div class="divider"></div>
            <div class="group-tools">
                <div class="btn-tool">
                    <button class="btn-clear btn-tool-item" id="canvas-clear"></button>
                    Очистить холст
                </div>
            </div>

        </div>
    </div>
    <div class="row mb-2">
        <div class="col">
            <canvas id="canvas" width="1272" height="600" class="border rounded"></canvas>
        </div>
    </div>
    <div class="row">
        <div class="col" id="images-container">
        <?php if(count($images) > 0): ?>
            <?php foreach ($images as $image): ?>
                <img src="<?php echo $image?>" class="border rounded">
            <?php endforeach; ?>
        <?php else: ?>
            <p id="no-images">В галерее нет картинок</p>
        <?php endif; ?>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col text-secondary">
            Created by Ivan Plotnikov
        </div>
    </div>
</div>

<script type="text/javascript" src="script.js"></script>

</body>
</html>