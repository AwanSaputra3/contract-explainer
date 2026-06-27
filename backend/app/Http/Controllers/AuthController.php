<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ─── Public ────────────────────────────────────────

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully.',
            'data' => [
                'user'  => $user,
                'token' => $token,
            ],
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated. Contact admin.',
            ], 403);
        }

        $user->update(['last_login_at' => now()]);

        // Revoke old tokens, create new one
        $user->tokens()->delete();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'data' => [
                'user'  => $user,
                'token' => $token,
            ],
        ]);
    }

    // ─── Protected ─────────────────────────────────────

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        $user = $request->user()->loadCount(['analyses', 'chatSessions']);

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'data' => $user->fresh(),
        ]);
    }

    // ─── Admin ─────────────────────────────────────────

    public function listUsers(Request $request): JsonResponse
    {
        $users = User::withCount(['analyses', 'chatSessions'])
            ->latest()
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function showUser(int $id): JsonResponse
    {
        $user = User::withCount(['analyses', 'chatSessions'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    public function updateUserRole(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'role' => 'required|in:super_admin,user',
        ]);

        $user = User::findOrFail($id);
        $user->update(['role' => $request->role]);

        return response()->json([
            'success' => true,
            'message' => "User role updated to '{$request->role}'.",
            'data' => $user->fresh(),
        ]);
    }

    public function toggleActive(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update(['is_active' => !$user->is_active]);

        return response()->json([
            'success' => true,
            'message' => $user->is_active ? 'User activated.' : 'User deactivated.',
            'data' => $user->fresh(),
        ]);
    }
}
