<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class ExpireIncompleteMembers extends Command
{
    protected $signature = 'members:expire-incomplete';

    protected $description = 'Ubah status anggota yang belum input nomor ijazah dan sudah melewati deadline menjadi expired.';

    public function handle(): int
    {
        $affected = User::query()
            ->where('is_admin', false)
            ->where('membership_status', User::STATUS_AWAITING_DIPLOMA)
            ->whereNotNull('diploma_deadline_at')
            ->where('diploma_deadline_at', '<', Carbon::now())
            ->update([
                'membership_status' => User::STATUS_EXPIRED,
            ]);

        $this->info("Expired {$affected} pendaftaran yang tidak melengkapi nomor ijazah.");

        return self::SUCCESS;
    }
}
