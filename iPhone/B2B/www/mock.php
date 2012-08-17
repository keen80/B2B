<?php 

$STATUS_OK = array('code'=>true, 'msg'=>'Status OK');
$STATUS_KO = array('code'=>false, 'msg'=>'Status KO');

$NOTIFICATION_OK = array('code'=>'OK', 'msg'=>'Notification OK');
$NOTIFICATION_KO = array('code'=>'KO', 'msg'=>'Notification KO');

$BODY = "Test Body";

if ( 
	isset($_GET['findUsers']) &&
	!empty($_GET['username'])
){
	$BODY = array(array(
		'username'=>'DM85',
		//'birthDate' => '25/12/1980',
		'description'=>'TestSingle',
		'email'=>'asd@gmail.com',
		'firstName'=>'Alessio',
		'lastName'=>'Della Motta',
		'address' => 'via Emilia, 183 Bologna',
		//'activatedOn' =>"25-06-1980",
		'idUser'=>'50073be62318689565ffa4e2',
		'pwdHash'=>'e20d7798a5440b23378133454f0bdae699f2f23e',
		'role' => 0,
		'status' =>  1
	));

	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_OK,
			'notification'=>$NOTIFICATION_OK,
			'body'=>$BODY
		)
	));

} else if ( 
	isset($_GET['findUsers']) && (
		!empty($_GET['firstName']) ||
		!empty($_GET['lastName'])
	)
){
	$BODY = array(
		array(
			'username'=>'DM85',
			//'birthDate' => '25/12/1980',
			'description'=> 'test1',
			'email'=>'asd@gmail.com',
			'firstName'=>'Alessio',
			'lastName'=>'Della Motta',
			'address' => 'via Emilia, 183 Bologna',
			//'activatedOn' => "25-06-1980",
			'idUser'=>'50073be62318689565ffa4e2',
			'pwdHash'=>'e20d7798a5440b23378133454f0bdae699f2f23e',
			'role' => 0,
			'status' =>  1
		),
		array(
			'username'=>'DM85',
			//'birthDate' => '25-12-1980',
			'description'=> 'test2',
			'email'=>'asd@gmail.com',
			'firstName'=>'Alessio',
			'lastName'=>'Della Motta',
			'address' => 'via Emilia, 183 Bologna',
			//'activatedOn' =>"25/06/1980",
			'idUser'=>'50073be62318689565ffa4e2',
			'pwdHash'=>'e20d7798a5440b23378133454f0bdae699f2f23e',
			'role' => 0,
			'status' =>  1
		)
	);

	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_OK,
			'notification'=>$NOTIFICATION_OK,
			'body'=>$BODY
		)
	));


} else if ( 
	isset($_GET['test'])
){
	$BODY = "caso 2";
	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_OK,
			'notification'=>$NOTIFICATION_OK,
			'body'=>$BODY
		)
	));

}else {
	$BODY = "Null or Bad Parameters supplied";
	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_KO,
			'notification'=>$NOTIFICATION_KO,
			'body'=>$BODY
		)
	));
}

/* POST MOCK */
/*

POST insertBeer
btUsername: alessio
btSid: 51f8467c-e2ee-44da-ac74-4ddc178d099c

{
"name":"beer2",
"desc":"desc beer 2",
"category": "cat3",
"type": "cat4",
"nationality":"Spain",
"picture": null
}

*/

/*
if ( 
	isset($_POST['insertBeer']) &&
	!empty($_POST['name']) &&
	!empty($_POST['category'])
){
	$BODY = array(array(
		'name'=>'Corona',
		'desc' => 'Wonderful Beer',
		'category'=>'Blonde',
		'type'=>'Pilsen',
		'nationality'=>'Spain',
		'idBeer'=>'50073be62318689565ffa4e2'
	));

	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_OK,
			'notification'=>$NOTIFICATION_OK,
			'body'=>$BODY
		)
	));

} else if ( 
	isset($_POST['insertBeer']) &&
	!empty($_POST['name']) &&
	!empty($_POST['category'])
){
	$BODY = array(array(
		'name'=>'Corona',
		'desc' => 'Wonderful Beer',
		'category'=>'Blonde',
		'type'=>'Pilsen',
		'nationality'=>'Spain',
		'idBeer'=>''
	));

	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_OK,
			'notification'=>$NOTIFICATION_KO,
			'body'=>$BODY
		)
	));


} else if ( 
	isset($_POST['test'])
){
	$BODY = "caso 2";
	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_OK,
			'notification'=>$NOTIFICATION_OK,
			'body'=>$BODY
		)
	));

}else {
	$BODY = "Null or Bad Parameters supplied";
	echo json_encode(array(
		'response'=>array(
			'status'=>$STATUS_ERROR,
			'notification'=>$NOTIFICATION_ERROR,
			'body'=>$BODY
		)
	));
}*/

?> 