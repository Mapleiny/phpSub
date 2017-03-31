<?php

include './config.php';

class PushServer{
    private $deviceToken;
    function __construct( $deviceToken ){
        this.$deviceToken = $deviceToken
    }

    function sendMessage($title,$content){
        $ctx = stream_context_create();
        stream_context_set_option($ctx, 'ssl', 'local_cert', 'SMSPush.pem');
        stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);
        stream_context_set_option($ctx, 'ssl', 'cafile', 'entrust_2048_ca.cer');

        // Open a connection to the APNS server
        $fp = stream_socket_client('ssl://gateway.sandbox.push.apple.com:2195', $err,$errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);

        if ($fp){
            $body = this.createPayload();
            $payload = json_encode($body);
            // Build the binary notification
            $msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
            $result = fwrite($fp, $msg, strlen($msg));

            fclose($fp);
        }else{
            
        }

    }

    function createPayload(){
        return array(
            'aps' => array(
                    'alert' => $message,
                    'sound' => 'default'
                )
            );
    }
}
?>