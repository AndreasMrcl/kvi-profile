<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public const STATUS_DRAFT = 'draft';
    public const STATUS_PUBLISHED = 'published';

    protected $fillable = [
        'title',
        'location',
        'starts_at',
        'status',
    ];

    protected $casts = [
        'starts_at' => 'date',
    ];
}
