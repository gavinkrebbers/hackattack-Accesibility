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
        'siteName',
    ];


    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function ReportItem()
    {
        return $this->hasMany(ReportItems::class);
    }
}
