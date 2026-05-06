<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'full_name',
        'birth_place',
        'birth_date',
        'address',
        'occupation',
        'phone',
        'email',
        'university',
        'graduation_year',
        'document_path',
        'document_original_name',
        'document_mime',
        'document_size',
        'status',
        'verified_at',
        'approved_at',
        'rejected_at',
        'verification_notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'verified_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];
}
