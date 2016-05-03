<?php
require dirname( __FILE__ ) . '/../vendor/autoload.php';

class PostParams extends Model
{
    /**
     * @param $id
     * @param $comment
     */
    public function postComment($id, $comment) {
        $comment = array(
            'video_id'  => $id,
            'comment'   => $comment,
            'date'      => $this->time_now()
        );
        $comments = $this->_db->comments();
        $addcomment = $comments->insert( $comment );
        return $addcomment;
    }

    private function time_now(){
        date_default_timezone_set('Asia/Jerusalem');
        $mysqltime = date ("Y-m-d H:i:s");
        return $mysqltime;
    }

    public function NewRating($video_id, $raiting){
        $video = $this->_db->video[$video_id];
        $data = array(
            'raiting'  => $raiting
        );
        $result = $video->update($data);
        return $result;
    }

}