<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /** @use HasFactory<\Database\Factories\ReportFactory> */
    use HasFactory;

    protected $fillable = [
        'url',
        'user_id',
        'score',
        'report',
    ];


    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function reportContainer()
    {
        return $this->belongsTo(ReportContainer::class);
    }
}
