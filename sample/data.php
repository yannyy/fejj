<?php

$data = [];
for($i = 0; $i < 5; $i ++)
{
	$obj = new stdClass();
	$obj->name = 'name_'.$i;
	$obj->age = $i;

	$data[] = $obj;
}

echo json_encode($data);