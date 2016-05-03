/** Created by sergeydesyatkov on 28/04/2016. */

import 'angular';
import 'angular-ui-router';
import 'bootstrap/dist/css/bootstrap.css';
import './../style/style.css';
import _ from 'lodash';
import config from './config/config.js';
import 'videogular';
import 'videogular-controls/vg-controls';
import 'videogular-overlay-play/vg-overlay-play';
import 'videogular-poster/vg-poster';
import 'videogular-buffering/vg-buffering';
import 'angular-sanitize/angular-sanitize';


angular.module('app',[ require('angular-ui-router') , "ngSanitize" ,"com.2fdevs.videogular",
                                                    "com.2fdevs.videogular.plugins.controls",
                                                    "com.2fdevs.videogular.plugins.overlayplay",
                                                    "com.2fdevs.videogular.plugins.poster"])
    .controller('HomeCtrl',
    ["$sce", '$http',  function ($sce, $http, $scope, $state) {
        var controller = this;
        controller.API = null;
        controller.textarea = false;
        controller.preloader = false;
        controller.buttAct = true;

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };
//--------------------------------------------------------------------------------------
        var urlBase = "./core/getVideo";
        var getVideo = function(urlBase) {
            return $http.get( urlBase );
        };

        var promiseVideo = getVideo(urlBase);

        promiseVideo.then(function(res){

            controller.videos = _.sortBy(res.data, 'raiting').reverse();

            controller.activeVideo  = {
                id: controller.videos[0].id,
                raiting: controller.videos[0].raiting,
                index: 0
            };


            function findObg(id){
                return _.find(controller.videos, function(o) { return o.id == id+1; });
            }
            //get url param

            controller.id = parseInt(window.location.href.split('/').slice(-1)[0])-1;
            if(!isNaN(controller.id)){
                controller.obj = findObg(controller.id);
                controller.temp = controller.obj.sources;
            }

//--------------------------------------------------------------------------------------


        controller.config = {
            buffering: true,
            preload: true,
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false,
            sources: controller.videos[0].sources,
            tracks: [
                {
                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                    kind: "subtitles",
                    srclang: "en",
                    label: "English",
                    default: ""
                }
            ],
            theme: "/source/node_modules/videogular-themes-default/videogular.css",
            plugins: {
                poster: controller.videos[0].sources[0].poster

            }
        };
            controller.preloader = true;
        });

        //set new active video
        controller.setVideo = function(index, id) {
            console.log(id);
            controller.activeVideo  = {
                id: id,
                raiting: controller.videos[index].raiting,
            };

            controller.API.stop();
            controller.config.sources = controller.videos[index].sources;
            controller.config.plugins.poster = controller.videos[index].sources[0].poster;
        };


        //changing Raiting
        controller.changeRaiting = function(index, $event){
            var ratingId = _.find(controller.videos, function(o) { return o.id == index; });

            console.log(controller.videos);


            ratingId.raiting = parseInt($event.target.id);
            controller.activeVideo.raiting =  parseInt($event.target.id);

            var videoId = ratingId.id;
            var newRating = parseInt($event.target.id);

            var r_parameter = JSON.stringify( {videoId:videoId, newRating:newRating} );
            $http.post('./core/newRating', r_parameter).
            success(function(data) {
                console.log('ok',data);
            }).
            error(function(data) {
                console.log('error',data);
            });
        };

        //this.valComment
        controller.saveComment = function(){
            controller.buttAct = false;
            controller.textarea = true;
            var comment = controller.valComment;
            var id = controller.activeVideo.id;
            console.log(id);
            if( comment != ''|| comment != undefined){
                var parameter = JSON.stringify( {id:id, comment:comment} );

                $http.post('./core/postComment', parameter).
                success(function(data) {
                    console.log('ok',data);
                    if(data.id != undefined ){
                        controller.valComment = '';
                    }
                    controller.textarea = false;
                    controller.buttAct = true;
                }).
                error(function(data) {
                    console.log('error',data);
                });
            }
        };


    }]
)
.config(config);
