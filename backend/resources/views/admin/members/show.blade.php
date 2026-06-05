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

    $status = $member->membership_status ?: User::STATUS_AWAITING_DIPLOMA;
    $badge = $statusBadge[$status] ?? 'badge-pending';
    $statusLabel = User::statusLabel($status);
    $hasDiploma = !empty($member->diploma_number);
@endphp

@section('title', 'Anggota: ' . $member->name)
@section('breadcrumb')
    <a href="{{ route('admin.members.index') }}">Kembali ke daftar</a>
@endsection
@section('heading', $member->name)
@section('description', 'Detail data anggota & aksi keanggotaan.')

@section('content')
    @if ($errors->any())
        <div class="alert">{{ $errors->first() }}</div>
    @endif

    <div class="card stack">
        <div class="detail-grid">
            <div class="label">No. Anggota</div>
            <div>
                @if ($member->membership_number)
                    <strong style="font-size: 18px;">{{ $member->membership_number }}</strong>
                @else
                    <span class="note">Belum diterbitkan</span>
                @endif
            </div>

            <div class="label">Status Keanggotaan</div>
            <div>
                <span class="badge {{ $badge }}">{{ $statusLabel }}</span>
                @if ($status === User::STATUS_AWAITING_DIPLOMA && $member->diploma_deadline_at)
                    <div class="note">Akan expired pada {{ $member->diploma_deadline_at->format('d M Y H:i') }}</div>
                @endif
            </div>

            <div class="label">Kategori</div>
            <div>{{ User::categoryLabel($member->category) }}</div>

            <div class="label">Email</div>
            <div>{{ $member->email }}</div>

            <div class="label">Telepon</div>
            <div>{{ $member->phone ?: '-' }}</div>

            <div class="label">Tempat / Tgl Lahir</div>
            <div>
                {{ $member->birth_place ?: '-' }}
                @if ($member->birth_date)
                    , {{ $member->birth_date->format('d M Y') }}
                @endif
            </div>

            <div class="label">Pekerjaan</div>
            <div>{{ $member->occupation ?: '-' }}</div>

            <div class="label">Universitas</div>
            <div>{{ $member->university ?: '-' }} ({{ $member->graduation_year ?: '-' }})</div>

            <div class="label">Provinsi</div>
            <div>{{ $member->province_name ?: '-' }}</div>

            <div class="label">Kota/Kabupaten</div>
            <div>{{ $member->regency_name ?: '-' }}</div>

            <div class="label">Kecamatan</div>
            <div>{{ $member->district_name ?: '-' }}</div>

            <div class="label">Kode Pos</div>
            <div>{{ $member->postal_code ?: '-' }}</div>

            <div class="label">Alamat Lengkap</div>
            <div>{{ $member->address ?: '-' }}</div>

            <div class="label">Terdaftar</div>
            <div>{{ optional($member->created_at)->format('d M Y H:i') }}</div>

            @if ($member->joined_at)
                <div class="label">Disahkan</div>
                <div>
                    {{ $member->joined_at->format('d M Y H:i') }}
                    @if ($member->verifier)
                        <div class="note">oleh {{ $member->verifier->name }}</div>
                    @endif
                </div>
            @endif
        </div>
    </div>

    <div class="card stack" style="margin-top: 16px;">
        <p class="card-title">Verifikasi Ijazah</p>

        <div class="detail-grid">
            <div class="label">No. Ijazah</div>
            <div>
                @if ($hasDiploma)
                    <strong>{{ $member->diploma_number }}</strong>
                @else
                    <span class="note">Belum diisi</span>
                @endif
            </div>

            <div class="label">Catatan Admin</div>
            <div>{{ $member->verification_notes ?: '-' }}</div>
        </div>
    </div>

    @if (in_array($status, [User::STATUS_PENDING_VERIFICATION, User::STATUS_EXPIRED]) && $hasDiploma)
        <div class="card stack" style="margin-top: 16px;">
            <p class="card-title">Aksi Verifikasi</p>

            <form class="form-grid" method="post" action="{{ route('admin.members.approve', $member) }}"
                  data-confirm="Sahkan keanggotaan ini? Nomor anggota akan diterbitkan otomatis." data-confirm-icon="question" data-confirm-yes="Ya, sahkan">
                @csrf
                <div>
                    <label for="approve-notes">Catatan (opsional)</label>
                    <textarea id="approve-notes" name="verification_notes"
                              placeholder="Misal: sudah cek di portal universitas..."></textarea>
                    <div class="note">
                        Menyahkan keanggotaan akan menerbitkan nomor anggota baru otomatis sesuai kategori.
                    </div>
                </div>
                <div class="button-row">
                    <button type="submit" class="btn">Sahkan Keanggotaan</button>
                </div>
            </form>

            <form class="form-grid" method="post" action="{{ route('admin.members.reject', $member) }}"
                  data-confirm="Tolak keanggotaan ini?" data-confirm-yes="Ya, tolak">
                @csrf
                <div>
                    <label for="reject-notes">Alasan Penolakan</label>
                    <textarea id="reject-notes" name="verification_notes"
                              placeholder="Alasan keanggotaan ditolak..." required></textarea>
                </div>
                <div class="button-row">
                    <button type="submit" class="btn btn-danger">Tolak Keanggotaan</button>
                </div>
            </form>
        </div>
    @endif

    @if ($status === User::STATUS_ACTIVE)
        <div class="card stack" style="margin-top: 16px;">
            <p class="card-title">Suspend Anggota</p>
            <form class="form-grid" method="post" action="{{ route('admin.members.suspend', $member) }}"
                  data-confirm="Suspend anggota ini?" data-confirm-yes="Ya, suspend">
                @csrf
                <div>
                    <label for="suspend-notes">Alasan Suspend</label>
                    <textarea id="suspend-notes" name="verification_notes"
                              placeholder="Misal: pelanggaran kode etik..." required></textarea>
                </div>
                <div class="button-row">
                    <button type="submit" class="btn btn-danger">Suspend</button>
                </div>
            </form>
        </div>
    @endif

    @if ($status === User::STATUS_SUSPENDED)
        <div class="card stack" style="margin-top: 16px;">
            <p class="card-title">Aktifkan Kembali</p>
            <form method="post" action="{{ route('admin.members.reactivate', $member) }}"
                  data-confirm="Aktifkan kembali anggota ini?" data-confirm-icon="question" data-confirm-yes="Ya, aktifkan">
                @csrf
                <div class="button-row">
                    <button type="submit" class="btn">Aktifkan Kembali</button>
                </div>
            </form>
        </div>
    @endif

    @if ($status === User::STATUS_AWAITING_DIPLOMA)
        <div class="card stack" style="margin-top: 16px;">
            <p class="note">
                Anggota belum mengisi nomor ijazah. Verifikasi baru bisa dilakukan setelah anggota
                melengkapi data di portal profil.
            </p>
        </div>
    @endif

    <div class="card stack" style="margin-top: 16px;">
        <p class="card-title">Hapus Anggota</p>
        <p class="note">
            Menghapus akan menghilangkan data anggota ini secara permanen dan tidak bisa dibatalkan.
        </p>
        <form method="post" action="{{ route('admin.members.destroy', $member) }}"
              data-confirm="Hapus anggota ini secara permanen? Tindakan ini tidak bisa dibatalkan." data-confirm-yes="Ya, hapus">
            @csrf
            @method('DELETE')
            <div class="button-row">
                <button type="submit" class="btn btn-danger">Hapus Anggota</button>
            </div>
        </form>
    </div>
@endsection
