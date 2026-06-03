<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class EventController extends Controller
{
    private const BULAN_SINGKAT = [
        1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
        5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Agu',
        9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des',
    ];

    /**
     * Acara mendatang yang sudah dipublikasikan (tanggal >= hari ini), urut terdekat.
     */
    public function index(): JsonResponse
    {
        $events = Event::query()
            ->where('status', Event::STATUS_PUBLISHED)
            ->whereDate('starts_at', '>=', Carbon::today())
            ->orderBy('starts_at')
            ->get();

        return response()->json([
            'data' => $events->map(fn (Event $event) => $this->payload($event))->all(),
        ]);
    }

    private function payload(Event $event): array
    {
        $date = $event->starts_at;

        return [
            'id' => $event->id,
            'tanggal' => $date ? sprintf('%02d', $date->day) : '',
            'bulan' => $date ? self::BULAN_SINGKAT[(int) $date->month] : '',
            'tahun' => $date ? (string) $date->year : '',
            'judul' => $event->title,
            'lokasi' => $event->location,
        ];
    }
}
