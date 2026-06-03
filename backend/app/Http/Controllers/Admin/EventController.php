<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class EventController extends Controller
{
    public function index(Request $request): View
    {
        $status = $request->string('status')->toString();
        $query = $request->string('q')->toString();

        $events = Event::query()
            ->when($status !== '', function ($builder) use ($status) {
                if (in_array($status, [Event::STATUS_DRAFT, Event::STATUS_PUBLISHED], true)) {
                    $builder->where('status', $status);
                }
            })
            ->when($query !== '', function ($builder) use ($query) {
                $builder->where(function ($inner) use ($query) {
                    $inner->where('title', 'like', '%' . $query . '%')
                        ->orWhere('location', 'like', '%' . $query . '%');
                });
            })
            ->orderByDesc('starts_at')
            ->paginate(20)
            ->withQueryString();

        return view('admin.events.index', [
            'events' => $events,
            'status' => $status,
            'query' => $query,
        ]);
    }

    public function create(): View
    {
        return view('admin.events.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $event = Event::create($this->validateEvent($request));

        return redirect()
            ->route('admin.events.edit', $event)
            ->with('status', 'Event created.');
    }

    public function edit(Event $event): View
    {
        return view('admin.events.edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $event->update($this->validateEvent($request));

        return redirect()
            ->route('admin.events.edit', $event)
            ->with('status', 'Event updated.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return redirect()
            ->route('admin.events.index')
            ->with('status', 'Event deleted.');
    }

    private function validateEvent(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'location' => ['nullable', 'string', 'max:200'],
            'starts_at' => ['required', 'date'],
            'status' => ['required', Rule::in([Event::STATUS_DRAFT, Event::STATUS_PUBLISHED])],
        ]);
    }
}
