<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Dashboard') · {{ config('app.name', 'KVI') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700&display=swap" rel="stylesheet" />
    <style>
        :root {
            color-scheme: light;
            --bg: #f6f7fb;
            --surface: #ffffff;
            --text: #1f2933;
            --muted: #5f6c7b;
            --accent: #0f766e;
            --accent-strong: #0b5d58;
            --border: #e2e8f0;
            --warning: #b45309;
            --success: #0f766e;
            --danger: #b91c1c;
            --shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Manrope", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text);
            background: radial-gradient(1100px 600px at 10% -10%, #e0f2fe 0%, rgba(224, 242, 254, 0) 60%),
                radial-gradient(900px 500px at 90% 0%, #fef3c7 0%, rgba(254, 243, 199, 0) 55%),
                var(--bg);
        }

        .shell {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .site-header {
            position: sticky;
            top: 0;
            z-index: 20;
            background: rgba(255, 255, 255, 0.86);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
        }

        .site-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 18px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .brand {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .brand-link {
            color: var(--text);
            text-decoration: none;
            font-weight: 700;
            font-size: 18px;
            letter-spacing: 0.02em;
        }

        .brand-subtitle {
            color: var(--muted);
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
        }

        .nav {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .nav-link {
            padding: 8px 14px;
            border-radius: 999px;
            text-decoration: none;
            color: var(--text);
            border: 1px solid transparent;
            font-weight: 600;
            font-size: 13px;
        }

        .nav-link.active {
            background: rgba(15, 118, 110, 0.12);
            border-color: rgba(15, 118, 110, 0.3);
            color: var(--accent-strong);
        }

        .nav-button {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text);
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 12px;
            cursor: pointer;
            font-weight: 600;
        }

        .content {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 28px 28px 64px;
        }

        .breadcrumb {
            margin-bottom: 12px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--muted);
        }

        .breadcrumb a {
            color: var(--muted);
            text-decoration: none;
        }

        .page-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 18px;
        }

        .page-title {
            font-size: 28px;
            margin: 0;
        }

        .page-desc {
            color: var(--muted);
            margin: 6px 0 0;
        }

        .page-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        .card {
            background: var(--surface);
            border-radius: 16px;
            padding: 22px;
            border: 1px solid rgba(15, 23, 42, 0.06);
            box-shadow: var(--shadow);
        }

        .stack {
            display: grid;
            gap: 16px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
            gap: 16px;
        }

        .stat-card {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .stat-label {
            color: var(--muted);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.12em;
        }

        .stat-value {
            font-size: 28px;
            font-weight: 700;
        }

        .card-title {
            margin: 0 0 12px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: var(--muted);
            font-weight: 600;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        .table th,
        .table td {
            padding: 14px 16px;
            border-bottom: 1px solid var(--border);
            text-align: left;
        }

        .table th {
            background: #f8fafc;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 11px;
        }

        .table tbody tr:hover {
            background: #f8fafc;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .badge-pending {
            background: #ffedd5;
            color: var(--warning);
        }

        .badge-approved {
            background: #dcfce7;
            color: var(--success);
        }

        .badge-rejected {
            background: #fee2e2;
            color: var(--danger);
        }

        .badge-draft {
            background: #e2e8f0;
            color: #475569;
        }

        .badge-published {
            background: #dcfce7;
            color: var(--success);
        }

        .badge-featured {
            background: rgba(15, 118, 110, 0.12);
            color: var(--accent-strong);
        }

        .detail-grid {
            display: grid;
            grid-template-columns: 180px 1fr;
            gap: 12px 24px;
        }

        .label {
            color: var(--muted);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.08em;
        }

        .note {
            color: var(--muted);
            font-size: 13px;
        }

        .pagination {
            margin-top: 16px;
        }

        .adm-pager {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px;
            margin-top: 16px;
        }

        .adm-pager a,
        .adm-pager span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 34px;
            height: 34px;
            padding: 0 10px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 13px;
            line-height: 1;
            color: var(--text);
            text-decoration: none;
            background: #fff;
        }

        .adm-pager a:hover {
            border-color: var(--accent);
            color: var(--accent);
        }

        .adm-pager .active {
            background: var(--accent);
            border-color: var(--accent);
            color: #fff;
            font-weight: 700;
        }

        .adm-pager .disabled {
            color: #cbd5e1;
            background: #f8fafc;
            cursor: default;
        }

        label {
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
            margin-bottom: 6px;
        }

        input,
        textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border);
            border-radius: 10px;
            font-size: 14px;
            background: #fff;
        }

        input[type="checkbox"] {
            width: auto;
            padding: 0;
            margin: 0;
        }

        input[type="file"] {
            padding: 6px;
        }

        textarea {
            min-height: 90px;
            resize: vertical;
        }

        .form-grid {
            display: grid;
            gap: 16px;
        }

        .filter-row {
            display: grid;
            grid-template-columns: 1fr 180px auto;
            gap: 12px;
            align-items: end;
        }

        .select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border);
            border-radius: 10px;
            font-size: 14px;
            background: #fff;
        }

        .thumb {
            width: 64px;
            height: 42px;
            border-radius: 8px;
            object-fit: cover;
            background: #e2e8f0;
            border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .thumb-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .button-row {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .actions {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 12px;
            border-radius: 8px;
        }

        .checkbox-row {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: var(--text);
            text-transform: none;
            letter-spacing: 0;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            padding: 10px 16px;
            font-weight: 700;
            border: 1px solid transparent;
            background: var(--accent);
            color: #fff;
            text-decoration: none;
            cursor: pointer;
        }

        .btn-outline {
            background: transparent;
            color: var(--text);
            border-color: var(--border);
        }

        .btn-ghost {
            background: rgba(15, 118, 110, 0.12);
            color: var(--accent-strong);
            border-color: rgba(15, 118, 110, 0.2);
        }

        .btn-danger {
            background: var(--danger);
        }

        .link-danger {
            color: var(--danger);
            background: transparent;
            border: none;
            font-weight: 700;
            cursor: pointer;
            padding: 0;
        }

        .flash {
            margin-bottom: 16px;
            background: #e0f2fe;
            color: #075985;
            padding: 10px 12px;
            border-radius: 10px;
            font-size: 14px;
        }

        .alert {
            margin-bottom: 16px;
            background: #fee2e2;
            color: var(--danger);
            padding: 10px 12px;
            border-radius: 10px;
            font-size: 14px;
        }

        .animate-in {
            animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(6px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 900px) {
            .site-inner {
                flex-direction: column;
                align-items: flex-start;
            }

            .page-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .detail-grid {
                grid-template-columns: 1fr;
            }

            .button-row {
                justify-content: flex-start;
            }

            .filter-row {
                grid-template-columns: 1fr;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .animate-in {
                animation: none;
            }
        }
    </style>
</head>

<body>
    <div class="shell">
        <header class="site-header">
            <div class="site-inner">
                <div class="brand">
                    <a class="brand-link" href="{{ route('dashboard') }}">KVI Admin</a>
                    <span class="brand-subtitle">Membership Panel</span>
                </div>
                <nav class="nav">
                    <a class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}"
                        href="{{ route('dashboard') }}">Dashboard</a>
                    <a class="nav-link {{ request()->routeIs('admin.members.*') ? 'active' : '' }}"
                        href="{{ route('admin.members.index') }}">Registran</a>
                    <a class="nav-link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}"
                        href="{{ route('admin.users.index') }}">Admin Users</a>
                    <a class="nav-link {{ request()->routeIs('admin.cms.*') ? 'active' : '' }}"
                        href="{{ route('admin.cms.index') }}">CMS</a>
                    <a class="nav-link {{ request()->routeIs('admin.events.*') ? 'active' : '' }}"
                        href="{{ route('admin.events.index') }}">Acara</a>
                    <form method="post" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="nav-button">Logout</button>
                    </form>
                </nav>
            </div>
        </header>

        <main class="content">
            @hasSection('breadcrumb')
                <div class="breadcrumb">@yield('breadcrumb')</div>
            @endif

            <div class="page-header animate-in">
                <div>
                    <h1 class="page-title">@yield('heading')</h1>
                    @hasSection('description')
                        <p class="page-desc">@yield('description')</p>
                    @endif
                </div>
                @hasSection('actions')
                    <div class="page-actions">@yield('actions')</div>
                @endif
            </div>

            @if (session('status'))
                <div class="flash animate-in">{{ session('status') }}</div>
            @endif

            <div class="animate-in">
                @yield('content')
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        // Konfirmasi terpusat: form dengan atribut data-confirm akan menampilkan modal SweetAlert2.
        // Opsi tambahan: data-confirm-title, data-confirm-icon, data-confirm-yes.
        document.addEventListener('submit', function (e) {
            const form = e.target;
            if (!(form instanceof HTMLFormElement) || !form.hasAttribute('data-confirm')) {
                return;
            }

            // Fallback bila SweetAlert2 gagal dimuat (mis. CDN diblokir).
            if (typeof Swal === 'undefined') {
                if (!window.confirm(form.dataset.confirm)) {
                    e.preventDefault();
                }
                return;
            }

            e.preventDefault();
            Swal.fire({
                title: form.dataset.confirmTitle || 'Konfirmasi',
                text: form.dataset.confirm,
                icon: form.dataset.confirmIcon || 'warning',
                showCancelButton: true,
                confirmButtonText: form.dataset.confirmYes || 'Ya, lanjutkan',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#0f766e',
                cancelButtonColor: '#94a3b8',
                reverseButtons: true,
            }).then(function (result) {
                if (result.isConfirmed) {
                    form.submit(); // submit() programatik tidak memicu event ini lagi
                }
            });
        });
    </script>
</body>

</html>
