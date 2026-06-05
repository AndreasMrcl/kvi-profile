@extends('layouts.admin')

@php
    use App\Models\User;
@endphp

@section('title', 'Dashboard')
@section('heading', 'Dashboard')
@section('description', 'Ringkasan keanggotaan KVI & konten website.')
@section('actions')
    <a class="btn btn-outline" href="{{ route('admin.members.index') }}">Kelola Anggota</a>
    <a class="btn btn-ghost" href="{{ route('admin.cms.index') }}">Kelola Berita</a>
@endsection

@section('content')
    <div class="stack">
        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-label">Total Anggota</div>
                <div class="stat-value">{{ $members_total }}</div>
                <div class="note">Semua status</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Anggota Aktif</div>
                <div class="stat-value">{{ $members_active }}</div>
                <div class="note">Sudah disahkan</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Menunggu Verifikasi</div>
                <div class="stat-value">{{ $members_pending }}</div>
                <div class="note">Ijazah perlu dicek</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Menunggu Ijazah</div>
                <div class="stat-value">{{ $members_awaiting }}</div>
                <div class="note">Akan expire 7 hari</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Ditolak</div>
                <div class="stat-value">{{ $members_rejected }}</div>
                <div class="note">Tidak lolos verifikasi</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Expired</div>
                <div class="stat-value">{{ $members_expired }}</div>
                <div class="note">Tidak input ijazah</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Dokter Hewan</div>
                <div class="stat-value">{{ $members_dokter_hewan }}</div>
                <div class="note">Total kategori</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Paramedis Veteriner</div>
                <div class="stat-value">{{ $members_paramedis }}</div>
                <div class="note">Total kategori</div>
            </div>
        </div>

        <div class="card">
            <p class="card-title">Pendaftar Terbaru</p>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Kategori</th>
                        <th>Status</th>
                        <th>Terdaftar</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($latest_members as $member)
                        <tr>
                            <td>{{ $member->name }}</td>
                            <td>{{ $member->email }}</td>
                            <td>{{ User::categoryLabel($member->category) }}</td>
                            <td>{{ User::statusLabel($member->membership_status) }}</td>
                            <td>{{ optional($member->created_at)->format('d M Y H:i') }}</td>
                            <td><a href="{{ route('admin.members.show', $member) }}" class="btn btn-outline btn-sm">Detail</a></td>
                        </tr>
                    @empty
                        <tr>
                            <td class="note" colspan="6">Belum ada pendaftar.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="card">
            <p class="card-title">Berita Terbaru</p>
            <table class="table">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Diperbarui</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($latest_articles as $article)
                        <tr>
                            <td>{{ $article->title }}</td>
                            <td>
                                <span class="badge badge-{{ $article->status }}">{{ ucfirst($article->status) }}</span>
                            </td>
                            <td>{{ optional($article->updated_at)->format('d M Y H:i') }}</td>
                            <td><a href="{{ route('admin.cms.edit', $article) }}" class="btn btn-outline btn-sm">Edit</a></td>
                        </tr>
                    @empty
                        <tr>
                            <td class="note" colspan="4">Belum ada berita.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
