<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    protected $fillable = ['user_id', 'token', 'expires_at', 'revoked'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
