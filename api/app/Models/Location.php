<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model {

    protected $table    = 'locations';
    protected $fillable = [
        'lat',
        'lan',
        'address',
        'city',
        'country',
        'type',
        'region',
        'related'
    ];

}