<?php
require dirname( __FILE__ ) . '/../vendor/autoload.php';

class GetVideo extends Model
{
    public function getAllGenres() {
        $fetch = array();
        $videos = $this->_db->video();
        foreach ($videos as $video) {
            $fetch[] = array(
                'id' => (int)$video['id'],
                'fullName' => $video['fullName'],
                'descript' => $video['descript'],
                'raiting' => (int)$video['raiting'],
                'duration' => $video['duration'],
                'sources' => $this->getSources($video['id']),
                'comments' => $this->getComments($video['id'])
            );
        }
        return $fetch;
    }

    private function getSources( $id ){
        $fetch = array();
        $videos_s = $this->_db->sources->where('video_id', $id);
        foreach ($videos_s as $video) {
            $fetch[] = array(
                'src' =>    $video['src'],
                'type' =>   $video['type'],
                'poster' => $video['poster'],
            );
        }
        return $fetch;
    }

    private function getComments( $id ){
        $fetch = array();
        $comments = $this->_db->comments->where('video_id', $id);
        foreach ($comments as $comment) {
            $fetch[] = array(
                'comment' =>    $comment['comment'],
                'date' =>   date("m.d.Y",strtotime($comment['date']))
            );
        }
        return $fetch;
    }
}