<?php

if (!empty($_POST)) {
    $encodedData = explode(",", $_POST['image']);
    $encodedData = str_replace(' ', '+', $encodedData[1]);
    $decocedData = base64_decode($encodedData);
    $imageName = time() . '.jpg';
    $NewFileName = __DIR__ . '/' . $imageName;
    file_put_contents($NewFileName, $decocedData);

    echo json_encode(['image' => $imageName]);
}
