<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMembershipRequest;
use App\Http\Resources\MembershipResource;
use App\Models\Membership;

class MembershipController extends Controller
{
    public function store(StoreMembershipRequest $request): MembershipResource
    {
        $document = $request->file('document');
        $storedPath = $document->store('memberships', 'local');

        $data = $request->safe()->except(['document']);

        $membership = Membership::create(array_merge($data, [
            'document_path' => $storedPath,
            'document_original_name' => $document->getClientOriginalName(),
            'document_mime' => $document->getClientMimeType(),
            'document_size' => $document->getSize(),
            'status' => Membership::STATUS_PENDING,
        ]));

        return new MembershipResource($membership);
    }

    public function show(Membership $membership): MembershipResource
    {
        return new MembershipResource($membership);
    }
}
