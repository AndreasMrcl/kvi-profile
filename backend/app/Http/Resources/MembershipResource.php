<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembershipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'birth_place' => $this->birth_place,
            'birth_date' => optional($this->birth_date)->toDateString(),
            'address' => $this->address,
            'occupation' => $this->occupation,
            'phone' => $this->phone,
            'email' => $this->email,
            'university' => $this->university,
            'graduation_year' => $this->graduation_year,
            'status' => $this->status,
            'verified_at' => optional($this->verified_at)->toIso8601String(),
            'approved_at' => optional($this->approved_at)->toIso8601String(),
            'rejected_at' => optional($this->rejected_at)->toIso8601String(),
            'created_at' => optional($this->created_at)->toIso8601String(),
        ];
    }
}
