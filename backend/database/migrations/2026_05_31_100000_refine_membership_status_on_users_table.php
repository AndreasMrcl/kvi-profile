<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['diploma_verified_by']);
            $table->dropIndex(['diploma_verification_status']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'diploma_verification_status',
                'diploma_verified_at',
                'diploma_verified_by',
                'diploma_verification_notes',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('membership_number')->nullable()->unique()->after('graduation_year');
            $table->enum('membership_status', [
                'awaiting_diploma',
                'pending_verification',
                'active',
                'suspended',
                'rejected',
                'expired',
            ])->default('awaiting_diploma')->after('membership_number');
            $table->timestamp('diploma_deadline_at')->nullable()->after('diploma_number');
            $table->timestamp('joined_at')->nullable()->after('diploma_deadline_at');
            $table->foreignId('verified_by')
                ->nullable()
                ->after('joined_at')
                ->constrained('users')
                ->nullOnDelete();
            $table->text('verification_notes')->nullable()->after('verified_by');

            $table->index('membership_status');
        });

        DB::table('users')->where('is_admin', false)->update([
            'membership_status' => DB::raw("CASE WHEN diploma_number IS NULL OR diploma_number = '' THEN 'awaiting_diploma' ELSE 'pending_verification' END"),
        ]);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['verified_by']);
            $table->dropIndex(['membership_status']);
            $table->dropUnique(['membership_number']);

            $table->dropColumn([
                'membership_number',
                'membership_status',
                'diploma_deadline_at',
                'joined_at',
                'verified_by',
                'verification_notes',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->enum('diploma_verification_status', ['pending', 'verified', 'rejected'])
                ->default('pending');
            $table->timestamp('diploma_verified_at')->nullable();
            $table->foreignId('diploma_verified_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->text('diploma_verification_notes')->nullable();

            $table->index('diploma_verification_status');
        });
    }
};
