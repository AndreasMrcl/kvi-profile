@extends('layouts.admin')

@php
    use App\Models\User;

    $statusBadge = [
        User::STATUS_AWAITING_DIPLOMA => 'badge-pending',
        User::STATUS_PENDING_VERIFICATION => 'badge-pending',
        User::STATUS_ACTIVE => 'badge-approved',
        User::STATUS_SUSPENDED => 'badge-rejected',
        User::STATUS_REJECTED => 'badge-rejected',
        User::STATUS_EXPIRED => 'badge-draft',
    ];
@endphp

@section('title', 'Registran')
@section('heading', 'Registran Terdaftar')
@section('description', 'Daftar dokter hewan & paramedis veteriner yang terdaftar di KVI.')

@section('content')
    <div class="card" style="margin-bottom: 16px;">
        <form method="get" action="{{ route('admin.members.index') }}" class="form-grid"
              style="grid-template-columns: 1fr 200px 220px 220px auto; align-items: end;">
            <div>
                <label for="q">Pencarian</label>
                <input id="q" type="text" name="q" value="{{ $filters['q'] }}"
                       placeholder="Nama, email, no. ijazah, atau no. registran">
            </div>
            <div>
                <label for="category">Kategori</label>
                <select id="category" name="category" class="select">
                    <option value="">Semua</option>
                    <option value="{{ User::CATEGORY_DOKTER_HEWAN }}"
                            {{ $filters['category'] === User::CATEGORY_DOKTER_HEWAN ? 'selected' : '' }}>
                        Dokter Hewan
                    </option>
                    <option value="{{ User::CATEGORY_PARAMEDIS }}"
                            {{ $filters['category'] === User::CATEGORY_PARAMEDIS ? 'selected' : '' }}>
                        Paramedis Veteriner
                    </option>
                </select>
            </div>
            <div>
                <label for="membership_status">Status Registran</label>
                <select id="membership_status" name="membership_status" class="select">
                    <option value="">Semua</option>
                    @foreach ($statuses as $status)
                        <option value="{{ $status }}"
                                {{ $filters['membership_status'] === $status ? 'selected' : '' }}>
                            {{ User::statusLabel($status) }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for="province_code">Provinsi</label>
                <select id="province_code" name="province_code" class="select">
                    <option value="">Semua provinsi</option>
                    @foreach ($provinces as $province)
                        <option value="{{ $province->province_code }}"
                                {{ $filters['province_code'] === $province->province_code ? 'selected' : '' }}>
                            {{ $province->province_name }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="button-row" style="justify-content: flex-start;">
                <button type="submit" class="btn">Filter</button>
                <a href="{{ route('admin.members.index') }}" class="btn btn-outline">Reset</a>
            </div>
        </form>
    </div>

    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th>No. Registran</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Kategori</th>
                    <th>Lokasi</th>
                    <th>Status</th>
                    <th>Terdaftar</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($members as $member)
                    @php
                        $status = $member->membership_status ?: User::STATUS_AWAITING_DIPLOMA;
                        $badge = $statusBadge[$status] ?? 'badge-pending';
                    @endphp
                    <tr>
                        <td>
                            @if ($member->membership_number)
                                <strong>{{ $member->membership_number }}</strong>
                            @else
                                <span class="note">-</span>
                            @endif
                        </td>
                        <td>{{ $member->name }}</td>
                        <td>{{ $member->email }}</td>
                        <td>{{ User::categoryLabel($member->category) }}</td>
                        <td>
                            {{ $member->regency_name ?: '-' }}
                            @if ($member->province_name)
                                <div class="note">{{ $member->province_name }}</div>
                            @endif
                        </td>
                        <td>
                            <span class="badge {{ $badge }}">{{ User::statusLabel($status) }}</span>
                            @if ($status === User::STATUS_AWAITING_DIPLOMA && $member->diploma_deadline_at)
                                <div class="note">
                                    Expire {{ $member->diploma_deadline_at->format('d M Y') }}
                                </div>
                            @endif
                        </td>
                        <td>{{ optional($member->created_at)->format('d M Y') }}</td>
                        <td>
                            <div class="actions">
                                <a href="{{ route('admin.members.show', $member) }}" class="btn btn-outline btn-sm">Detail</a>
                                <form method="post" action="{{ route('admin.members.destroy', $member) }}"
                                      data-confirm="Hapus registran ini secara permanen? Tindakan ini tidak bisa dibatalkan."
                                      data-confirm-icon="warning" data-confirm-yes="Ya, hapus">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="note" colspan="8">Tidak ada registran yang cocok dengan filter.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="pagination">
        {{ $members->links() }}
    </div>
@endsection
