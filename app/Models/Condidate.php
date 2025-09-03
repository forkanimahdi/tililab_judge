<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Condidate extends Model
{
    //
    protected $fillable = [
        'name',
        'image',
        'gender',
    ];


    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'candidate_id');
    }
}
