<?php
require dirname( __FILE__ ) . '/vendor/autoload.php';
$app = new Slim\App();

//session_start();
//$app = new \Slim\Slim();

$getVideo = new GetVideo();
$postParams = new PostParams();

$app->get('/getVideo', function () use ($app, $getVideo) {
    sleep(1);
    echo json_encode($getVideo->getAllGenres());
});


$app->post('/postComment', function($request, $response, $args) use ($postParams){

    $id = $request->getParam('id');
    $comment = $request->getParam('comment');
    echo json_encode($postParams->postComment($id, $comment));
});

$app->post('/newRating', function($request, $response, $args) use ($postParams){
    $vid = $request->getParam('videoId');
    $newRating = $request->getParam('newRating');
    echo json_encode($postParams->NewRating($vid,$newRating));
});

$app->run();