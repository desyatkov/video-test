export default function myStream(){
    return {
        restrict: 'A',
        scope:{config:'='},
        link: function(scope, element, attributes){
            //Element is whatever element this "directive" is on
            navigator.webkitGetUserMedia( {video:true},function (stream) {
                element.src = $window.URL.createObjectURL(stream);
                scope.config = {localvideo: element.src};
                scope.$apply(); //sometimes this can be unsafe.
            });
        }
    }

}
