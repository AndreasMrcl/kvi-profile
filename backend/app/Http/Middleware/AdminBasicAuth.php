<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminBasicAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $expectedUser = (string) config('admin.username');
        $expectedPass = (string) config('admin.password');
        $user = (string) $request->getUser();
        $pass = (string) $request->getPassword();

        $isValid = $expectedUser !== ''
            && $expectedPass !== ''
            && $user !== ''
            && $pass !== ''
            && hash_equals($expectedUser, $user)
            && hash_equals($expectedPass, $pass);

        if (!$isValid) {
            return response('Unauthorized', 401, ['WWW-Authenticate' => 'Basic']);
        }

        return $next($request);
    }
}
