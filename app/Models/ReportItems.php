<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportItems extends Model
{
    /** @use HasFactory<\Database\Factories\ReportItemsFactory> */
    use HasFactory;

    protected $fillable = [
        'url',
        'siteName',
    ];

    public function Report(){
        return $this->belongsTo(Report::class);
    }

    public function User(){
        return $this->belongsTo(User::class);
    }
}
