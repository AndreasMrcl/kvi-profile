<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('category', ['dokter_hewan', 'paramedis_veteriner'])
                ->nullable()
                ->after('graduation_year');

            $table->string('province_code', 10)->nullable()->after('category');
            $table->string('province_name')->nullable()->after('province_code');
            $table->string('regency_code', 10)->nullable()->after('province_name');
            $table->string('regency_name')->nullable()->after('regency_code');
            $table->string('district_code', 10)->nullable()->after('regency_name');
            $table->string('district_name')->nullable()->after('district_code');
            $table->string('postal_code', 10)->nullable()->after('district_name');

            $table->string('diploma_number')->nullable()->after('postal_code');
            $table->enum('diploma_verification_status', ['pending', 'verified', 'rejected'])
                ->default('pending')
                ->after('diploma_number');
            $table->timestamp('diploma_verified_at')->nullable()->after('diploma_verification_status');
            $table->foreignId('diploma_verified_by')
                ->nullable()
                ->after('diploma_verified_at')
                ->constrained('users')
                ->nullOnDelete();
            $table->text('diploma_verification_notes')->nullable()->after('diploma_verified_by');

            $table->index(['category']);
            $table->index(['province_code']);
            $table->index(['regency_code']);
            $table->index(['district_code']);
            $table->index(['diploma_verification_status']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['diploma_verified_by']);
            $table->dropIndex(['category']);
            $table->dropIndex(['province_code']);
            $table->dropIndex(['regency_code']);
            $table->dropIndex(['district_code']);
            $table->dropIndex(['diploma_verification_status']);

            $table->dropColumn([
                'category',
                'province_code',
                'province_name',
                'regency_code',
                'regency_name',
                'district_code',
                'district_name',
                'postal_code',
                'diploma_number',
                'diploma_verification_status',
                'diploma_verified_at',
                'diploma_verified_by',
                'diploma_verification_notes',
            ]);
        });
    }
};
