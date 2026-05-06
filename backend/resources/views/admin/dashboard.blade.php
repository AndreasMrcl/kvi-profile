@extends('layouts.admin')

@section('title', 'Dashboard')
@section('heading', 'Dashboard')
@section('description', 'Overview of membership activity and admin access.')
@section('actions')
    <a class="btn btn-outline" href="{{ route('admin.memberships.index') }}">Open Memberships</a>
    <a class="btn btn-ghost" href="{{ route('admin.cms.index') }}">Open CMS</a>
@endsection

@section('content')
    <div class="stack">
        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-label">Total Memberships</div>
                <div class="stat-value">{{ $memberships_total }}</div>
                <div class="note">All submissions</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Pending</div>
                <div class="stat-value">{{ $memberships_pending }}</div>
                <div class="note">Awaiting verification</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Approved</div>
                <div class="stat-value">{{ $memberships_approved }}</div>
                <div class="note">Verified and approved</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Rejected</div>
                <div class="stat-value">{{ $memberships_rejected }}</div>
                <div class="note">Did not pass checks</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Admin Users</div>
                <div class="stat-value">{{ $admin_users }}</div>
                <div class="note">Active admins</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Total Articles</div>
                <div class="stat-value">{{ $articles_total }}</div>
                <div class="note">CMS entries</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Published</div>
                <div class="stat-value">{{ $articles_published }}</div>
                <div class="note">Visible to public</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Drafts</div>
                <div class="stat-value">{{ $articles_draft }}</div>
                <div class="note">Needs review</div>
            </div>
        </div>

        <div class="card">
            <p class="card-title">Latest Submissions</p>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($latest_memberships as $membership)
                        <tr>
                            <td>#{{ $membership->id }}</td>
                            <td>{{ $membership->full_name }}</td>
                            <td>{{ $membership->email }}</td>
                            <td>
                                <span
                                    class="badge badge-{{ $membership->status }}">{{ ucfirst($membership->status) }}</span>
                            </td>
                            <td>{{ optional($membership->created_at)->format('d M Y H:i') }}</td>
                            <td><a href="{{ route('admin.memberships.show', $membership) }}">View</a></td>
                        </tr>
                    @empty
                        <tr>
                            <td class="note" colspan="6">No submissions yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="card">
            <p class="card-title">Latest Articles</p>
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Updated</th>
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
                            <td><a href="{{ route('admin.cms.edit', $article) }}">Edit</a></td>
                        </tr>
                    @empty
                        <tr>
                            <td class="note" colspan="4">No articles yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
