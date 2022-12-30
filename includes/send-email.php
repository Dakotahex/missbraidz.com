<?php

// function IsInjected($str)
// {
//   $injections = array('(\n+)',
//   '(\r+)',
//   '(\t+)',
//   '(%0A+)',
//   '(%0D+)',
//   '(%08+)',
//   '(%09+)'
//            );

//            $inject = join('|', $injections);
//            $inject = "/$inject/i";

//            if(preg_match($inject,$str))
//            {
//              return true;
//             }
//     else
//     {
//       return false;
//     }
//   }

  function sendEmail($firstName, $lastName, $email, $message)
  {
    // if(IsInjected($email))
    // {
    //   echo "Bad email value!";
    //   exit;
    // }

    $email_from = $email;
    $email_subject = "New enquiry from {$firstName} {$lastName}";
    $email_body = "You have received a new message from {$firstName} {$lastName}.\n".
    "Here is the message:\n {$message}";


    $to = "enquiries@missbraidz.com, dakota.colborne@gmail.com";
    $headers = "From: $email \r\n";
    $headers .= "Reply-To: $email \r\n";

    if(mail($to, $email_subject, $email_body, $headers))
    {
      echo "email sent!";
    }
  }

  ?>