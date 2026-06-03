<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public const CATEGORY_DOKTER_HEWAN = 'dokter_hewan';
    public const CATEGORY_PARAMEDIS = 'paramedis_veteriner';

    public const STATUS_AWAITING_DIPLOMA = 'awaiting_diploma';
    public const STATUS_PENDING_VERIFICATION = 'pending_verification';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_SUSPENDED = 'suspended';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_EXPIRED = 'expired';

    public const DIPLOMA_DEADLINE_DAYS = 7;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'birth_place',
        'birth_date',
        'address',
        'occupation',
        'phone',
        'university',
        'graduation_year',
        'category',
        'province_code',
        'province_name',
        'regency_code',
        'regency_name',
        'district_code',
        'district_name',
        'postal_code',
        'diploma_number',
        'diploma_deadline_at',
        'membership_number',
        'membership_status',
        'joined_at',
        'verified_by',
        'verification_notes',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'birth_date' => 'date',
            'diploma_deadline_at' => 'datetime',
            'joined_at' => 'datetime',
        ];
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public static function categoryCode(?string $category): ?string
    {
        return match ($category) {
            self::CATEGORY_DOKTER_HEWAN => 'DH',
            self::CATEGORY_PARAMEDIS => 'PV',
            default => null,
        };
    }

    public static function categoryLabel(?string $category): string
    {
        return match ($category) {
            self::CATEGORY_DOKTER_HEWAN => 'Dokter Hewan',
            self::CATEGORY_PARAMEDIS => 'Paramedis Veteriner',
            default => '-',
        };
    }

    public static function statusLabel(?string $status): string
    {
        return match ($status) {
            self::STATUS_AWAITING_DIPLOMA => 'Menunggu Input Ijazah',
            self::STATUS_PENDING_VERIFICATION => 'Menunggu Verifikasi',
            self::STATUS_ACTIVE => 'Anggota Aktif',
            self::STATUS_SUSPENDED => 'Suspended',
            self::STATUS_REJECTED => 'Ditolak',
            self::STATUS_EXPIRED => 'Expired',
            default => '-',
        };
    }

    public static function generateMembershipNumber(string $category): string
    {
        $code = self::categoryCode($category);
        if (!$code) {
            throw new \InvalidArgumentException("Kategori tidak valid: {$category}");
        }

        $prefix = "KVI-{$code}-";

        return DB::transaction(function () use ($prefix) {
            $lastNumber = self::query()
                ->whereNotNull('membership_number')
                ->where('membership_number', 'like', $prefix . '%')
                ->lockForUpdate()
                ->orderByDesc('membership_number')
                ->value('membership_number');

            $nextSeq = 1;
            if ($lastNumber) {
                $tail = substr($lastNumber, strlen($prefix));
                $nextSeq = ((int) $tail) + 1;
            }

            return $prefix . str_pad((string) $nextSeq, 5, '0', STR_PAD_LEFT);
        });
    }
}
