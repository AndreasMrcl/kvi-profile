<?php

namespace Database\Seeders;

use App\Models\Membership;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MembershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $disk = Storage::disk('local');
        $filePath = 'memberships/sample-document.jpg';

        if (!$disk->exists($filePath)) {
            $jpegBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDBf/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAAB0mE0Gg//xAAZEAADAQEBAAAAAAAAAAAAAAABAhEAEjH/2gAIAQEAAT8AQmU+6sZ//8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oACAECAQE/AUo//8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oACAEDAQE/AUo//9k=';
            $disk->put($filePath, base64_decode($jpegBase64));
        }

        $size = $disk->size($filePath);

        Membership::updateOrCreate(
            ['email' => 'contoh.member@kvi.test'],
            [
                'full_name' => 'Contoh Member',
                'birth_place' => 'Jakarta',
                'birth_date' => '1990-05-20',
                'address' => 'Jl. Contoh No. 123, Jakarta',
                'occupation' => 'Konsultan',
                'phone' => '081234567890',
                'email' => 'contoh.member@kvi.test',
                'university' => 'Universitas Contoh',
                'graduation_year' => 2012,
                'document_path' => $filePath,
                'document_original_name' => 'contoh.jpg',
                'document_mime' => 'image/jpeg',
                'document_size' => $size,
                'status' => Membership::STATUS_PENDING,
            ]
        );
    }
}
