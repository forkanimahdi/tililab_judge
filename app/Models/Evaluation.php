<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    //


    protected $fillable = [
        'candidate_id',
        'user_id',
        'motivation',
        'implication',
        'originalite',
        'communication',
        'decision'
    ];

    public function candidate()
    {
        return $this->belongsTo(Condidate::class, 'candidate_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalAttribute()
    {
        return $this->motivation + $this->implication + $this->originalite + $this->communication;
    }
}
